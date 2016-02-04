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
			return current.url === data.url;
		})[0].loadedRes;
	}

	function toBeCopied(attr){
		var toBeReplaced = ['open', 'send', 'readyState'];
		return !toBeReplaced.includes(attr);
	}

	for (var attr in xhr){
		if (toBeCopied(attr)){
			this.attr = xhr[attr]; 
		}
	}

	this.open = function(method, url, async, user, pass){
		console.log('opened');
		this.__url = url;
		myXHR.open(method, url, async, user, pass);
	};
	this.send = function(post_data){
		var reqData = {url : this.__url,post : post_data};
		myXHR.addEventListener('readystatechange', function(){
			if (myXHR.readyState == 4) {
				if(myXHR.status == 200) {
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
			myXHR.send(post_data);
		}else{
			this.responseText = getCached(reqData);
			this.readyState = 4;
			this.status = 200;
			this.onreadystatechange();
		}

	}
	
	this.readyState = 0;
	return this;
};