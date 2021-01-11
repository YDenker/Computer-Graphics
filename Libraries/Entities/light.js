class lights{ // not all variables will be used in the shader. Maybe i will add functionality when time goes on...
    directional;
    headlight;
    point;
    constructor(){
        this.directional = new directionalLight();
        this.headlight = new pointLight();
        this.point = new pointLight(new vector3(1,0,0),rgbColor.red(),rgbColor.red());
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
}

class directionalLight{
    ambientColor;
    diffuseColor;
    specularColor;
    lightColor;
    lightDirection;
    enabled;

    constructor(lightDirection = new vector3(-0.5,-0.5,-0.5),lightColor = new rgbColor(1.0,1.0,0.8),diffuseColor = new rgbColor(0.0,0.0,1.0),ambientColor = new rgbColor(1.0,1.0,1.0),specularColor = new rgbColor(0.3,0.3,0.3)){
        this.ambientColor = ambientColor;
        this.diffuseColor = diffuseColor;
        this.specularColor = specularColor;
        this.lightColor = lightColor;
        this.lightDirection = lightDirection;
        this.enabled = true;
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

    constructor(lightPosition = new vector3(0.0,0.0,0.0), lightColor = new rgbColor(1.0,1.0,0.8),diffuseColor = rgbColor.blue(),ambientColor = new rgbColor(0.1,0.1,0.1), specularColor = new rgbColor(0.3,0.3,0.3)){
        this.ambientColor = ambientColor;
        this.diffuseColor = diffuseColor;
        this.specularColor = specularColor;
        this.lightColor = lightColor;
        this.lightPosition = lightPosition;
        this.enabled =true;
    }

    toggle(){
        this.enabled = !this.enabled;
    }
}