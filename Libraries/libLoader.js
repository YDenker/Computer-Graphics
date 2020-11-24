function scriptLoader(path, callback){
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.defer = true;
    script.src = path;
    script.onload = function(){
        if(typeof(callback) == "function") callback;
    }
    try{
        var scriptOne = document.getElementsByTagName('script')[0];
        scriptOne.parentNode.insertBefore(script,scriptOne);
    }
    catch(e){
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}

function loadLibraryScripts(){
    scriptLoader('../Libraries/shaders.js');
    scriptLoader('../Libraries/buffer.js');
    scriptLoader('../Libraries/attributePointer.js');
    scriptLoader('../Libraries/matrix.js');
    scriptLoader('../Libraries/rgbColor.js');
    scriptLoader('../Libraries/entity.js');
    scriptLoader('../Libraries/triangle.js');
    scriptLoader('../Libraries/quad.js');
    scriptLoader('../Libraries/entities.js');
    scriptLoader('../Libraries/templates.js');
    scriptLoader('main.js'); // always do this at the bottom!
}

loadLibraryScripts();
