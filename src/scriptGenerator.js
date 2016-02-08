module.exports.scriptGenerator = {
	genIdentityFnIncorpScript(identityFnBody){
		return '(function(){window.setIdentityFnBody("'+identityFnBody+'");delete window.setIdentityFnBody;})();';
	}
};