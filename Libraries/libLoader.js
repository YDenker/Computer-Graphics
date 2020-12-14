function scriptLoader(path, defer = true, callback){
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.defer = defer;
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
    scriptLoader('../Libraries/debug.js');
    scriptLoader('../Libraries/input.js');
    scriptLoader('../Libraries/rgbColor.js');
    scriptLoader('../Libraries/textures.js');
    scriptLoader('../Libraries/Shader/shaders.js');
    scriptLoader('../Libraries/Shader/buffer.js');
    scriptLoader('../Libraries/Shader/attributePointer.js');
    scriptLoader('../Libraries/Math/standard.js');
    scriptLoader('../Libraries/Math/vector.js');
    scriptLoader('../Libraries/Math/matrix.js');
    scriptLoader('../Libraries/Entities/transformation.js');
    scriptLoader('../Libraries/Entities/camera.js');
    scriptLoader('../Libraries/Entities/entity.js');
    scriptLoader('../Libraries/Entities/shapes.js');
    scriptLoader('../Libraries/Entities/templates.js');
    scriptLoader('main.js'); // always do this at the bottom!
}

loadLibraryScripts();
