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
	
	window.XMLHttpRequest = function (){
	
		var xhrWrapper = this, myXHR = new xhr();
	
		function responseListener(){
			if (myXHR.readyState == 4 && myXHR.status == 200){	
				console.log('response recieved');
				hp.save({
					url : xhrWrapper.__url,
					post : xhrWrapper.__post_data,
					response : myXHR.response
				});
				hp.triggerReadyStateChangeEvent(xhrWrapper, myXHR.response);
				myXHR.removeEventListener('readystatechange', this);		
			}
		}
	
		xhrWrapper.readyState = 0;
	
		xhrWrapper.open = function(method, url, async, user, pass){
			xhrWrapper.__url = url;
			myXHR.open(method, url, async, user, pass);
		};
	
		xhrWrapper.send = function(post_data){	
			xhrWrapper.__post_data = post_data;
			myXHR.addEventListener('readystatechange', responseListener);	
			
			if (!hp.isCached(xhrWrapper.__url)){
				console.log('not cached', xhrWrapper.__url);
				myXHR.send(post_data);
			}else{
				var cached = hp.getCached(xhrWrapper.__url);
				hp.triggerReadyStateChangeEvent(xhrWrapper, cached.response);
			}
		};
	
		return xhrWrapper;
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports.helperFuncs = {	
		save (data) {
			console.log("saved to storage");
			localStorage.setItem(data.url, JSON.stringify(data));		
		},
		get (key) {
			var stored = localStorage.getItem(key);
			console.log("got from storage");
			return JSON.parse(stored);
		},
		getCached (key){
			console.log("getting cache");
			return this.get(key);
		},
		isCached (key){
			var cached = localStorage.getItem(key);
			if (cached) {
				console.log('is cached');
			}
			return cached !== null;
		},
		triggerReadyStateChangeEvent(xhrWrapper, response){
			xhrWrapper.responseText = response;
			xhrWrapper.response = response;
			xhrWrapper.readyState = 4;
			xhrWrapper.status = 200;
			xhrWrapper.onreadystatechange();
		}
	};


/***/ }
/******/ ]);
//# sourceMappingURL=injected.js.map