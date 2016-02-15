/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	console.log('injected');
	var hp = __webpack_require__(1).helperFuncs;
	
	if (hp.cachingIsRequired()){
		
		hp.setIdentityFn();
		var xhr = window.XMLHttpRequest;
		
		window.XMLHttpRequest = function() {    
			
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
	
			function onSuccessfullResponseRecieved (response) {
				xhrWrapper.readyState = 4;
				xhrWrapper.status = 200;
				xhrWrapper.response = xhrWrapper.responseText = response;
				xhrWrapper._onreadystatechange && xhrWrapper._onreadystatechange();
			}
	
			function responseListener (){
				if (myXHR.readyState == 4 && myXHR.status == 200){  
					if (hp.cachingIsRequired()){
						var key = hp.identityFn(xhrWrapper.__url, xhrWrapper.__post_data);
						hp.save(
							key,
							{
								url : xhrWrapper.__url,
								post : xhrWrapper.__post_data,
								response : myXHR.response
							}
						);
					}
					onSuccessfullResponseRecieved(myXHR.response);
				}
			};
	
			myXHR.addEventListener('readystatechange', responseListener);
	
			xhrWrapper.open = function (method, url, async, user, pass){
				xhrWrapper.__url = url;
				myXHR.open(method, url, async, user, pass);
			};
	
			xhrWrapper.send = function (post_data){  
				xhrWrapper.response = xhrWrapper.responseText = null;
				xhrWrapper.__post_data = post_data;
				var key = hp.identityFn(xhrWrapper.__url, post_data);
				if (hp.isCached(key)){
					onSuccessfullResponseRecieved(hp.getCachedResponse(key));
				}else{
					myXHR.send(post_data);
				}
			};
	
			xhrWrapper.setRequestHeader = function (DOMStringheader, DOMStringvalue){            
				myXHR.setRequestHeader(DOMStringheader, DOMStringvalue);
			};
	
			xhrWrapper.getResponseHeader = function (DOMStringheader){           
				myXHR.getResponseHeader(DOMStringheader);
			};
	
			xhrWrapper.abort = function(){
				myXHR.abort();
			};
	
			return xhrWrapper;
		};
	}
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	var helperFuncs = {	
		save(key, data){
			console.log('response saved');
			var cachedData = JSON.parse(localStorage.getItem(this.consts.appId));
			cachedData[key] = data;
			localStorage.setItem(this.consts.appId, JSON.stringify(cachedData));
			return cachedData;		
		},
		isCached(key){
			var cached = JSON.parse(localStorage.getItem(this.consts.appId))[key]
			return cached !== undefined;
		},
		getCachedResponse(key){
			console.log('is cached');
			return JSON.parse(localStorage.getItem(this.consts.appId))[key].response;
		},
		setIdentityFn(){
			if (localStorage.getItem('identityFnBody')){
				var identityFnBody = localStorage.getItem('identityFnBody');
				this.identityFn = new Function("url", "post", identityFnBody);
			}
		},
		identityFn(url, post){
			return url + JSON.stringify(post);
		},
		setIdentityFnUpdateHandler(){
			cacherNamespace.AddEventListener('identityFnUpdate', function(){
				helperFuncs.setIdentityFn();
			})
		},
		cachingIsRequired(){
			return (localStorage.getItem('caching_state') == 'true');
		},
		consts : {
			appId : "pgldgjkefhfiioeacodogfolgpmefblb"
		}
	};
	module.exports.helperFuncs = helperFuncs;

/***/ }
/******/ ]);
//# sourceMappingURL=injected.js.map