const pivots = { //this is especially used in a Cube and maybe futher shapes.
    BOT: new vector3(0,-0.5,0),
    TOP: new vector3(0,0.5,0),
    LEFT: new vector3(-.5,0,0),
    RIGHT: new vector3(0.5,0,0),
    FRONT: new vector3(0,0,-0.5),
    BACK: new vector3(0,0,0.5),
    CENTER: new vector3(0,0,0)
}

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
    constructor(entitiesHolder, pivot = pivots.CENTER){
        super();
        let x = 0.5 - pivot.x, y = 0.5 - pivot.y, z = 0.5 - pivot.z;
        let nX = -0.5 - pivot.x, nY = -0.5 - pivot.y, nZ = -0.5 - pivot.z;
        this.vertices =[nX,y,nZ, // front face
                        x,y,nZ,
                        nX,nY,nZ,
                        x,y,nZ,
                        x,nY,nZ,
                        nX,nY,nZ,
                        x,y,nZ, // right face
                        x,y,z,
                        x,nY,nZ,
                        x,y,z,
                        x,nY,z,
                        x,nY,nZ,
                        x,y,z, // back face
                        nX,y,z,
                        x,nY,z,
                        nX,y,z,
                        nX,nY,z,
                        x,nY,z,
                        nX,y,z, // left face
                        nX,y,nZ,
                        nX,nY,z,
                        nX,y,nZ,
                        nX,nY,nZ,
                        nX,nY,z,
                        nX,y,z, // up face
                        x,y,z,
                        nX,y,nZ,
                        x,y,z,
                        x,y,nZ,
                        nX,y,nZ,
                        x,nY,z, // down face
                        nX,nY,z,
                        x,nY,nZ,
                        nX,nY,z,
                        nX,nY,nZ,
                        x,nY,nZ,];
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

// UV Coords are not yet calculated :/
class uvsphere extends Entity{
    constructor(entitiesHolder,radius,parallels = 20,meridians = 20){
        super();
        var points = [];
        var vertices = [], pi = Math.PI, halfpi = Math.PI / 2;
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
        // create a quad for each point
        for(var i = 0; i < parallels; i++){
            for(var j = 0; j < meridians; j++){
                var point = points[i][j];
                vertices.push(point.x);
                vertices.push(point.y);
                vertices.push(point.z);
                point = points[i][j+1];
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
                point = points[i+1][j+1];
                vertices.push(point.x);
                vertices.push(point.y);
                vertices.push(point.z);
                point = points[i+1][j];
                vertices.push(point.x);
                vertices.push(point.y);
                vertices.push(point.z);
                
            }
        }
        
        this.vertices = vertices;
        this.init(entitiesHolder);
    }
}