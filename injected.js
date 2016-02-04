var xhr = window.XMLHttpRequest;

var storage = [];

window.XMLHttpRequest = function (){
	
	var myXHR = new xhr();

	function saveCache(data){
		console.log('stored');
		storage.push(data);
	}

	function getCached(data){
		console.log("cache extracted");
		return storage.filter(function(current, index, arr){
			return JSON.stringify(current.url) === JSON.stringify(data.url) && JSON.stringify(current.post) === JSON.stringify(data.post); 
		})[0].loadedRes;
	}

	function toBeCopied(attr){
		var toBeReplaced = ['open', 'send', 'readyState'];
		return !toBeReplaced.includes(attr);
	}

	for (attr in xhr){
		if (toBeCopied(attr)){
			myXHR.attr = xhr[attr]; 
		}
	}

	myXHR.open = function(method, url, async, user, pass){
		console.log('opened');
		this.__url = url;
		orig_open.call(this, method, url, async, user, pass);
	};
	myXHR.send = function(post_data){
		var reqData = {url : this.__url,post : post_data};
		this.addEventListener('readystatechange', function(){
			if (this.readyState == 4) {
				if(this.status == 200) {
					reqData.loadedRes = this.responseText;
					saveCache(reqData);
				}
			}
			else{
				return;
			}
		});
		if (!cached(reqData)){
			console.log('req sent');
			orig_send.call(this, post_data);
		}else{
			this.responseText = getCached(reqData);
			this.readyState = 4;
			this.status = 200;
			this.onreadystatechange();
		}

	}
	
	myXHR.readyState = 0;
	
	return myXHR;

};