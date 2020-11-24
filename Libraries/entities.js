class entityholder{
    triangles;
    constructor(){
        this.triangles = [];
    }
    /** Adds a triangle to the triangles array and returns its index */
    addTri(triangle){
        return this.triangles.push(triangle)-1;
    }
    /** returns the vertexdata of every triangle in the triangle array */
    vertexData(){
        var vertexData = [];
        this.triangles.forEach(element => {
            vertexData = vertexData.concat(element.vertices);
        });
        return vertexData;
    }
    /** returns the colordata of every triangle in the triangle array */
    colorData(){
        var colorData = [];
        this.triangles.forEach(element => {
            colorData = colorData.concat(element.color);
        });
        return colorData;
    }
    /** Calls the draw function of every triangle in the triangles array. */
    draw(webglContent,matrixUniformLocation){
        this.triangles.forEach(element => {
            element.draw(webglContent,matrixUniformLocation);
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