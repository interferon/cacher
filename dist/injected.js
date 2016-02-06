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

	var hp = __webpack_require__(1).helperFuncs;
	
	var xhr = window.XMLHttpRequest;
	
	window.XMLHttpRequest = function (){
	
		var myXHR = new xhr();
	
		for (var attr in xhr){
			if (hp.toBeCopied(attr)){
				this.attr = xhr[attr]; 
			}
		}
		this.open = function(method, url, async, user, pass){
			console.log('opened');
			this.__url = url;
			myXHR.open(method, url, async, user, pass);
		};
		this.send = function(post_data){
			var reqData = {
				url : this.__url,
				post : post_data
			};
			myXHR.addEventListener('readystatechange', () => {
				if (myXHR.readyState == 4) {
					if(myXHR.status == 200) {
						reqData.loadedRes = this.responseText;
						hp.saveToStorage(reqData);
					}
				}
				else{
					return;
				}
			});
			if (!hp.isCached(reqData)){
				console.log('req sent');
				myXHR.send(post_data);
			}else{
				this.responseText = hp.getCached(reqData);
				this.readyState = 4;
				this.status = 200;
				this.onreadystatechange();
			}
		}	
		this.readyState = 0;
		return this;
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports.helperFuncs = {	
		saveToStorage (data) {
			localStorage.setItem(data.url, JSON.stringify(data));
		},
		getFromStorage (key) {
			var stored = localStorage.getItem(key);
			return JSON.parse(stored);
		},
		entriesAreEqual (entry1, entry2){
			var result = false;
			if (entry1.url === entry2.url){
				if (entry1.post === entry2.post){
					result = true;
				}
			}
			return result;
		},
		getCached (data){
			console.log("cache extracted");
			return this.getFromStorage(data.url).loadedRes;
		},
		isCached (data){
			console.log("checking if cached");
			var cached = this.getFromStorage(data.url);
			return cached !== null;
		},
		toBeCopied (attr){
			var toBeReplaced = ['open', 'send', 'readyState'];
			return !toBeReplaced.includes(attr);
		}
	};


/***/ }
/******/ ]);
//# sourceMappingURL=injected.js.map