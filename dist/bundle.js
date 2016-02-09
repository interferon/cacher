/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var injFns = __webpack_require__(1).injectionFuncs;

	var sg = __webpack_require__(2).scriptGenerator;

	injFns.injectScript('../dist/injected.js', {type : 'file'});

	chrome.runtime.onMessage.addListener(
			function(request, sender, sendResponse) {
			switch(request.reciever) {
				case 'identityFnBody': 
					var identityFnScript = sg.genIdentityFnIncorpScript(request.data);
					injFns.injectScript(identityFnScript, {type : 'text'});
					sendResponse({result: "success"});
			}		
		}
	);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var sg = __webpack_require__(2).scriptGenerator;

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports.scriptGenerator = {
		genIdentityFnIncorpScript(identityFnBody){
			return '(function(){\n'+
					'localStorage.setItem("identityFnBody", "'+identityFnBody+'");\n'+
				'})();';
		}
	};

/***/ }
/******/ ]);