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

function createShadowMapBuffers(webglContext,width,height){
    let tex = createTexture(webglContext,width,height);
    let rb = createNewRenderBufferObject(webglContext,width,height);
    return createNewFrameBufferObject(webglContext,tex,rb);
}

function createNewFrameBufferObject(webglContext, texture, renderBuffer){
    var frameBuffer = webglContext.createFramebuffer();
    webglContext.bindFramebuffer(webglContext.FRAMEBUFFER,frameBuffer);
    webglContext.framebufferTexture2D(webglContext.FRAMEBUFFER,webglContext.COLOR_ATTACHMENT0,webglContext.TEXTURE_2D,texture,0);
    webglContext.framebufferRenderbuffer(webglContext.FRAMEBUFFER,webglContext.DEPTH_ATTACHMENT,webglContext.RENDERBUFFER,renderBuffer);
    webglContext.bindFramebuffer(webglContext.FRAMEBUFFER,null);
    if(webglContext.checkFramebufferStatus(webglContext.FRAMEBUFFER) != webglContext.FRAMEBUFFER_COMPLETE) debug.log("FrameBuffer Error");
    return frameBuffer;
}

function createNewRenderBufferObject(webglContext,width,height){
    var renderBuffer = webglContext.createRenderbuffer();
    webglContext.bindRenderbuffer(webglContext.RENDERBUFFER,renderBuffer);
    webglContext.renderbufferStorage(webglContext.RENDERBUFFER,webglContext.DEPTH_COMPONENT16,width,height);
    //webglContext.bindRenderbuffer(webglContext,null); --> Throws a warning ???
    return renderBuffer;
}