var texIndex = 0;

/** Creates a texture from an image with the given source inside the context.
 * @param {WebGLRenderingContext} webglContext 
 * @param {string} source the source path
 */
function loadTexture(webglContext,source){
    var texture = webglContext.createTexture();
    var image = new Image();

    image.onload = e => {
        webglContext.bindTexture(webglContext.TEXTURE_2D,texture);
        webglContext.texImage2D(webglContext.TEXTURE_2D,0,webglContext.RGBA,webglContext.RGBA,webglContext.UNSIGNED_BYTE,image);

        webglContext.generateMipmap(gl.TEXTURE_2D);
    };
    image.src = source;
    return texture;
}
/** Bind a created texture to the given paramenters
 * @param {WebGLRenderingContext} webglContext the current rendering context
 * @param {*} textureType the type of texture
 * @param {int} textureIndex the index at which the texture should be loaded (must be below 98)
 * @param {*} texture a already created texture
 */
function bindTexture(webglContext,textureType,textureIndex,texture){
    webglContext.activeTexture(webglContext.TEXTURE0+textureIndex);
    webglContext.bindTexture(textureType,texture);
}

function addTexture2D(webglContext,source){
    let texture = loadTexture(webglContext,source);
    bindTexture(webglContext,webglContext.TEXTURE_2D,texIndex,texture);
    texIndex += 1;
}