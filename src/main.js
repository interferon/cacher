var injFns = require('./injectionFuncs.js').injectionFuncs;
var sg = require('./scriptGenerator.js').scriptGenerator;

injFns.injectScript('../dist/injected.js', {type : 'file'});

chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
		switch(request.reciever) {
			case 'identityFnBody': 
				var identityFnScript = sg.genIdentityFnIncorpScript(request.data);
				injFns.injectScript(identityFnScript, {type : 'text'});
				sendResponse({result: "success"});
		}		
	}
);