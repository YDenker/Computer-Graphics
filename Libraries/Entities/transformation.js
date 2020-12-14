class transformation{
    rotation;
    scale;
    position;

    constructor(){
        this.setRotation(new vector3(0,0,0));
        this.setScale(new vector3(1,1,1));
        this.setPosition(new vector3(0,0,0));
    }
    /** returns the model matrix of the object */
    get(){
        return this.position.multiplyMat4(this.rotation.multiplyMat4(this.scale));
    }

    setRotation(vector){
        this.rotation = matrix4.rotate(vector);
    }
    setScale(vector){
        this.scale = matrix4.scale(vector);
    }
    setPosition(vector){
        this.position = matrix4.translate(vector);
    }
    addRotation(vector){
        this.rotation = this.rotation.multiplyMat4(matrix4.rotate(vector));
    }
    addScale(vector){
        this.scale = this.scale.multiplyMat4(matrix4.scale(vector));
    }
    addPosition(vector){
        this.position = this.position.multiplyMat4(matrix4.translate(vector));
    }

    forward(){
        let forward = new vector3(0,0,1);
        return forward.applyMat4(this.rotation).normalize();
    }

    up(){
        let up = new vector3(0,1,0);
        return up.applyMat4(this.rotation).normalize();
    }

    right(){
        let right = new vector3(1,0,0);
        return right.applyMat4(this.rotation).normalize();
    }
}

class camTransformation extends transformation{
    constructor(){
        super();
    }
    get(){
        return this.rotation.multiplyMat4(this.position);
    }
}