var injFns = require('./injectionFuncs.js').injectionFuncs;

injFns.injectScriptFile('../dist/injected.js');

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.identityFnBody){
			injFns.injectIdentityFn(request.identityFnBody);
			sendResponse({result: "success"});
		}	
	}
);