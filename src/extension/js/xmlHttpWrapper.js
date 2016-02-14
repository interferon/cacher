console.log('injected');
var hp = require('./helperFuncs.js').helperFuncs;

if (hp.cachingIsRequired()){
	
	hp.setIdentityFn();
	var xhr = window.XMLHttpRequest;
	
	window.XMLHttpRequest = function (){    
		
		var myXHR = new xhr();
		var xhrWrapper = {
			set onreadystatechange(value){
				xhrWrapper._onreadystatechange = value;
				xhrWrapper.response &&
					xhrWrapper._onreadystatechange();
			},
			get onreadystatechange(){
				return xhrWrapper._onreadystatechange;
			}			         
		};

		function onSuccessfullResponseRecieved(response) {
			xhrWrapper.readyState = 4;
			xhrWrapper.status = 200;
			xhrWrapper.response = xhrWrapper.responseText = response;
			xhrWrapper._onreadystatechange && xhrWrapper._onreadystatechange();
		}

		function responseListener(){
			if (myXHR.readyState == 4 && myXHR.status == 200){  
				hp.save({
					url : xhrWrapper.__url,
					post : xhrWrapper.__post_data,
					response : myXHR.response
				});
				onSuccessfullResponseRecieved(myXHR.response);
			}
		};

		myXHR.addEventListener('readystatechange', responseListener);


		xhrWrapper.open = function(method, url, async, user, pass){
			xhrWrapper.__url = url;
			myXHR.open(method, url, async, user, pass);
		};

		xhrWrapper.send = function(post_data){  
			xhrWrapper.response = xhrWrapper.responseText = null;
			xhrWrapper.__post_data = post_data;
			var url = xhrWrapper.__url;
			if (hp.isCached(url, post_data)){
				onSuccessfullResponseRecieved(hp.getCachedResponse(url, post_data));
			}else{
				myXHR.send(post_data);
			}
		};

		xhrWrapper.setRequestHeader = function(DOMStringheader, DOMStringvalue){            
			myXHR.setRequestHeader(DOMStringheader, DOMStringvalue);
		};

		xhrWrapper.getResponseHeader = function(DOMStringheader){           
			myXHR.getResponseHeader(DOMStringheader);
		};

		xhrWrapper.abort = function(){
			myXHR.abort();
		};



		return xhrWrapper;
	};
}

