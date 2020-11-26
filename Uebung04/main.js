var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');

if(!gl){
    throw new Error('WebGL not supported');
}
var entities = e.getInstance();
//creating a camera
var mainCamera = new camera(canvas.clientWidth,canvas.clientHeight,true);

CameraMovement(mainCamera);

//drawing from the templates.js
house();
var minutes = minuteHand();
var seconds = secondsHand();

var vertexData = entities.vertexData();
var colorData = entities.colorData();

var positionBuffer = createNewBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(vertexData),gl.STATIC_DRAW);

var colorBuffer = createNewBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(colorData),gl.STATIC_DRAW);

var vertexShader = new myVertexShader(gl);

var fragmentShader = new myFragmentShader(gl);

var program = gl.createProgram();
attachShader(gl,program, vertexShader);
attachShader(gl,program, fragmentShader);
gl.linkProgram(program);

createVertexAttributePointer(gl,program,positionBuffer,gl.ARRAY_BUFFER,`position`,gl.FLOAT,3,false,0,0);

createVertexAttributePointer(gl,program,colorBuffer,gl.ARRAY_BUFFER,`color`,gl.FLOAT,3,false,0,0);

gl.useProgram(program);

var uniformLocations = {
    matrix: gl.getUniformLocation(program, `matrix`),
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

function CameraMovement(camera){
canvas.setAttribute("tabindex","0");
    canvas.addEventListener('keypress', function(evt){
        switch (evt.charCode){
            case 43:
                console.log("zoom in");
                break;
            case 45:
                console.log("zoom out");
                break;
        }
    }, true);
}

debug.log(entities,"Entities");

function animationLoop(){
    initCanvas();
    Update();
    Redraw();
    requestAnimationFrame(animationLoop);
}
animationLoop();

function Redraw(){
    entities.draw(gl,uniformLocations.matrix);
}

function Update(){
    UpdateClockMatrices();
}

function UpdateClockMatrices(){

    var timeSecRad = new Date().getSeconds()* Math.PI / 30;
    let secondsMatrix = new mat4();
    secondsMatrix.setScaleX(.02);
    secondsMatrix.setScaleY(.6);
    secondsMatrix.setScaleZ(1);
    secondsMatrix.setRotateZ(timeSecRad);
    secondsMatrix.setTranslate([0,-.5,0]);
    seconds.setTransform(secondsMatrix);

    var timeMinRad = new Date().getMinutes()* Math.PI / 30;
    let minutesMatrix = new mat4();
    minutesMatrix.setScaleX(.05);
    minutesMatrix.setScaleY(.5);
    minutesMatrix.setScaleZ(1);
    minutesMatrix.setRotateZ(timeMinRad);
    minutesMatrix.setTranslate([0,-.5,0]);
    minutes.setTransform(minutesMatrix);
}
