function createNewBuffer(webglContext,buffertype,sourceData,usagePattern){
    var buffer = webglContext.createBuffer();
    webglContext.bindBuffer(buffertype,buffer);
    webglContext.bufferData(buffertype,sourceData,usagePattern);
    return buffer;
}

function updateBuffer(webglContext,buffer,buffertype,newData,usagePattern){
    webglContext.bindBuffer(buffertype,buffer);
    webglContext.bufferData(buffertype,newData,usagePattern);
}

function initializeFBO(webglContext,texture,width,height){
    let frameBuffer = webglContext.createFramebuffer();
    let renderBuffer = webglContext.createRenderbuffer();

    // Bind Renderbuffer
    webglContext.bindRenderbuffer(webglContext.RENDERBUFFER,renderBuffer);
    webglContext.renderbufferStorage(webglContext.RENDERBUFFER,webglContext.DEPTH_COMPONENT16,width,height);
    webglContext.bindRenderbuffer(webglContext.RENDERBUFFER,null);

    // Bind FrameBuffer
    webglContext.bindFramebuffer(webglContext.FRAMEBUFFER,frameBuffer);
    webglContext.framebufferTexture2D(webglContext.FRAMEBUFFER,webglContext.COLOR_ATTACHMENT0,webglContext.TEXTURE_2D,texture,0);
    webglContext.framebufferRenderbuffer(webglContext.FRAMEBUFFER,webglContext.DEPTH_ATTACHMENT,webglContext.RENDERBUFFER,renderBuffer);
    webglContext.bindFramebuffer(webglContext.FRAMEBUFFER,null);
    if(webglContext.checkFramebufferStatus(webglContext.FRAMEBUFFER) != webglContext.FRAMEBUFFER_COMPLETE) debug.log("FrameBuffer Error");
    return frameBuffer;
}
