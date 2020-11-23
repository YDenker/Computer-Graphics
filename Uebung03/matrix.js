class mat4 {
    matArray; 
    /**
     * Creates a 4x4 identity matrix
     */
    constructor(){
        this.matArray = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]; // COLUMN MAJOR!
    }

    /**
     * Unfinished -- Returns this matrix but normalized.
     * @returns {mat4} normalized matrix
     */
    normalize(){
        for (var column = 0; column < 4; column++){
            for(var row = 0; row < 4; row++){
                this.matArray[column][row]
            }
        }
    }
    /** Returns the transposed 4x4 matrix.
     * 
     * @returns {mat4} transposed matrix
     */
    transpose(){
        let out = new mat4();
        for(column = 0; column < 4; column++){
            for(row = 0; row < 4; row++){
                out[column][row] = this.matArray[row][column];
            }
        }
        return out;
    }
    /** Returns a clone of the 4x4 matrix.*/
    clone(){
        let out = new mat4();
        for(var column = 0; column < 4; column++){
            for(var row = 0; row < 4; row++){
                out.matArray[column][row] = this.matArray[column][row];
            }
        }
        return out;
    }

    /** Add another matrix to this one.
     * @param {mat4} rightMatrix right hand additor
     * @returns {mat4} the result matrix of the operation
     */
    addMat4(rightMatrix){
        let out = new mat4();
        let temp = rightMatrix.matArray;
        for (var column = 0; column < 4; column++){
            for(var row = 0; row < 4; row++){
                out.matArray[column][row] = this.matArray[column][row] + temp[column][row];
            }
        }
        return out;
    }
    /** Subtract another matrix from this one.
     * @param {mat4} rightMatrix right hand subtractor
     * @returns {mat4} the result matrix of the operation
     */
    subtractMat4(rightMatrix){
        let out = new mat4();
        let temp = rightMatrix.matArray;
        for (var column = 0; column < 4; column++){
            for(var row = 0; row < 4; row++){
                out.matArray[column][row] = this.matArray[column][row] - temp[column][row];
            }
        }
        return out;
    }
    /** Multiply this matrix by another matrix.
     * @param {mat4} rightMatrix right hand multiplicant
     * @returns {mat4} the result matrix of the operation
     */
    multiplyMat4(rightMatrix){
        let out = new mat4();
        let temp = rightMatrix.matArray;
        for (var column = 0; column < 4; column++){
            for(var row = 0; row < 4; row++){
                out[column][row] = this.matArray[column][0] * temp[0][row] +
                                   this.matArray[column][1] * temp[1][row] +
                                   this.matArray[column][2] * temp[2][row] +
                                   this.matArray[column][3] * temp[3][row];
            }
        }
        return out;
    }

    /** Set the matrix to its identity matrix */
    setIdentity(){
        this.matArray = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];
    }
    /** Set the scale factor of the matrix
     * @param {float} scaleFactor scale
     */
    setScale(scaleFactor){
        this.matArray[0][0] *= scaleFactor;
        this.matArray[1][1] *= scaleFactor;
        this.matArray[2][2] *= scaleFactor;
    }
    /** Set the translation of the matrix.
     * @param {Float32Array} transVector A translation vector that is to be applied to the matrix.
    */
    setTranslate(transVector){
        var x = transVector[0],
            y = transVector[1],
            z = transVector[2],
            w = 1;
        this.matArray[3][0] = x;
        this.matArray[3][1] = y;
        this.matArray[3][2] = z;
        this.matArray[3][3] = w;
    }
    /** Set the rotation of the matrix.
     * @param {Float32Array} radiants A vector of the three angles x,y,z in radiant. 
     */
    setRotate(radiants){
        var xrad = radiants[0],
            yrad = radiants[1],
            zrad = radiants[2];
        this.setRotateX(xrad);
        this.setRotateY(yrad);
        this.setRotateZ(zrad);
    }
    /** Set the rotation about the X axis of the matrix.
     * @param {Float32Array} radiant The rotation amount in radiant. 
     */
    setRotateX(radiant){
        let cosine = Math.cos(radiant);
        let sine = Math.sin(radiant);
        let clone = this.clone().matArray;
        this.matArray[0][1] = clone[0][1] * cosine + clone[0][2] * sine;
        this.matArray[1][1] = clone[1][1] * cosine + clone[1][2] * sine;
        this.matArray[2][1] = clone[2][1] * cosine + clone[2][2] * sine;
        this.matArray[3][1] = clone[3][1] * cosine + clone[3][2] * sine;
        this.matArray[0][2] = clone[0][2] * cosine - clone[0][1] * sine;
        this.matArray[1][2] = clone[1][2] * cosine - clone[1][1] * sine;
        this.matArray[2][2] = clone[2][2] * cosine - clone[2][1] * sine;
        this.matArray[3][2] = clone[3][2] * cosine - clone[3][1] * sine;
    }
    /** Set the rotation about the Y axis of the matrix.
     * @param {Float32Array} radiant The rotation amount in radiant. 
     */
    setRotateY(radiant){
        let cosine = Math.cos(radiant);
        let sine = Math.sin(radiant);
        let clone = this.clone().matArray;
        this.matArray[0][0] = clone[0][0] * cosine - clone[0][2] * sine;
        this.matArray[1][0] = clone[1][0] * cosine - clone[1][2] * sine;
        this.matArray[2][0] = clone[2][0] * cosine - clone[2][2] * sine;
        this.matArray[3][0] = clone[3][0] * cosine - clone[3][2] * sine;
        this.matArray[0][2] = clone[0][0] * sine + clone[0][2] * cosine;
        this.matArray[1][2] = clone[1][0] * sine + clone[1][2] * cosine;
        this.matArray[2][2] = clone[2][0] * sine + clone[2][2] * cosine;
        this.matArray[3][2] = clone[3][0] * sine + clone[3][2] * cosine;
    }
    /** Set the rotation about the Z axis of the matrix.
     * @param {Float32Array} radiant The rotation amount in radiant. 
     */
    setRotateZ(radiant){
        let cosine = Math.cos(radiant);
        let sine = Math.sin(radiant);
        let clone = this.clone().matArray;
        this.matArray[0][0] = clone[0][0] * cosine + clone[0][1] * sine;
        this.matArray[1][0] = clone[1][0] * cosine + clone[1][1] * sine;
        this.matArray[2][0] = clone[2][0] * cosine + clone[2][1] * sine;
        this.matArray[3][0] = clone[3][0] * cosine + clone[3][1] * sine;
        this.matArray[0][1] = clone[0][1] * cosine - clone[0][0] * sine;
        this.matArray[1][1] = clone[1][1] * cosine - clone[1][0] * sine;
        this.matArray[2][1] = clone[2][1] * cosine - clone[2][0] * sine;
        this.matArray[3][1] = clone[3][1] * cosine - clone[3][0] * sine;
    }
}