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

	var sg = __webpack_require__(1).scriptGenerator;

	var s = document.createElement('script');
	s.src = chrome.extension.getURL('../dist/injected.js');
	s.onload = function() {
	    this.parentNode.removeChild(this);
	};
	(document.head || document.documentElement).appendChild(s);


	function incorporateIdFnScript(identityFnBody){
		var identityFn = sg.genIdentityFnIncorpScript(identityFnBody);
		console.log(identityFn);
		var script = document.createElement('script');
		script.textContent = identityFn;
		(document.head||document.documentElement).appendChild(script);
		script.parentNode.removeChild(script);
	}

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.identityFnBody){
				incorporateIdFnScript(request.identityFnBody);
				sendResponse({result: "success"});
			}	
		}
	);



/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports.scriptGenerator = {
		genIdentityFnIncorpScript(identityFnBody){
			return '(function(){window.setIdentityFnBody("'+identityFnBody+'");delete window.setIdentityFnBody;})();';
		}
	};

/***/ }
/******/ ]);