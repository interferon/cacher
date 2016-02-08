var sg = require('./scriptGenerator.js').scriptGenerator;

module.exports.injectionFuncs = {
	injectIdentityFn(identityFnBody){
		var identityFn = sg.genIdentityFnIncorpScript(identityFnBody);
		console.log(identityFn);
		var script = document.createElement('script');
		script.textContent = identityFn;
		(document.head||document.documentElement).appendChild(script);
		script.parentNode.removeChild(script);
	},
	injectScriptFile(file_path){
		var s = document.createElement('script');
		s.src = chrome.extension.getURL(file_path);
		s.onload = function() {
		    this.parentNode.removeChild(this);
		};
		(document.head || document.documentElement).appendChild(s);
	}
}