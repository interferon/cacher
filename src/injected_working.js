var hp = require('./helperFuncs.js').helperFuncs;

var xhr = window.XMLHttpRequest;

window.XMLHttpRequest = function (){

	var myXHR = new xhr();

	hp.setIndentityFn(
		(url) =>{
			return url.subString(0,5);
		}
	);

	function setmyXHREvenListener(reqData){
		myXHR.addEventListener('readystatechange', () => {
			if (myXHR.readyState == 4){
				if(myXHR.status == 200){
					if (myXHR.responseText){
						reqData.response = myXHR.responseText;
					}
					hp.saveToStorage(reqData);
				}
			}
			else{
				return;
			}
		});
	}

	// for (var attr in xhr){
	// 	if (hp.toBeCopied(attr)){
	// 		this.attr = xhr[attr]; 
	// 	}
	// }
	this.open = function(method, url, async, user, pass){
		console.log('opened');
		this.__url = url;
		myXHR.open(method, url, async, user, pass);
	};
	this.send = function(post_data){
		var reqData = {
			url : this.__url,
			post : post_data,
			response : ""
		};
		setmyXHREvenListener(reqData);

		if (!hp.isCached(reqData)){
			console.log('req sent');
			myXHR.send(post_data);
		}else{
			this.responseText = hp.getCached(reqData);
			this.readyState = 4;
			this.status = 200;
			this.onreadystatechange();
		}
	}	
	this.readyState = 0;
	return this;
};