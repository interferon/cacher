var injFns = require('./injectionFuncs.js').injectionFuncs;

var sg = require('./scriptGenerator.js').scriptGenerator;

injFns.injectScript(
	'../dist/injected.js',
	{type : 'file'}
);

var map = {
	identityFnBody : function(fnbody, sendResponse){
		var identityFnScript = sg.genIdentityFnIncorpScript(fnbody);
		injFns.injectScript(identityFnScript, {type : 'text'});
		sendResponse({result: "success"});
	},
	enableCachingForDomain : function(isRequired, sendResponse){
		var cachingSettingScript = sg.genSetCachingScript(isRequired);
		injFns.injectScript(cachingSettingScript, {type : 'text'});
		sendResponse({result: "success"});
	},
	checkCachingState : function(state, sendResponse){
		var caching = window.localStorage.getItem("caching");
		sendResponse({result : caching});
	}
}

chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
		map[request.reciever](request.data, sendResponse);		
	}
);