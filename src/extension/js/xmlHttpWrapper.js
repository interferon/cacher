console.log('injected');
var hp = require('./helperFuncs.js').helperFuncs;

if (hp.cachingIsRequired()){
	
	hp.setIdentityFn();
	var xhr = window.XMLHttpRequest;
	
	window.XMLHttpRequest = function (){    
		
		var myXHR = new xhr();
		var xhrWrapper = {
			readyState : 4,
			status : 200,
			set onreadystatechange(value){
				xhrWrapper._onreadystatechange = value;
				xhrWrapper.response &&
					xhrWrapper._onreadystatechange();
			},
			get onreadystatechange(){
				return xhrWrapper._onreadystatechange;
			}			         
		};

		function responseListener(){
			if (myXHR.readyState == 4 && myXHR.status == 200){  
				hp.save({
					url : xhrWrapper.__url,
					post : xhrWrapper.__post_data,
					response : myXHR.response
				});
				xhrWrapper.response,
				xhrWrapper.responseText = myXHR.response;
				xhrWrapper._onreadystatechange &&
					xhrWrapper._onreadystatechange();
			}
		};

		myXHR.addEventListener('readystatechange', responseListener);


		xhrWrapper.open = function(method, url, async, user, pass){
			xhrWrapper.__url = url;
			myXHR.open(method, url, async, user, pass);
		};

		xhrWrapper.send = function(post_data){  
			xhrWrapper.__post_data = post_data;
			var url = xhrWrapper.__url;
			if (hp.isCached(url, post_data)){
				xhrWrapper.response,
				xhrWrapper.responseText = hp.getCachedResponse(url, post_data);
				xhrWrapper._onreadystatechange &&
					xhrWrapper._onreadystatechange();
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