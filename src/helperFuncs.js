module.exports.helperFuncs = {	
	saveToStorage (data) {
		localStorage.setItem(data.url, JSON.stringify(data));
	},
	getFromStorage (key) {
		var stored = localStorage.getItem(key);
		return JSON.parse(stored);
	},
	entriesAreEqual (entry1, entry2){
		var result = false;
		if (entry1.url === entry2.url){
			if (entry1.post === entry2.post){
				result = true;
			}
		}
		return result;
	},
	getCached (data){
		console.log("cache extracted");
		return this.getFromStorage(data.url).response;
	},
	isCached (data){
		console.log("checking if cached");
		var cached = this.getFromStorage(data.url);
		return cached !== null;
	},
	toBeCopied (attr){
		var toBeReplaced = ['open', 'send', 'readyState'];
		return !toBeReplaced.includes(attr);
	},
	identitiFn : null,
	setIdentityFn (fn){
		this.identitiFn = fn;
	}
};
