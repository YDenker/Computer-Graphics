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