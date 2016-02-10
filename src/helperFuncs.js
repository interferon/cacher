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
		xhrWrapper.responseText = response;
		xhrWrapper.response = response;
		xhrWrapper.readyState = 4;
		xhrWrapper.status = 200;
		xhrWrapper.onreadystatechange();
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
	clone(obj){
		var cloned = {};
		for (prop in obj){
			if (typeof(obj[prop]) == 'object'){
				cloned[prop] = this.clone(obj[prop]);
			}else{
				if (typeof(obj[prop]) == 'Function'){
					cloned[prop] = obj[prop].bind(window);
				}else{
					cloned[prop] = obj[prop];
				}
			}
		}
		return cloned;
	},
	consts : {
		appId : "pgldgjkefhfiioeacodogfolgpmefblb"
	}
};
module.exports.helperFuncs = helperFuncs;