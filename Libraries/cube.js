class cube extends Entity{
    constructor(entitiesHolder){
        super();
        this.vertices =[.5,-.5,.5, // +x face
                        .5,.5,.5,
                        .5,-.5,-.5,
                        .5,.5,.5,
                        .5,.5,-.5,
                        .5,-.5,-.5,
                        .5,.5,.5, // y+ face
                        -.5,.5,.5,
                        -.5,.5,-.5,
                        .5,.5,.5,
                        -.5,.5,-.5,
                        .5,.5,-.5,
                        .5,.5,.5, // z+ face
                        .5,-.5,.5,
                        -.5,-.5,.5,
                        .5,.5,.5,
                        -.5,-.5,.5,
                        -.5,.5,.5,
                        -.5,.5,.5, // x- face
                        -.5,-.5,.5,
                        -.5,-.5,-.5,
                        -.5,.5,.5,
                        -.5,-.5,-.5,
                        -.5,.5,-.5,
                        -.5,-.5,.5, // y- face
                        .5,-.5,.5,
                        .5,-.5,-.5,
                        -.5,-.5,.5,
                        .5,-.5,-.5,
                        -.5,-.5,-.5,
                        -.5,-.5,-.5, // z- face
                        .5,-.5,-.5,
                        .5,.5,-.5,
                        -.5,-.5,-.5,
                        .5,.5,-.5,
                        -.5,.5,-.5];
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