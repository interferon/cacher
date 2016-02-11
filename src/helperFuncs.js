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