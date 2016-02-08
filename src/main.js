var sg = require('./scriptGenerator.js').scriptGenerator;

var s = document.createElement('script');
s.src = chrome.extension.getURL('../dist/injected.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);


function incorporateIdFnScript(identityFnBody){
	var identityFn = sg.genIdentityFnIncorpScript(identityFnBody);
	console.log(identityFn);
	var script = document.createElement('script');
	script.textContent = identityFn;
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.identityFnBody){
			incorporateIdFnScript(request.identityFnBody);
			sendResponse({result: "success"});
		}	
	}
);

