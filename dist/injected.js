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
	
		var xhr = window.XMLHttpRequest;
	
		hp.setIdentityFn();
	
		window.XMLHttpRequest = function (){	
			
			var myXHR = new xhr();
			
			var xhrWrapper = {
				set onreadystatechange(value){
					this._onreadystatechange = value;
					hp.event_engine.fireEvent('on_rd_st_ch_assigned');
				},
				get onreadystatechange(){
					return this._onreadystatechange;
				}			
			};
	
			hp.clone(myXHR, xhrWrapper);
			
			function responseListener(){
				if (myXHR.readyState == 4 && myXHR.status == 200){  
					hp.save({
						url : xhrWrapper.__url,
						post : xhrWrapper.__post_data,
						response : myXHR.response
					});
					hp.event_engine.registerListener(
						'on_rd_st_ch_assigned',
						function(argument){
							hp.triggerReadyStateChangeEvent(xhrWrapper, cached.response);
						}
					);
				}
			};
	
			myXHR.addEventListener('readystatechange', responseListener);
	
			xhrWrapper.readyState = 0;
	
			xhrWrapper.open = function(method, url, async, user, pass){
				xhrWrapper.__url = url;
				myXHR.open(method, url, async, user, pass);
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
	
			xhrWrapper.send = function(post_data){  
				xhrWrapper.__post_data = post_data;
				hp.event_engine.registerListener(
					'on_rd_st_ch_assigned',
					function(argument){
						if (!hp.isCached(xhrWrapper.__url, xhrWrapper.__post_data)){
							myXHR.send(post_data);
						}else{
							console.log('is cached');
							var cached = hp.get(xhrWrapper.__url, xhrWrapper.__post_data);
							hp.triggerReadyStateChangeEvent(xhrWrapper, cached.response);
						}
					}
				);
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
		triggerReadyStateChangeEvent(xhrWrapper, response){
			try{
				xhrWrapper.responseText = response;
				xhrWrapper.response = response;
				xhrWrapper.readyState = 4;
				xhrWrapper.status = 200;
				xhrWrapper.onreadystatechange();
			}catch(e){
				console.log(e);
			}
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
		cachingIsRequired(){
			var isRequired = false;
			if (localStorage.getItem('caching') === 'true'){
				isRequired = true;
			}
			return isRequired;
		},
		clone(obj, clonee){
			for (prop in obj){
				if (prop == "onreadystatechange"){continue;}
				if (typeof(obj[prop]) == 'object'){
					clonee[prop] = this.clone(obj[prop], clonee);
				}else{
					if (typeof(obj[prop]) == 'Function'){
						clonee[prop] = obj[prop].bind(window);
					}else{
						clonee[prop] = obj[prop];
					}
				}
			}
			return clonee;
		},
		consts : {
			appId : "pgldgjkefhfiioeacodogfolgpmefblb"
		},
		event_engine : {
			registerListener(event, handler){
				this.events_map[event].push(handler);
			},
			fireEvent (event){
				for (handler in this.events_map[event]){
					this.events_map[handler]();
				}
			},
			events_map:{
				on_rd_st_ch_assigned : []
			}			
		}
	};
	module.exports.helperFuncs = helperFuncs;

/***/ }
/******/ ]);
//# sourceMappingURL=injected.js.map