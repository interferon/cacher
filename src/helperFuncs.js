module.exports.helperFuncs = {	
	save (data) {
		console.log("saved to storage");
		localStorage.setItem(data.url, JSON.stringify(data));		
	},
	get (key) {
		var stored = localStorage.getItem(key);
		console.log("got from storage");
		return JSON.parse(stored);
	},
	getCached (key){
		console.log("getting cache");
		return this.get(key);
	},
	isCached (key){
		var cached = localStorage.getItem(key);
		if (cached) {
			console.log('is cached');
		}
		return cached !== null;
	},
	triggerReadyStateChangeEvent(xhrWrapper, response){
		xhrWrapper.responseText = response;
		xhrWrapper.response = response;
		xhrWrapper.readyState = 4;
		xhrWrapper.status = 200;
		xhrWrapper.onreadystatechange();
	}
};
