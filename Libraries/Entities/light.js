class lights{ // not all variables will be used in the shader. Maybe i will add functionality when time goes on...
    directional;
    headlight;
    point;
    constructor(){
        this.directional = new directionalLight();
        this.headlight = new pointLight();
        this.point = new pointLight();
    }

    getDiffuseColors(){
        return this.directional.diffuseColor.color.concat(this.headlight.diffuseColor.color).concat(this.point.diffuseColor.color);
    }
    getAmbientColors(){
        return this.directional.ambientColor.color.concat(this.headlight.ambientColor.color).concat(this.point.ambientColor.color);
    }
    getSpecularColors(){
        return this.directional.specularColor.color.concat(this.headlight.specularColor.color).concat(this.point.specularColor.color);
    }
    getLightColor(){
        return this.directional.lightColor.color.concat(this.headlight.lightColor.color).concat(this.point.lightColor.color);
    }
    getEnabled(){
        return [this.directional.enabled ? 1 : 0,this.headlight.enabled ? 1 : 0,this.point.enabled ? 1 : 0];
    }
    getIntensity(){
        return [this.directional.intensity,this.headlight.intensity,this.point.intensity];
    }
    getLightTransforms(){
        return new vector3(0,0,1).applyMat4(this.directional.transform.rotation).toArray().concat(this.headlight.lightPosition.toArray()).concat(this.point.lightPosition.toArray());
    }
}


class directionalLight{
    ambientColor;
    diffuseColor;
    specularColor;
    lightColor;
    transform;
    enabled;
    intensity;

    constructor(lightPosition = new vector3(0.0,0.0,-5.0),lightRotation = new vector3(-Math.PI/180*135,-Math.PI/180*10,0),diffuseColor = new rgbColor(0.0,0.0,1.0),ambientColor = new rgbColor(0.3,0.3,0.3),specularColor = new rgbColor(0.3,0.3,0.3)){
        this.ambientColor = ambientColor;
        this.diffuseColor = diffuseColor;
        this.specularColor = specularColor;
        this.transform = new camTransformation();
        this.transform.setPosition(lightPosition);
        this.transform.setRotation(lightRotation);
        this.enabled = true;
        this.intensity = 1.0;
    }

    resetTransform(){
        this.transform.setPosition(new vector3(0.0,0.0,-5.0));
        this.transform.setRotation(new vector3(-Math.PI/180*135,-Math.PI/180*10,0));
    }

    lightMovement(moveSpeed = 0.1,rotationSpeed=0.01,deltaTime = 1){
        let i = input.getInstance();
        if(i.forwards){
            this.transform.addPosition(this.transform.forward().multiply(moveSpeed*deltaTime));
        }
        if(i.backwards){
            this.transform.addPosition(this.transform.forward().multiply(-moveSpeed*deltaTime));
        }
        if(i.left){
            this.transform.addPosition(this.transform.right().multiply(moveSpeed*deltaTime));
        }
        if(i.right){
            this.transform.addPosition(this.transform.right().multiply(-moveSpeed*deltaTime));
        }
        if(i.up){
            this.transform.addPosition(this.transform.up().multiply(-moveSpeed*deltaTime));
        }
        if(i.down){
            this.transform.addPosition(this.transform.up().multiply(moveSpeed*deltaTime));
        }
        this.transform.setRotation(new vector3((i.mouseY*rotationSpeed)+4,(i.mouseX*rotationSpeed+4),0));
    }

    toggle(){
        this.enabled = !this.enabled;
    }
}

class pointLight{
    lightPosition;
    ambientColor;
    specularColor;
    diffuseColor;
    lightColor;
    enabled;
    intensity

    constructor(lightPosition = new vector3(0.0,0.0,0.0), lightColor = new rgbColor(1.0,1.0,0.8),diffuseColor = rgbColor.blue(),ambientColor = new rgbColor(0.1,0.1,0.1), specularColor = new rgbColor(0.3,0.3,0.3)){
        this.ambientColor = ambientColor;
        this.diffuseColor = diffuseColor;
        this.specularColor = specularColor;
        this.lightColor = lightColor;
        this.lightPosition = lightPosition;
        this.enabled =true;
        this.intensity = 1.0;
    }

    toggle(){
        this.enabled = !this.enabled;
    }
}