var helperFuncs = {	
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
		return url;
	},
	setIdentityFnUpdateHandler(){
		cacherNamespace.trigger = function(event) {
			switch(event){
				case 'identityFnUpdate':
					helperFuncs.setIdentityFn();
			}
		}
	}
};

module.exports.helperFuncs = helperFuncs;