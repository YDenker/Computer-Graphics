class matrix4 {
    matArray; 
    /**
     * Creates a 4x4 identity matrix
     */
    constructor(matArray = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]){
        this.matArray = matArray; // COLUMN MAJOR!
    }

    /**
     * Unfinished -- this matrix but normalized.
     *
     */
    normalize(){
        for (var column = 0; column < 4; column++){
            for(var row = 0; row < 4; row++){
                this.matArray[column][row]
            }
        }
    }
    /** Transposes the 4x4 matrix.
     * 
     */
    transpose(){
        let out = new matrix4();
        for(column = 0; column < 4; column++){
            for(row = 0; row < 4; row++){
                out[column][row] = this.matArray[row][column];
            }
        }
        this.matArray = out;
    }
    /** Returns a clone of the 4x4 matrix.*/
    clone(){
        let out = new matrix4();
        for(var column = 0; column < 4; column++){
            for(var row = 0; row < 4; row++){
                out.matArray[column][row] = this.matArray[column][row];
            }
        }
        return out;
    }

    /** Add another matrix to this one.
     * @param {matrix4} rightMatrix right hand additor
     * @returns {matrix4} the result matrix of the operation
     */
    addMat4(rightMatrix){
        let out = new matrix4();
        let temp = rightMatrix.matArray;
        for (var column = 0; column < 4; column++){
            for(var row = 0; row < 4; row++){
                out.matArray[column][row] = this.matArray[column][row] + temp[column][row];
            }
        }
        return out;
    }
    /** Subtract another matrix from this one.
     * @param {matrix4} rightMatrix right hand subtractor
     * @returns {matrix4} the result matrix of the operation
     */
    subtractMat4(rightMatrix){
        let out = new matrix4();
        let temp = rightMatrix.matArray;
        for (var column = 0; column < 4; column++){
            for(var row = 0; row < 4; row++){
                out.matArray[column][row] = this.matArray[column][row] - temp[column][row];
            }
        }
        return out;
    }
    /** Multiply this matrix by another matrix.
     * @param {matrix4} rightMatrix right hand multiplicant
     * @returns {matrix4} the result matrix of the operation
     */
    multiplyMat4(rightMatrix){
        let out = new matrix4();
        let temp = rightMatrix.matArray;
        for (var column = 0; column < 4; column++){
            for(var row = 0; row < 4; row++){
                out.matArray[column][row] = temp[column][0] * this.matArray[0][row] +
                                            temp[column][1] * this.matArray[1][row] +
                                            temp[column][2] * this.matArray[2][row] +
                                            temp[column][3] * this.matArray[3][row];
            }
        }
        return out;
    }

    /** Returns an identity matrix */
    static identity(){
        return new matrix4([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]);
    }
    /** Generates a perspective projection matrix with the given bounds.
     * @param {number} fieldOfView Vertical field of view in radians
     * @param {number} aspectRatio Aspect ratio. typically viewport width/height
     * @param {number} near Near bound of the frustrum. Do not use 0!
     * @param {number} far Far bound of the frustrum. Do not use numbers <=0!
    */
    static perspectiveProjection(fieldOfView,aspectRatio,nearClipping = 1e-3,farClipping = 1e3){
        let f = 1.0 / Math.tan(fieldOfView/2*Math.PI/180);
        return new matrix4([[f/aspectRatio,0,0,0],[0,f,0,0],[0,0,-(farClipping/(farClipping-nearClipping)),-1],[0,0,-(nearClipping*farClipping/(farClipping-nearClipping)),0]]);
    }
    /** Convert to a orthographic projection matrix with the given bounds.
     * @param {number} left Left bound of the frustum
     * @param {number} right Right bound of the frustum
     * @param {number} bottom Bottom bound of the frustum
     * @param {number} top Top bound of the frustum
     * @param {number} near Near bound of the frustum
     * @param {number} far Near bound of the frustum
     */
    /** Generate a matrix with the given scaling.
     * @param {float} scaleVector vector of scalings
     */
    static scale(scaleVector){
        return new matrix4([[scaleVector.x,0,0,0],[0,scaleVector.y,0,0],[0,0,scaleVector.z,0],[0,0,0,1]]);
    }
    /** Set the translation of the matrix.
     * @param {Float32Array} transVector A translation vector that is to be applied to the matrix.
    */
    static translate(transVector){
        var x = transVector.x,
            y = transVector.y,
            z = transVector.z,
            w = 1;
        return new matrix4([[1,0,0,0],[0,1,0,0],[0,0,1,0],[x,y,z,w]]);
    }
    /** Set the rotation of the matrix.
     * @param {Float32Array} radians A vector of the three angles x,y,z in radian. 
     */
    static rotate(radians){
        var xrad = radians.x,
            yrad = radians.y,
            zrad = radians.z;
        let rotX = matrix4.rotateX(xrad),
            rotY = matrix4.rotateY(yrad),
            rotZ = matrix4.rotateZ(zrad);
        return rotX.multiplyMat4(rotY.multiplyMat4(rotZ));
    }
    /** Set the rotation about the X axis of the matrix.
     * @param {float} radian The rotation amount in radian. 
     */
    static rotateX(radian){
        let cosine = Math.cos(radian);
        let sine = Math.sin(radian);
        return new matrix4([[1,0,0,0],[0,cosine,sine,0],[0,-sine,cosine,0],[0,0,0,1]]);
    }
    /** Set the rotation about the Y axis of the matrix.
     * @param {float} radian The rotation amount in radian. 
     */
    static rotateY(radian){
        let cosine = Math.cos(radian);
        let sine = Math.sin(radian);
        return new matrix4([[cosine,0,-sine,0],[0,1,0,0],[sine,0,cosine,0],[0,0,0,1]]);
    }
    /** Set the rotation about the Z axis of the matrix.
     * @param {float} radian The rotation amount in radian. 
     */
    static rotateZ(radian){
        let cosine = Math.cos(radian);
        let sine = Math.sin(radian);
        return new matrix4([[cosine,sine,0,0],[-sine,cosine,0,0],[0,0,1,0],[0,0,0,1]]);
    }
    /** Convert the matrix to a Float32Array.
     * @param {Float32Array}
     */
    toFloat32Array(){
        var out = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for(var columns = 0; columns < 4; columns ++){
            for(var rows = 0; rows < 4; rows ++){
                out[4*columns+rows] = this.matArray[columns][rows];
            }
        }
        return out;
    }
}