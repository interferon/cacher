module.exports.injectionFuncs = {
	injectScript(script, options){
		var script_tag = document.createElement('script');
		switch(options.type) {
			case 'file':
				script_tag.src = chrome.extension.getURL(script);
			case 'text':
				script_tag.textContent = script;

		}
		script_tag.onload = function() {
		    this.parentNode.removeChild(this);
		};
		(document.head || document.documentElement).appendChild(script_tag);
	}
};