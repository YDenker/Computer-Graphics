class tri extends Entity{
    
    constructor(entitiesHolder){
        super();
        this.vertices = [0, 1,0,
                         1,-1,0,
                        -1,-1,0,];
            this.init(entitiesHolder);
    } 
    setMultiColor(colors){
        this.color = colors;
    }
    /** Set the Colors per vertex of the triangle
     * @param {Array<rgbColor>} rgbColors an array of three rgb colors, one for each vertex
    */
    setMultiColorRGB(rgbColors){
    this.color = rgbColors[0].get().concat(rgbColors[1].get()).concat(rgbColors[2].get());
    }
}

class quad extends Entity{
    constructor(entitiesHolder){
        super();
        this.vertices = [-1,1,0,
                        1,-1,0,
                        -1,-1,0,
                        -1,1,0,
                        1,1,0,
                        1,-1,0,];
        this.init(entitiesHolder);
    }
}

class cube extends Entity{
    constructor(entitiesHolder){
        super();
        this.vertices =[-.5,.5,-.5, // front face
                        .5,.5,-.5,
                        -.5,-.5,-.5,
                        .5,.5,-.5,
                        .5,-.5,-.5,
                        -.5,-.5,-.5,
                        .5,.5,-.5, // right face
                        .5,.5,.5,
                        .5,-.5,-.5,
                        .5,.5,.5,
                        .5,-.5,.5,
                        .5,-.5,-.5,
                        .5,.5,.5, // back face
                        -.5,.5,.5,
                        .5,-.5,.5,
                        -.5,.5,.5,
                        -.5,-.5,.5,
                        .5,-.5,.5,
                        -.5,.5,.5, // left face
                        -.5,.5,-.5,
                        -.5,-.5,.5,
                        -.5,.5,-.5,
                        -.5,-.5,-.5,
                        -.5,-.5,.5,
                        -.5,.5,.5, // up face
                        .5,.5,.5,
                        -.5,.5,-.5,
                        .5,.5,.5,
                        .5,.5,-.5,
                        -.5,.5,-.5,
                        .5,-.5,.5, // down face
                        -.5,-.5,.5,
                        .5,-.5,-.5,
                        -.5,-.5,.5,
                        -.5,-.5,-.5,
                        .5,-.5,-.5,];
        let uvs = [];
        for(var i = 0; i < 6; i++){
            uvs = uvs.concat([0,1,1,1,0,0,1,1,1,0,0,0]);
        }
        this.uvCoords = uvs;
        this.init(entitiesHolder);
    }

    setSidesColorRGBRandom(){
        let randomColors = [];
        for(var i = 0; i < 6; i++){
            let randomColor = rgbColor.random();
            for(var j = 0; j < 6; j++){
                randomColors.push(randomColor.color[0]);
                randomColors.push(randomColor.color[1]);
                randomColors.push(randomColor.color[2]);
            }
        }
        this.color = randomColors;
    }
}