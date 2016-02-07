module.exports.helperFuncs = {	
	save (data) {
		localStorage.setItem(data.url, JSON.stringify(data));		
	},
	get (key) {
		var stored = localStorage.getItem(key);
		return JSON.parse(stored);
	},
	getCached (key){
		return this.get(key);
	},
	isCached (key){
		var cached = localStorage.getItem(key);
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
