var helperFuncs = {	
	save(data){
		console.log('response saved');
		var stored = JSON.parse(localStorage.getItem(this.consts.appId));
		var entryId = this.identityFn(data.url, data.post);
		stored[entryId] = data;
		localStorage.setItem(this.consts.appId, JSON.stringify(stored));		
	},
	get(url, post){
		var key = this.identityFn(url, post);
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
		return (localStorage.getItem('caching_state') == 'true');
	},
	consts : {
		appId : "pgldgjkefhfiioeacodogfolgpmefblb"
	}
};
module.exports.helperFuncs = helperFuncs;