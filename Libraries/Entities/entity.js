class Entity{
    vertices;
    color;
    alpha;
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
        this.alpha = 1.0;
        this.transform = new transformation();
        this.vertexAmount = this.vertices.length/3;
        this.textureID = 3;
        this.entityIndex = entitiesHolder.addEntity(this);
    }

    Update(){ /** This is designed after the concept the unity game engine uses. This function is supposed to be overriden.*/        
    }
    /** draws the entity in the given context */
    draw(webglContext,uniformLocations, camera, sunlight){

        let lightProjection = matrix4.orthograficProjection(10.0,-10.0,10.0,-10.0,20.0,1.0);
        let lightView = sunlight.transform.get();

        let lightDirection = new vector3(0,0,1).applyMat4(sunlight.transform.rotation)

        // get the current cameraPosition (it's where the headlight is)
        let cameraPos = camera.getPosition();
        webglContext.uniformMatrix4fv(uniformLocations.projectionMatrix,false,camera.projectionMatrix.toFloat32Array());
        webglContext.uniformMatrix4fv(uniformLocations.viewMatrix,false,camera.transform.get().toFloat32Array());
        webglContext.uniformMatrix4fv(uniformLocations.modelMatrix,false,this.transform.get().toFloat32Array());
        webglContext.uniformMatrix4fv(uniformLocations.lightProjectionMatrix,false,lightProjection.toFloat32Array());
        webglContext.uniformMatrix4fv(uniformLocations.lightViewMatrix,false,lightView.toFloat32Array());
        webglContext.uniform1i(uniformLocations.textureID,this.textureID);
        webglContext.uniform1i(uniformLocations.shadowMap,0);
        webglContext.uniform1f(uniformLocations.alpha,this.alpha);
        webglContext.uniform3fv(uniformLocations.camPos,cameraPos.toArray());
        webglContext.uniform3fv(uniformLocations.diffuseColor,sunlight.diffuseColor.color);
        webglContext.uniform3fv(uniformLocations.specularColor,sunlight.specularColor.color);
        webglContext.uniform3fv(uniformLocations.ambientColor,sunlight.ambientColor.color);
        webglContext.uniform3fv(uniformLocations.lightDirection,lightDirection.toArray());
        webglContext.uniform1f(uniformLocations.enabled,sunlight.enabled);
        webglContext.uniform1f(uniformLocations.intensity,sunlight.intensity);
        webglContext.drawArrays(webglContext.TRIANGLES,this.entityIndex,this.vertexAmount);
    }
    drawDepth(webglContext,uniformLocations,sunlight){
        let lightProjection = matrix4.orthograficProjection(10.0,-10.0,10.0,-10.0,20.0,0.1);
        let lightView = sunlight.transform.get().multiplyMat4(this.transform.get());
        let lightViewProjectionMatrix = lightProjection.multiplyMat4(lightView);
        webglContext.uniformMatrix4fv(uniformLocations.lightViewProjectionMatrix,false,lightViewProjectionMatrix.toFloat32Array());
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
    /** Set the normals for the entity
     * @param {Float32Array} normals an array of normals for each vertex
     */
    setNormals(normals){
        this.normals = normals;
    }
}

class entityholder{
    entities;
    sunlight;
    headindex;
    mainCamera;
    constructor(){
        this.entities = [];
        this.sunlight = new directionalLight();
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
    vertexData(all = true,opaque = true){
        var vertexData = [];
        this.entities.forEach(element => {
            if(all || (opaque && element.alpha == 1.0) || (!opaque && element.alpha < 1.0 && element.alpha > 0.0))
                vertexData = vertexData.concat(element.getVertices());
        });
        return vertexData;
    }
    /** returns the normal for every vertex of every entity in the entities array */
    normalsData(all = true,opaque = true){
        var normalsData = [];
        this.entities.forEach(element => {
            if(all || (opaque && element.alpha == 1.0) || (!opaque && element.alpha < 1.0 && element.alpha > 0.0))
                normalsData = normalsData.concat(element.getNormals());
        });
        return normalsData;
    }
    /** returns the colordata of every entity in the entities array */
    colorData(all = true,opaque = true){
        var colorData = [];
        this.entities.forEach(element => {
            if(all || (opaque && element.alpha == 1.0) || (!opaque && element.alpha < 1.0 && element.alpha > 0.0))
                colorData = colorData.concat(element.getColor());
        });
        return colorData;
    }
    /** returns the uvdata of every entity in the entities array */
    uvData(all = true,opaque = true){
        var uvData = [];
        this.entities.forEach(element => {
            if(all || (opaque && element.alpha == 1.0) || (!opaque && element.alpha < 1.0 && element.alpha > 0.0))
                uvData = uvData.concat(element.getUVCoords());
        })
        return uvData;
    }
    quadData(){
        var quadData = [-1,-1,0,
                        1,-1,0,
                        1,1,0,
                        1,1,0,
                        -1,1,0,
                        -1,-1,0];
        return quadData;
    }
    /** Calls the draw function of every entity in the entities array. */
    draw(webglContent,uniformLocations,all = true,opaque = true){
        this.entities.forEach(element => {
            if(all || (opaque && element.alpha == 1.0) ||(!opaque && element.alpha < 1.0 && element.alpha > 0.1) ){
                element.draw(webglContent,uniformLocations, this.mainCamera, this.sunlight);
            }
        });
    }
    drawCanvas(webglContext,uniformLocations,sceneTextureID){
        webglContext.uniform1i(uniformLocations.texID,sceneTextureID);
        webglContext.drawArrays(webglContext.TRIANGLES,0,6);
    }
    drawShadowMap(webglContent,uniformLocations){
        this.entities.forEach(element => {
            if(element.alpha >= 1.0){
                element.drawDepth(webglContent,uniformLocations,this.sunlight);
            }
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