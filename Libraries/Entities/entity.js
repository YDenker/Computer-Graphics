class Entity{
    vertices;
    color;
    uvCoords;
    normals;
    transform;
    entityIndex;
    vertexAmount;

    textureID;

    init(entitiesHolder){
        this.color = [];
        for(var i = 0; i < this.vertices.length; i++){
            this.color.push(1);
        }
        if(typeof this.uvCoords == 'undefined'){
            this.uvCoords = [];
            for(var i = 0; i < this.vertices.length/3*2;i++){
                this.uvCoords.push(0);
            }
        }
        if(typeof this.normals == 'undefined'){
            this.normals = [];
            for(var i = 0; i < this.vertices.length;i++){
                this.normals.push(1);
            }
        }
        this.transform = new transformation();
        this.vertexAmount = this.vertices.length/3;
        this.textureID = 0;
        this.entityIndex = entitiesHolder.addEntity(this);
    }

    Update(){ /** This is designed after the concept the unity game engine uses. This function is supposed to be overriden.*/        
    }
    /** draws the entity in the given context */
    draw(webglContext,uniformLocations, camera, lights){
        // viewpoint of camera
        let modelview = camera.transform.get().multiplyMat4(this.transform.get());
        // projection matrix
        let modelviewProjection = camera.projectionMatrix.multiplyMat4(modelview);
        // normal matrix (inverse transpose of the modelview matrix???)
        let normalMatrix = this.transform.get();
        //normalMatrix.invert();
        //normalMatrix = normalMatrix.transpose();

        webglContext.uniformMatrix4fv(uniformLocations.modelViewProjectionMatrix,false,modelviewProjection.toFloat32Array());
        webglContext.uniformMatrix4fv(uniformLocations.modelViewMatrix,false,modelview.toFloat32Array());
        webglContext.uniformMatrix4fv(uniformLocations.normalMatrix,false,normalMatrix.toFloat32Array());
        webglContext.uniform1i(uniformLocations.textureID,this.textureID);
        webglContext.uniform1fv(uniformLocations.enabled,lights.getEnabled());
        webglContext.uniform3fv(uniformLocations.ambientColor,lights.getAmbientColors());
        webglContext.uniform3fv(uniformLocations.diffuseColor,lights.getDiffuseColors());
        webglContext.uniform3fv(uniformLocations.specularColor,lights.getSpecularColors());
        webglContext.uniform3fv(uniformLocations.lightDirection,lights.directional.lightDirection.toArray());
        webglContext.drawArrays(webglContext.TRIANGLES,this.entityIndex,this.vertexAmount);
    }
    getVertices(){
        return this.vertices;
    }
    getNormals(){
        return this.normals;
    }
    getColor(){
        return this.color;
    }
    getUVCoords(){
        return this.uvCoords;
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
    /** Set the Color of the entity to a random rgb color for each tri
     */
    setFaceColorRandom(){
        this.color = [];
        for(var i = 0; i < this.vertexAmount/3; i++){
            var random = rgbColor.random().get()
            this.color = this.color.concat(random);
            this.color = this.color.concat(random);
            this.color = this.color.concat(random);
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
    /** Set the uv coordinates for the entity
     * @param {Float32Array} uvCoords an array of uv coordinates for each vertex
     */
    setUVCoords(uvCoords){
        this.uvCoords = uvCoords;
    }
}

class entityholder{
    entities;
    lights;
    headindex;
    mainCamera;
    constructor(){
        this.entities = [];
        this.lights = new lights();
        this.headindex = 0;
    }
    /** Adds an entity to the entities array and returns its index */
    addEntity(entity){
        let temp = this.headindex;
        this.entities.push(entity)
        this.headindex += entity.vertexAmount;
        return temp;
    }
    /** returns the vertexdata of every entity in the entities array */
    vertexData(){
        var vertexData = [];
        this.entities.forEach(element => {
            vertexData = vertexData.concat(element.getVertices());
        });
        return vertexData;
    }
    /** returns the normal for every vertex of every entity in the entities array */
    normalsData(){
        var normalsData = [];
        this.entities.forEach(element => {
            normalsData = normalsData.concat(element.getNormals());
        });
        return normalsData;
    }
    /** returns the colordata of every entity in the entities array */
    colorData(){
        var colorData = [];
        this.entities.forEach(element => {
            colorData = colorData.concat(element.getColor());
        });
        return colorData;
    }
    /** returns the uvdata of every entity in the entities array */
    uvData(){
        var uvData = [];
        this.entities.forEach(element => {
            uvData = uvData.concat(element.getUVCoords());
        })
        return uvData;
    }
    /** Calls the draw function of every entity in the entities array. */
    draw(webglContent,uniformLocations){
        this.entities.forEach(element => {
            element.draw(webglContent,uniformLocations, this.mainCamera, this.lights);
        });
    }
}

// I use this singleton to keep track of all objects (i call them entities for var naming reasons) that are rendered inside the context.
var e = (function(){
    var instance;
    function createInstance(){
        var entitiesSingleton = new entityholder();
        return entitiesSingleton;
    }
    return {
        getInstance: function (){
            if(!instance){
                instance = createInstance();
            }
            return instance;
        }
    };
})();