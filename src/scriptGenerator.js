module.exports.scriptGenerator = {
	genIdentityFnIncorpScript(identityFnBody){
		return '(function(){'+
				'window.setIdentityFnBody("'+identityFnBody+'");'+
				'window.setIdentityFn();'+
				'delete window.setIdentityFnBody;'+
				'delete window.setIdentityFn;'+
			'})();';
	}
};