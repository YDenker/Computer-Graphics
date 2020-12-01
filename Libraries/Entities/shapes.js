class tri extends Entity{
    
    constructor(entitiesHolder){
        super();
        this.vertices = [0, 1,0,
                         1,-1,0,
                        -1,-1,0,];
        this.uvCoords = [0.5,1,
                         1,0,
                         0,0,];
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
                        1,1,0,
                        -1,-1,0,
                        1,1,0,
                        1,-1,0,
                        -1,-1,0,];
        this.uvCoords = [0,1,
                         1,1,
                         0,0,
                         1,1,
                         1,0,
                         0,0,];
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

class uvsphere extends Entity{
    constructor(entitiesHolder,radius,parallels,meridians){
        super();
        var points = [];
        var vertices = [], pi = Math.PI, halfpi = Math.PI / 2;
        debug.log(points, "Points");
        // calculate every vertex once and store it in an 2d array
        for(var i = 0; i < parallels +1; i++){
            var latitude = map(i,0,parallels,-halfpi,halfpi);
            var tempArr = []; // stores a row of parallels
            for(var j = 0; j < meridians +1; j++){
                var longitude = map(j,0,meridians,-pi,pi);
                let x = radius * Math.sin(longitude) * Math.cos(latitude);
                let y = radius * Math.cos(longitude);
                let z = radius * Math.sin(longitude) * Math.sin(latitude);
                tempArr.push(new vector3(x,y,z));
            }
            points.push(tempArr);
        }
        for(var i = 0; i < parallels; i++){
            for(var j = 0; j < meridians; j++){
                var point = points[i][j];
                vertices.push(point.x);
                vertices.push(point.y);
                vertices.push(point.z);
                point = points[i+1][j];
                vertices.push(point.x);
                vertices.push(point.y);
                vertices.push(point.z);
                point = points[i][j+1];
                vertices.push(point.x);
                vertices.push(point.y);
                vertices.push(point.z);
            }
        }
        
        this.vertices = vertices;
        this.init(entitiesHolder);
    }
}