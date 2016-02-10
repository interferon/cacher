var helperFuncs = {	
	save(data){
		localStorage.getItem('');
		localStorage.setItem(
			this.generateId(data.url, data.post),
			JSON.stringify(data)
		);		
	},
	get(url, post){
		var key = this.generateId(url, post);
		var stored = localStorage.getItem(key);
		return JSON.parse(stored);
	},
	isCached(url, post){
		var cached = this.get(url, post);
		return cached !== null;
	},
	triggerReadyStateChangeEvent(xhrWrapper, response){
		xhrWrapper.responseText = response;
		xhrWrapper.response = response;
		xhrWrapper.readyState = 4;
		xhrWrapper.status = 200;
		xhrWrapper.onreadystatechange();
	},
	generateId(url, post){
		console.log('generated', this.identityFn(url, post));
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
	}
};
module.exports.helperFuncs = helperFuncs;