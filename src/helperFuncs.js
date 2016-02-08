module.exports.helperFuncs = {	
	save(data) {
		localStorage.setItem(
			this.generateId(data.url, data.post),
			JSON.stringify(data)
		);		
	},
	get(url, post) {
		var key = this.generateId(url, post);
		var stored = localStorage.getItem(key);
		return JSON.parse(stored);
	},
	getCached(url, post){
		var key = this.generateId(url, post);
		return this.get(key);
	},
	isCached(url, post){
		var key = this.generateId(url, post);
		var cached = this.getCached(url, post);
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
		return this.identityFn(url, post);
	},
	setIdentityFnBody(fnBody){
		localStorage.setItem('identityFnBody', fnBody)
	},
	setIdentityFn(){
		if (localStorage.getItem('identityFnBody')){
			var identityFnBody = localStorage.getItem('identityFnBody');
			var identityFn = new Function("url", "post", identityFnBody);
			this.identityFn = identityFn;
		}
	},
	identityFn : function(url, post){
		return url;
	}
};