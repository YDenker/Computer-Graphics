class rgbColor{
    color;
    constructor(red, green, blue){
        this.setRGB(red,green,blue);
    }
    /** Set the red, green and blue values. If one is above 1 it is interpreted in a 255 range. 
     * @param {float} red the red value of the color
     * @param {float} green the green value of the color
     * @param {float} blue the blue value of the color
    */
    setRGB(red,green,blue){
        if(red > 1 || green > 1 || blue > 1)
            this.color=[red/255,green/255,blue/255];
        else
            this.color = [red,green,blue];
    }
    /** Set the rgbvector with colorvalues
     * @param {Float32Array} color rgb colorvector
     */
    set(color){
        this.color = color;
    }
    /** Get the rgbvector with colorvalues
     * @returns {Float32Array} the colorvalues in a rgbvector format
     */
    get(){
        return this.color;
    }

    static red(){
        return new rgbColor(1,0,0);
    }
    static blue(){
        return new rgbColor(0,0,1);
    }
    static lime(){
        return new rgbColor(0,1,0);
    }
    static green(){
        return new rgbColor(0,0.5,0);
    }
    static black(){
        return new rgbColor(0,0,0);
    }
    static white(){
        return new rgbColor(1,1,1);
    }
    static yellow(){
        return new rgbColor(1,1,0);
    }
    static cyan(){
        return new rgbColor(0,1,1);
    }
    static orange(){
        return new rgbColor(1,0.5,0);
    }
    static magenta(){
        return new rgbColor(1,0,1);
    }
    static silver(){
        return new rgbColor(0.75,0.75,0.75);
    }
    static grey(){
        return new rgbColor(0.5,0.5,0.5);
    }
    static maroon(){
        return new rgbColor(0.5,0,0);
    }
    static olive(){
        return new rgbColor(0.5,0.5,0);
    }
    static purple(){
        return new rgbColor(0.5,0,0.5);
    }
    static teal(){
        return new rgbColor(0,0.5,0.5);
    }
    static navy(){
        return new rgbColor(0,0,0.5);
    }
    static pink(){
        return new rgbColor(1,0,0.5);
    }
    static random(){
        return new rgbColor(Math.random(),Math.random(),Math.random());
    }
}