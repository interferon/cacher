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

	var injFns = __webpack_require__(1).injectionFuncs;
	
	injFns.injectScript('../dist/injected.js', {type : 'file'});
	
	chrome.runtime.onMessage.addListener(
			function(request, sender, sendResponse) {
			map[request.reciever](request.data, sendResponse);		
		}
	);
	
	var map = {
		setIdentityFnBody : function(fnbody, sendResponse){
			localStorage.setItem("identityFnBody", fnbody);
			sendResponse({result: "success"});
		},
		changeCachingState : function(state, sendResponse){
			localStorage.setItem("caching_state", state);
			localStorage.setItem("pgldgjkefhfiioeacodogfolgpmefblb", "{}");
			sendResponse({result: "success"});
		},
		getCachingState : function(state, sendResponse){
			sendResponse({result : window.localStorage.getItem("caching_state")});
		}
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports.injectionFuncs = {
		injectScript(script, options){
			var script_tag = document.createElement('script');
			switch(options.type) {
				case 'file':
					script_tag.src = chrome.extension.getURL(script);
				case 'text':
					script_tag.textContent = script;
	
			}
			script_tag.onload = function() {
			    this.parentNode.removeChild(this);
			};
			(document.head || document.documentElement).appendChild(script_tag);
		}
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map