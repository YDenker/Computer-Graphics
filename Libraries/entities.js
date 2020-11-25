class entityholder{
    entities;
    headindex;
    mainCamera;
    constructor(){
        this.entities = [];
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
    /** returns the colordata of every entity in the entities array */
    colorData(){
        var colorData = [];
        this.entities.forEach(element => {
            colorData = colorData.concat(element.getColor());
        });
        return colorData;
    }
    /** Calls the draw function of every entity in the entities array. */
    draw(webglContent,matrixUniformLocation){
        this.entities.forEach(element => {
            element.draw(webglContent,matrixUniformLocation, this.mainCamera);
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