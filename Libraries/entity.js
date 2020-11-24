class Entity{
    vertices;
    color;
    transform;
    entityIndex;
    vertexAmount;
    /** draws the entity in the given context */
    draw(webglContext,matrixUniformLocation){
        webglContext.uniformMatrix4fv(matrixUniformLocation,false,this.transform.toFloat32Array());
        webglContext.drawArrays(webglContext.TRIANGLES,this.entityIndex,this.vertexAmount);
    }
    getVertices(){
        return this.vertices;
    }
    getColor(){
        return this.color;
    }
    /** Set the transformation for the entity
     * @param {mat4} matrix the transformation matrix of the entity 
     */
    setTransform(matrix){
        this.transform = matrix;
    }
    /** Set the Color of the entity to a single color
     * @param {Float32Array} color a single color array
     */
    setColor(color){
        this.color = [];
        for(var i = 0; i < this.vertexAmount; i++){
            this.color = this.color.concat(color);
        }
    }
    /** Set the Color of the entity to a single rgb color
     * @param {rgbColor} rgbColor a single rgb color
     */
    setColorRGB(rgbColor){
        this.color = [];
        for(var i = 0; i < this.vertexAmount; i++){
            this.color = this.color.concat(rgbColor.get());
        }
    }
    /** Set the vertices of the entity
     * @param {Float32Array} vertices an array of multiple position vectors, one for each vertex
     */
    setVertices(vertices){
        this.vertices = vertices;
    }
}