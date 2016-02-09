chrome.runtime.onMessageExternal.addListener(
	function(request, sender, sendResponse) {
		setCheckBox(request.checkBoxState);
		sendResponse({success: true});
});


function enableMessagingFromDomain(){
	chrome.tabs.query(
		{
			active: true,
			currentWindow: true
		},
		function(tabs) {
	  		chrome.tabs.sendMessage(
	  			tabs[0].id,
	  			{
	  				reciever : "addMessagingFromDomain",
	  				data : "pgldgjkefhfiioeacodogfolgpmefblb"
	  			},
	  			function(response) {
	    			console.log(response.result);
	  			}
	  		);
		}
	);
}

function setCheckBox(result){
	if (result === "true"){
		document.getElementById('use_caching').checked = true;
	}
}

document.getElementById('submit_fn').addEventListener(
	"click",
	function(){
		var fnbody = document.getElementById('custom_id_fn').value.trim();
		notifyContentScript(fnbody);
	}
);

document.getElementById('use_caching').addEventListener(
	"click",
	function(event){
		var state = document.getElementById("use_caching").checked;
		enableCachingForDomain(state);
		showUserWarn('Changes will take effect after page refresh');
	}
)

function notifyContentScript(fnbody){
	chrome.tabs.query(
		{
			active: true,
			currentWindow: true
		},
		function(tabs) {
	  		chrome.tabs.sendMessage(
	  			tabs[0].id,
	  			{
	  				reciever : "identityFnBody",
	  				data : fnbody
	  			},
	  			function(response) {
	    			console.log(response.result);
	  			}
	  		);
		}
	);
	showUserWarn('Changes will take effect after page refresh');
}

function showUserWarn (message) {
	var userMessageElem = document.getElementById("user_message")
	userMessageElem.innerHTML = message;
}

function enableCachingForDomain(state){
	chrome.tabs.query(
		{
			active: true,
			currentWindow: true
		},
		function(tabs) {
	  		chrome.tabs.sendMessage(
	  			tabs[0].id,
	  			{
	  				reciever : "enableCachingForDomain",
	  				data : state
	  			},
	  			function(response) {
	    			console.log(response.result);
	  			}
	  		);
		}
	);
}


enableMessagingFromDomain();