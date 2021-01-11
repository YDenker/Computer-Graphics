class vector3{
    x;
    y;
    z;
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    normalize(){
        let length = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
        return new vector3(this.x/length,this.y/length,this.z/length);
    }

    multiply(int){
        return new vector3(this.x*int,this.y*int,this.z*int);
    }

    add(vec3){
        return new vector3(this.x+vec3.x,this.y+vec3.y,this.z+vec3.z);
    }

    applyMat4(matrix){
        matrix = matrix.matArray;
        let x = matrix[0][0] * this.x + matrix[0][1] * this.y + matrix[0][2] * this.z + matrix[0][3];
        let y = matrix[1][0] * this.x + matrix[1][1] * this.y + matrix[1][2] * this.z + matrix[1][3];
        let z = matrix[2][0] * this.x + matrix[2][1] * this.y + matrix[2][2] * this.z + matrix[2][3];
        //let w = matrix[0][3] * this.x + matrix[1][3] * this.y + matrix[2][3] + matrix[3][3]; => Homogenous coordinate
        return new vector3(x,y,z);
    }

    toArray(){
        return [this.x,this.y,this.z];
    }
}