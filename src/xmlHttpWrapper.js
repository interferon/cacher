console.log('injected');
var hp = require('./helperFuncs.js').helperFuncs;

if (hp.cachingIsRequired()){

	var xhr = window.XMLHttpRequest;

	hp.setIdentityFn();

	window.XMLHttpRequest = function (){

		var xhrWrapper = this, myXHR = new xhr();

		for (prop in myXHR){
			if (hp.toSkip(prop)){
				xhrWrapper[prop] = myXHR[prop];
			}
		}
		
		function responseListener(){
			if (myXHR.readyState == 4 && myXHR.status == 200){	
				hp.save({
					url : xhrWrapper.__url,
					post : xhrWrapper.__post_data,
					response : myXHR.response
				});
				hp.triggerReadyStateChangeEvent(xhrWrapper, myXHR.response);		
			}
		};

		myXHR.addEventListener('readystatechange', responseListener);

		xhrWrapper.readyState = 0;

		xhrWrapper.open = function(method, url, async, user, pass){
			xhrWrapper.__url = url;
			
			myXHR.open(method, url, async, user, pass);
		};

		xhrWrapper.send = function(post_data){	
			xhrWrapper.__post_data = post_data;

			if (!hp.isCached(xhrWrapper.__url, xhrWrapper.__post_data)){
				myXHR.send(post_data);
			}else{
				var cached = hp.get(xhrWrapper.__url, xhrWrapper.__post_data);
				hp.triggerReadyStateChangeEvent(xhrWrapper, cached.response);
			}
		};

		return xhrWrapper;
	};
}