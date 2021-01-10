var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');
var stats = document.getElementById('stats');

var showMouse = false;

if(!gl){
    throw new Error('WebGL not supported');
}
canvas.setAttribute("tabindex","0");
canvas.style.cursor = 'none';
input.getInstance().addListeners(canvas);

var entities = e.getInstance();
//creating a camera
var mainCamera = new camera(canvas.clientWidth,canvas.clientHeight,true);

// load and bind texture
addTexture2D(gl,"../assets/whiteTexture.png");
addTexture2D(gl,"../assets/wallTexture.png");

// drawing from the templates.js
var rCube = rotatingCube();
var sphere = sphere();
//treeThing();

// Getting the data from all entities
var vertexData = entities.vertexData();
var normalsData = entities.normalsData();
var colorData = entities.colorData();
var uvData = entities.uvData();

// create Buffer for each data type
var positionBuffer = createNewBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(vertexData),gl.STATIC_DRAW);
var normalsBuffer = createNewBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(normalsData),gl.STATIC_DRAW);
var colorBuffer = createNewBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(colorData),gl.STATIC_DRAW);
var uvBuffer = createNewBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(uvData),gl.STATIC_DRAW);

// create vertex and fragment shader
var vertexShader = new myVertexShader(gl);
var fragmentShader = new myFragmentShader(gl);

// create the program and attach all shaders
var program = gl.createProgram();
attachShader(gl,program, vertexShader);
attachShader(gl,program, fragmentShader);
gl.linkProgram(program);

// create attribute pointers
createVertexAttributePointer(gl,program,positionBuffer,gl.ARRAY_BUFFER,`position`,gl.FLOAT,3,false,0,0);
createVertexAttributePointer(gl,program,normalsBuffer,gl.ARRAY_BUFFER,`normal`,gl.FLOAT,3,false,0,0);
createVertexAttributePointer(gl,program,colorBuffer,gl.ARRAY_BUFFER,`color`,gl.FLOAT,3,false,0,0);
createVertexAttributePointer(gl,program,uvBuffer,gl.ARRAY_BUFFER,'uv',gl.FLOAT,2,false,0,0);

// use the reated program inside the webgl context
gl.useProgram(program);
debug.log(entities,"Entities");

var uniformLocations = {
    matrix: gl.getUniformLocation(program, `matrix`),
    normalMatrix: gl.getUniformLocation(program, `normalMatrix`),
    textureID: gl.getUniformLocation(program,`textureID`),
};

function initCanvas(){
    gl.depthFunc(gl.LEQUAL); //Tiefentest einschalten
    gl.enable(gl.DEPTH_TEST);

    gl.clearColor(0.3,0.9,0.3,1.0); //Color Buffer: Farb- und Alphawerte (RGBA)
    gl.clearDepth(1.0); //Depth Buffer: speichert Tiefe z für Pixel

    gl.viewport(0,0,canvas.clientWidth, canvas.clientHeight);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //Setzen des Tiefenbits

    gl.colorMask(true,true,true,true); //Puffer vor Schreiben maskieren
    gl.depthMask(true);
}

function animationLoop(){
    initCanvas();
    Update();
    Redraw();
    requestAnimationFrame(animationLoop);
}
animationLoop();

function Redraw(){
    entities.draw(gl,uniformLocations);
}

function Update(){
    mainCamera.cameraMovement();
    rotateCube();
    showStats();
}

function showStats(){
    if(input.getInstance().mouseClick){
        showMouse = !showMouse;
        canvas.style.cursor = showMouse? 'crosshair' : 'none';
    }
    let x = -mainCamera.transform.position.matArray[3][0].toFixed(2);
    let y = -mainCamera.transform.position.matArray[3][1].toFixed(2);
    let z = -mainCamera.transform.position.matArray[3][2].toFixed(2);
    stats.innerHTML = "Position ["+x+","+y+","+z+"]";
}

function rotateCube(){
    var rotationspeed = Math.PI / 2 / 70;
    rCube.transform.addRotation(new vector3(rotationspeed*2,rotationspeed*.3,rotationspeed));
}
    
