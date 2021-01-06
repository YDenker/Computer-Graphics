class light{
    transform; // position and rotation of the light (depending on the light type more or less useful)
    intensitiy; // light intensity
    color; // light color tint
    enabled; // can enable and disable this light

    constructor(intensitiy = 1.0, color = rgbColor.white(), directional = true){
        this.transform = transformation();
        this.intensitiy = intensitiy;
        this.color = color;
        this.enabled = true;
        if(directional) e.getInstance().addDirectionalLight(this);
    }
}

class pointLight extends light{
    radius; // TODO: 0.0 is an infinite radius
    
    constructor(radius = 5.0, intensitiy = 1.0, color = rgbColor.white()){
        super(intensitiy,color,false);
        this.radius = radius;
        e.getInstance().add
    }
}