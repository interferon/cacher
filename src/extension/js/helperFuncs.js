var helperFuncs = {	
	save(data){
		console.log('response saved');
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
		if (localStorage.getItem('caching_state') == 'true'){
			isRequired = true;
		}
		return isRequired;
	},
	consts : {
		appId : "pgldgjkefhfiioeacodogfolgpmefblb"
	}
};
module.exports.helperFuncs = helperFuncs;