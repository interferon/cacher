module.exports.scriptGenerator = {
	genIdentityFnIncorpScript(identityFnBody){
		return '(function(){\n'+
					'localStorage.setItem("identityFnBody", "'+identityFnBody+'");\n'+
				'})();';
	},
	genCachingStateScript(state){
		return '(function(){\n'+
					'localStorage.setItem("caching", "'+state+'");\n'+
					'localStorage.setItem("pgldgjkefhfiioeacodogfolgpmefblb", "{}");\n'+
					'console.log("caching setted to '+state+'");\n'+
					'console.log("storage is", localStorage.getItem("pgldgjkefhfiioeacodogfolgpmefblb"));\n'+
				'})();';
	}
};
