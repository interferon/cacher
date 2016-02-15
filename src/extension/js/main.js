var injFns = require('./injectionFuncs.js').injectionFuncs;

injFns.injectScript('../dist/injected.js', {type : 'file'});

chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
		map[request.reciever](request.data, sendResponse);		
	}
);

var map = {
	setIdentityFnBody : function(fnbody, sendResponse){
		localStorage.setItem("identityFnBody", fnbody);
		sendResponse({result: "success"});
	},
	changeCachingState : function(state, sendResponse){
		localStorage.setItem("caching_state", state);
		localStorage.setItem("pgldgjkefhfiioeacodogfolgpmefblb", "{}");
		sendResponse({result: "success"});
	},
	getCachingState : function(state, sendResponse){
		sendResponse({result : window.localStorage.getItem("caching_state")});
	}
}
