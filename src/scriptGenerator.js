module.exports.scriptGenerator = {
	genIdentityFnIncorpScript(identityFnBody){
		return '(function(){\n'+
				'localStorage.setItem("identityFnBody", "'+identityFnBody+'");\n'+
				'cacherNamespace.trigger("identityFnUpdate");\n'+
			'})();';
	}
};