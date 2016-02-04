var storage = [];

function saveCache(data){
	console.log('stored');
	storage.push(data);
	console.log(storage.length);
}

function extractCached(data){
	console.log("cache extracted");
	return storage.filter(function(current, index, arr){
		return JSON.stringify(current.url) === JSON.stringify(data.url) && JSON.stringify(current.post) === JSON.stringify(data.post); 
	})[0].loadedXHR;
}

function isCached(data){
	console.log('checking for cached');
	var cached = storage.filter(function(current, index, arr){
		return JSON.stringify(current) === JSON.stringify(data); 
	});
	return cached.length > 0;
}

function checkCache(data, abortReq, assignCached){
	console.log(isCached(data));
	if (!isCached(data)){
		saveCache(data);
	}
	else{
		console.log("req abort");
		abortReq();
		assignCached(extractCached(data));
	}
}

var orig_open = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, async, user, pass){
	this.__url = url;
	orig_open.call(this, method, url, async, user, pass);
};

var orig_send = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(post_data){
	var that = this;
	function abortReq(){
		that.abort();
	}
	this.addEventListener('loadend', function(){
		console.log('loaded');
		checkCache({
			url : that.__url,
			post : post_data,
			loadedXHR : that
		},
		abortReq,
		function(cached){
			that = cached;
		});
	});
	
	function callOriginalSend(){
		orig_send.call(that, post_data);
	}
	
};
