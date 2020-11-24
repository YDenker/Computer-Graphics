class tri {
    vertices;
    color;
    transform;
    entityIndex;

    constructor(entitiesHolder){
        this.vertices = [0, 1,0,
                        -1,-1,0,
                         1,-1,0,];
        this.color = [1,0,0,
                      1,0,0,
                      1,0,0,];
        this.transform = new mat4();
        this.entityIndex = entitiesHolder.addTri(this);
    }
    /** draws the triangle in the given context */
    draw(webglContext,matrixUniformLocation){
        webglContext.uniformMatrix4fv(matrixUniformLocation,false,this.transform.toFloat32Array());
        webglContext.drawArrays(webglContext.TRIANGLES,this.entityIndex*3,3);
    }

    /** Set the transformation for the triangle
     * @param {mat4} matrix the transformation matrix of the triangle 
     */
    setTransform(matrix){
        this.transform = matrix;
    }
    /** Set the Color of the triangle to a single color
     * @param {Float32Array} color a single color array
     */
    setSingleColor(color){
        this.color = color.concat(color).concat(color);
    }
    /** Set the Color of the triangle to a single rgb color
     * @param {rgbColor} rgbColor a single rgb color
     */
    setSingleColorRGB(rgbColor){
        this.color = [].concat(rgbColor.get().concat(rgbColor.get()).concat(rgbColor.get()));
    }
    /** Set the Colors per vertex of the triangle
     * @param {Float32Array} colors an array of three colors, one for each vertex
    */
    setColor(colors){
        this.color = colors;
    }
    /** Set the Colors per vertex of the triangle
     * @param {Array<rgbColor>} rgbColors an array of three rgb colors, one for each vertex
    */
    setColor(rgbColors){
    this.color = rgbColors[0].get().concat(rgbColors[1].get()).concat(rgbColors[2].get());
    }
    /** Set the vertices of the triangle
     * @param {Float32Array} vertices an array of three position vectors, one for each vertex
     */
    setVertices(vertices){
        this.vertices = vertices;
    }
}