document.getElementById('submit_fn').addEventListener(
	"click",
	function(){
		var fnbody = document.getElementById('custom_id_fn').value.trim();
		notifyContentScript(fnbody);
		showUserWarn('Changes will take effect after page refresh');
	}
);

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
	    			console.log(response.farewell);
	  			}
	  		);
		}
	);
}

function showUserWarn (message) {
	var userMessageElem = document.getElementById("user_message")
	userMessageElem.innerHTML = message;
}