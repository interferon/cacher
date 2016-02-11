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
        xhrWrapper.onreadystatechange && xhrWrapper.onreadystatechange();
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
		addListener(event, handler){
			console.log('listener to orst added', handler);
			this.events_map[event].push(handler);
		},
		fireEvent (event){
			var that = this;
			this.events_map[event].map(
				function(handler){
					console.log('event fired', handler);
					handler();
				}
			);
			this.events_map[event] = [];
		},
		events_map:{
			on_rd_st_ch_assigned : []
		},
		removeListener(event, handler){
			delete this.events_map[event][indexOf(handler)];
		}			
	}
};
module.exports.helperFuncs = helperFuncs;