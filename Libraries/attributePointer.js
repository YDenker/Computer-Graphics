/** Creating and enabling a Vertex attribute pointer with the following variables
 * 
 * @param {WebGLRenderingContext} webglContext 
 * @param {*} program 
 * @param {*} buffer 
 * @param {*} bufferType 
 * @param {string} attributeName 
 * @param {*} attributeType 
 * @param {int} size 
 * @param {boolean} normalized 
 * @param {int} stride 
 * @param {int} offset 
 */
function createVertexAttributePointer(webglContext,program,buffer,bufferType,attributeName,attributeType,size,normalized,stride,offset){
    var pointerLocation = webglContext.getAttribLocation(program,attributeName);
    webglContext.enableVertexAttribArray(pointerLocation);
    webglContext.bindBuffer(bufferType,buffer);
    webglContext.vertexAttribPointer(pointerLocation,size,attributeType,normalized,stride,offset);
}