class tri extends Entity{
    constructor(entitiesHolder){
        super();
        this.vertices = [0, 1,0,
                         1,-1,0,
                         -1,-1,0,];
        this.color = [1,1,1,
                      1,1,1,
                      1,1,1,];
        this.transform = new mat4();
        this.vertexAmount = 3;
        this.entityIndex = entitiesHolder.addEntity(this);
    } 
    setMultiColor(colors){
        this.color = colors;
    }
    /** Set the Colors per vertex of the triangle
     * @param {Array<rgbColor>} rgbColors an array of three rgb colors, one for each vertex
    */
    setMultiColorRGB(rgbColors){
    this.color = rgbColors[0].get().concat(rgbColors[1].get()).concat(rgbColors[2].get());
    }
}