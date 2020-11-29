var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');

if(!gl){
    throw new Error('WebGL not supported');
}
var entities = e.getInstance();
//creating a camera
var mainCamera = new camera(canvas.clientWidth,canvas.clientHeight,true);

CameraMovement(mainCamera,0.1);

// load and bind texture
addTexture2D(gl,"../assets/whiteTexture.png");
addTexture2D(gl,"../assets/wallTexture.png");

// drawing from the templates.js
house();
var minutes = minuteHand();
var seconds = secondsHand();
var rCube = rotatingCube();

// Getting the data from all entities
var vertexData = entities.vertexData();
var colorData = entities.colorData();
var uvData = entities.uvData();

// create Buffer for each data type
var positionBuffer = createNewBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(vertexData),gl.STATIC_DRAW);
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
createVertexAttributePointer(gl,program,colorBuffer,gl.ARRAY_BUFFER,`color`,gl.FLOAT,3,false,0,0);
createVertexAttributePointer(gl,program,uvBuffer,gl.ARRAY_BUFFER,'uv',gl.FLOAT,2,false,0,0);

// use the reated program inside the webgl context
gl.useProgram(program);
debug.log(entities,"Entities");

var uniformLocations = {
    matrix: gl.getUniformLocation(program, `matrix`),
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

function CameraMovement(camera,speed){
    canvas.setAttribute("tabindex","0");
    canvas.addEventListener('keypress', function(evt){
        switch (evt.charCode){
            case 43:
                camera.transform.addPosition(new vector3(0,0,speed));
                break;
            case 45:
                camera.transform.addPosition(new vector3(0,0,-speed));
                break;
        }
    }, true);
    canvas.addEventListener('keydown',function(evt){
        switch (evt.keyCode){
            case 37:
                camera.transform.addPosition(new vector3(speed,0,0));
                break;
            case 38:
                camera.transform.addPosition(new vector3(0,-speed,0));
                break;
            case 39:
                camera.transform.addPosition(new vector3(-speed,0,0));
                break;
            case 40:
                camera.transform.addPosition(new vector3(0,speed,0));
                break;
        }

    }, true);
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
    rotateCube();
    UpdateClockMatrices();
}

function rotateCube(){
    var rotationspeed = Math.PI / 2 / 70;
    rCube.transform.addRotation(new vector3(rotationspeed*2,rotationspeed*.3,rotationspeed));
}
    
function UpdateClockMatrices(){
    var timeSecRad = new Date().getSeconds()* Math.PI / 30;  
    seconds.transform.setRotation(new vector3(0,0,-timeSecRad));
    
    var timeMinRad = new Date().getMinutes()* Math.PI / 30;
    minutes.transform.setRotation(new vector3(0,0,-timeMinRad));
}
    
