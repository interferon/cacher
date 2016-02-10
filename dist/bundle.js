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

	injFns.injectScript(
		'../dist/injected.js',
		{type : 'file'}
	);

	var map = {
		identityFnBody : function(fnbody, sendResponse){
			var identityFnScript = sg.genIdentityFnIncorpScript(fnbody);
			injFns.injectScript(identityFnScript, {type : 'text'});
			sendResponse({result: "success"});
		},
		enableCachingForDomain : function(isRequired, sendResponse){
			var cachingSettingScript = sg.genSetCachingScript(isRequired);
			injFns.injectScript(cachingSettingScript, {type : 'text'});
			sendResponse({result: "success"});
		},
		checkCachingState : function(state, sendResponse){
			var caching = window.localStorage.getItem("caching");
			sendResponse({result : caching});
		}
	}

	chrome.runtime.onMessage.addListener(
			function(request, sender, sendResponse) {
			map[request.reciever](request.data, sendResponse);		
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
		},
		genSetCachingScript(state){
			return '(function(){\n'+
						'localStorage.setItem("caching", "'+state+'");\n'+
						'localStorage.setItem("pgldgjkefhfiioeacodogfolgpmefblb", "{}");\n'+
						'console.log("caching setted to '+state+'");\n'+
					'})();';
		},
		genCurrentDomainMessagingAbilityScript(id){
		return 	'var cachingRequired = localStorage.getItem("caching")\n'+
				'chrome.runtime.sendMessage("'+id+'", {checkBoxState: cachingRequired},\n'+
					'function(response) {\n'+
					'if (!response.success){\n'+
					'	console.log("failed to set checkBoxState");\n'+
					'}\n'+
				'});'
		}
	};


/***/ }
/******/ ]);