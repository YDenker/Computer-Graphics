class transformation{
    rotation;
    scale;
    position;
    constructor(){
        this.rotation = [0,0,0];
        this.scale = [1,1,1];
        this.position = [0,0,0];
    }

    matrix(){
        let out = new matrix4();
        out.setScale(this.scale);
        out.setRotate(this.rotation);
        out.setTranslate(this.position);
        return out;
    }
    setRotation(radians){
        this.rotation = radians;
    }
    setRotationX(radian){
        this.rotation[0] = radian;
    }
    setRotationY(radian){
        this.rotation[1] = radian;
    }
    setRotationZ(radian){
        this.rotation[2] = radian;
    }
    setTranslation(transVector){
        this.position = transVector;
    }
    setScale(scaleFactor){
        this.scale = scaleFactor;
    }
}