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
	
			function onSuccessfullResponseRecieved() {
				xhrWrapper.readyState = 4;
				xhrWrapper.status = 200;
				xhrWrapper.response = xhrWrapper.responseText = myXHR.response;
				xhrWrapper._onreadystatechange && xhrWrapper._onreadystatechange();
			}
	
			function responseListener(){
				if (myXHR.readyState == 4 && myXHR.status == 200){  
					hp.save({
						url : xhrWrapper.__url,
						post : xhrWrapper.__post_data,
						response : myXHR.response
					});
					onSuccessfullResponseRecieved();
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
					onSuccessfullResponseRecieved();
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
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	var helperFuncs = {	
		save(data){
			var stored = JSON.parse(localStorage.getItem(this.consts.appId));
			var entryId = this.generateId(data.url, data.post);
			stored[entryId] = data;
			localStorage.setItem(this.consts.appId, JSON.stringify(stored));		
		},
		get(url, post){
			var key = this.generateId(url, post);
			var stored = JSON.parse(localStorage.getItem(this.consts.appId));
			return stored[key];
		},
		isCached(url, post){
			var cached = this.get(url, post);
			return cached !== undefined;
		},
		getCachedResponse(url, post){
			console.log('is cached');
			return this.get(url, post).response;
		},
		generateId(url, post){
			return this.identityFn(url, post);
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
		buildXMLHttpProps(xhr){
			xhr.readyState = 4;
			xhr.status = 200;
		},
		cachingIsRequired(){
			var isRequired = false;
			if (localStorage.getItem('caching') === 'true'){
				isRequired = true;
			}
			return isRequired;
		},
		consts : {
			appId : "pgldgjkefhfiioeacodogfolgpmefblb"
		}
	};
	module.exports.helperFuncs = helperFuncs;

/***/ }
/******/ ]);
//# sourceMappingURL=injected.js.map