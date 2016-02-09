module.exports.scriptGenerator = {
	genIdentityFnIncorpScript(identityFnBody){
		return '(function(){\n'+
					'localStorage.setItem("identityFnBody", "'+identityFnBody+'");\n'+
				'})();';
	},
	genSetCachingScript(state){
		return '(function(){\n'+
					'localStorage.setItem("caching", "'+state+'");\n'+
					'console.log("caching setted to '+state+'");\n'+
				'})();';
	},
	genCurrentDomainMessagingAbilityScript(id){
	return 	'var cachingRequired = localStorage.getItem("caching")\n'+
			'chrome.runtime.sendMessage("'+id+'", {checkBoxState: cachingRequired},\n'+
				'function(response) {\n'+
				'if (!response.success){\n'+
				'	console.log("failed to set checkBoxState");\n'+
				'}\n'+
			'});'
	}
};
