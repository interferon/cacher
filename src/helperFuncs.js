module.exports.helperFuncs = {	
	saveToStorage : function (data) {
		localStorage.setItem(data.url, JSON.stringify(data));
	},
	getFromStorage : function (key) {
		var stored = localStorage.getItem(key);
		return JSON.parse(stored);
	},
	entriesAreEqual : function(entry1, entry2){
		var result = false;
		if (entry1.url === entry2.url){
			if (entry1.post === entry2.post){
				result = true;
			}
		}
		return result;
	},
	getCached : function(data){
		console.log("cache extracted");
		return this.getFromStorage(data.url).loadedRes;
	},
	isCached : function(data){
		console.log("checking if cached");
		var cached = this.getFromStorage(data.url);
		return cached !== null;
	},
	toBeCopied : function(attr){
		var toBeReplaced = ['open', 'send', 'readyState'];
		return !toBeReplaced.includes(attr);
	}
};
