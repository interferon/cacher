var helperFuncs = {	
	save(key, data){
		console.log('response saved');
		var cachedData = JSON.parse(localStorage.getItem(this.consts.appId));
		cachedData[key] = data;
		localStorage.setItem(this.consts.appId, JSON.stringify(cachedData));
		return cachedData;		
	},
	isCached(key){
		var cached = JSON.parse(localStorage.getItem(this.consts.appId))[key]
		return cached !== undefined;
	},
	getCachedResponse(key){
		console.log('is cached');
		return JSON.parse(localStorage.getItem(this.consts.appId))[key].response;
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