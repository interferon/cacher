console.log('injected');
var hp = require('./helperFuncs.js').helperFuncs;

if (hp.cachingIsRequired()){

    var xhr = window.XMLHttpRequest;

    hp.setIdentityFn();

    window.XMLHttpRequest = function (){    
        
        var myXHR = new xhr();
        var xhrWrapper = {
            set onreadystatechange(value){
                xhrWrapper._onreadystatechange = value;
                xhrWrapper.response && hp.triggerReadyStateChangeEvent(xhrWrapper, xhrWrapper.response);
            },
            get onreadystatechange(){
                return xhrWrapper._onreadystatechange;
            }           
        };

        hp.clone(myXHR, xhrWrapper);
        
        function responseListener(){
            if (myXHR.readyState == 4 && myXHR.status == 200){  
                hp.save({
                    url : xhrWrapper.__url,
                    post : xhrWrapper.__post_data,
                    response : myXHR.response
                });
                hp.triggerReadyStateChangeEvent(xhrWrapper, myXHR.response);
            }
        };

        myXHR.addEventListener('readystatechange', responseListener);

        xhrWrapper.readyState = 0;

        xhrWrapper.open = function(method, url, async, user, pass){
            xhrWrapper.__url = url;
            myXHR.open(method, url, async, user, pass);
        };

        xhrWrapper.setRequestHeader = function(DOMStringheader, DOMStringvalue){            
            myXHR.setRequestHeader(DOMStringheader, DOMStringvalue);
        };

        xhrWrapper.getResponseHeader = function(DOMStringheader){           
            myXHR.getResponseHeader(DOMStringheader);
        };

        xhrWrapper.abort = function(){
            myXHR.abort();
        };

        xhrWrapper.send = function(post_data){  
            xhrWrapper.__post_data = post_data;
            if (!hp.isCached(xhrWrapper.__url, xhrWrapper.__post_data)){
                myXHR.send(post_data);
            }else{
                console.log('is cached');
                var cached = hp.get(xhrWrapper.__url, xhrWrapper.__post_data);
                hp.triggerReadyStateChangeEvent(xhrWrapper, cached.response);
            }
        };
        return xhrWrapper;
    };
}