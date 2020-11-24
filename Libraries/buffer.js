function createNewBuffer(webglContext,buffertype,sourceData,usagePattern){
    var buffer = webglContext.createBuffer();
    webglContext.bindBuffer(buffertype,buffer);
    webglContext.bufferData(buffertype,sourceData,usagePattern);
    return buffer;
}