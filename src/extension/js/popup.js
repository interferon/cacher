document.getElementById('submit_fn').addEventListener(
	"click",
	function(){
		var fnbody = document.getElementById('custom_id_fn').value.trim();
		notifyContentScript('identityFnBody', fnbody, null);
	}
);

document.getElementById('use_caching').addEventListener(
	"click",
	function(event){
		notifyContentScript(
			"enableCachingForDomain",
			document.getElementById("use_caching").checked,
			null);
	}
)

function notifyContentScript(reciever, data, cb){
	chrome.tabs.query(
		{
			active: true,
			currentWindow: true
		},
		function(tabs) {
	  		chrome.tabs.sendMessage(
	  			tabs[0].id,
	  			{
	  				reciever : reciever,
	  				data : data
	  			},
	  			function(response) {
	    			cb(response.result);
	  			}
	  		);
		}
	);
}

function showUserWarn (message) {
	var userMessageElem = document.getElementById("user_message")
	userMessageElem.innerHTML = message;
}

function setCheckBox(result){
	if (result === "true"){
		document.getElementById('use_caching').checked = true;
	}
}

notifyContentScript('checkCachingState', null, setCheckBox);