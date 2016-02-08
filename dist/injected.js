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
	
	var xhr = window.XMLHttpRequest;
	
	window.cacherNamespace = {};
	
	hp.setIdentityFn();
	
	hp.setIdentityFnUpdateHandler();
	
	window.XMLHttpRequest = function (){
	
		var xhrWrapper = this, myXHR = new xhr();
		
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	var helperFuncs = {	
		save(data) {
			localStorage.setItem(
				this.generateId(data.url, data.post),
				JSON.stringify(data)
			);		
		},
		get(url, post) {
			var key = this.generateId(url, post);
			var stored = localStorage.getItem(key);
			return JSON.parse(stored);
		},
		isCached(url, post){
			var cached = this.get(url, post);
			return cached !== null;
		},
		triggerReadyStateChangeEvent(xhrWrapper, response){
			xhrWrapper.responseText = response;
			xhrWrapper.response = response;
			xhrWrapper.readyState = 4;
			xhrWrapper.status = 200;
			xhrWrapper.onreadystatechange();
		},
		generateId(url, post){
			console.log('generated', this.identityFn(url, post));
			return this.identityFn(url, post);
		},
		setIdentityFn(){
			if (localStorage.getItem('identityFnBody')){
				var identityFnBody = localStorage.getItem('identityFnBody');
				this.identityFn = new Function("url", "post", identityFnBody);
			}
		},
		identityFn(url, post){
			return url;
		},
		setIdentityFnUpdateHandler(){
			cacherNamespace.trigger = function(event) {
				switch(event){
					case 'identityFnUpdate':
						helperFuncs.setIdentityFn();
				}
			}
		}
	};
	
	module.exports.helperFuncs = helperFuncs;

/***/ }
/******/ ]);
//# sourceMappingURL=injected.js.map