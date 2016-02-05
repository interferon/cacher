

var xhr = window.XMLHttpRequest;

window.XMLHttpRequest = function (){

	var myXHR = new xhr();

	function saveToStorage (key,  data) {
		localStorage.setItem(key, JSON.stringify(data));
	}

	function getFromStorage (key) {
		var stored = localStorage.getItem(key);
		return JSON.parse(stored);
	}

	function entriesAreEqual(entry1, entry2){
		var result = false;
		if (entry1.url === entry2.url){
			if (entry1.post === entry2.post){
				result = true;
			}
		}
		return result;
	}

	function getCached(data){
		console.log("cache extracted");
		return getFromStorage(data.url).loadedRes;
	}

	function isCached(data){
		console.log("checking if cached");
		var cached = getFromStorage(data.url);
		return cached !== null;
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
		var reqData = {
			url : this.__url,
			post : post_data
		};
		myXHR.addEventListener('readystatechange', function(){
			if (myXHR.readyState == 4) {
				if(myXHR.status == 200) {
					reqData.loadedRes = this.responseText;
					saveToStorage(reqData.url, reqData);
				}
			}
			else{
				return;
			}
		});
		if (!isCached(reqData)){
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