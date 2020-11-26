class Entity{
    vertices;
    color;
    transform;
    entityIndex;
    vertexAmount;

    init(entitiesHolder){
        this.color = [];
        for(var i = 0; i < this.vertices.length; i++){
            this.color.push(1);
        }
        this.transform = new mat4();
        this.vertexAmount = this.vertices.length/3;
        this.entityIndex = entitiesHolder.addEntity(this);
    }

    Update(){ /** This is designed after the concept the unity game engine uses. This function is supposed to be overriden.*/        
    }
    /** draws the entity in the given context */
    draw(webglContext,matrixUniformLocation, camera){
        // viewpoint of camera
        let modelview = camera.transform.multiplyMat4(this.transform);
        // projection matrix
        let modelviewProjection = camera.projectionMatrix.multiplyMat4(modelview);

        debug.logOnce(modelview, "Modelview matrix");
        debug.logOnce(modelviewProjection, "MVProjection matrix");

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