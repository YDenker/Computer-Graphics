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

//create scene texture
let sceneTexture = createTexture(gl,canvas.clientWidth,canvas.clientHeight);
let sceneTexID = texIndex-1;

//create bloom texture
let bloomTexture = createTexture(gl,canvas.clientWidth,canvas.clientHeight);
let bloomTexID = texIndex-1;

// create shadow map
let shadowTexture = createTexture(gl,512,512);
let shadowTexID = texIndex-1;

let lightViewEnabled = false;


// load and bind texture
addTexture2D(gl,"../assets/whiteTexture.png");
addTexture2D(gl,"../assets/wallTexture.png");
addTexture2D(gl,"../assets/groundTexture.png");

// drawing from the templates.js
let rCube = rotatingCube();
TranparentCube();
//ShadowMapQuad();
let cubeobj = objTemplate("../../assets/cube.obj"); // Cube Obj
cubeobj.then(obj => {obj.transform.setPosition(new vector3(0,-3,0));});
let capsule = objTemplate("../../assets/capsule.obj"); // Capsule
capsule.then(obj => {obj.transform.setRotation(new vector3(Math.PI / 3,0,0))});
let fl = floor();

//adjusting lights
entities.sunlight.specularColor = rgbColor.white();
entities.sunlight.diffuseColor = rgbColor.white();
entities.sunlight.intensity = 0.7;

// Getting the data from all entities
var vertexData = entities.vertexData();
var normalsData = entities.normalsData();
var uvData = entities.uvData();
var quadData = entities.quadData();

// create Buffer for each data type
var sceneFBO = initializeFBO(gl,sceneTexture,canvas.clientWidth,canvas.clientHeight);
var shadowFBO = initializeFBO(gl,shadowTexture,canvas.clientWidth,canvas.clientHeight);
var positionBuffer = createNewBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(vertexData),gl.STATIC_DRAW);
var normalsBuffer = createNewBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(normalsData),gl.STATIC_DRAW);
var uvBuffer = createNewBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(uvData),gl.STATIC_DRAW);

var quadBuffer = createNewBuffer(gl,gl.ARRAY_BUFFER,new Float32Array(quadData),gl.STATIC_DRAW);

//Update Buffers
function UpdateBuffers(all = true, opaque = true){
    vertexData = entities.vertexData(all,opaque);
    normalsData = entities.normalsData(all,opaque);
    uvData = entities.uvData(all,opaque);
    updateBuffer(gl,positionBuffer,gl.ARRAY_BUFFER,new Float32Array(vertexData),gl.STATIC_DRAW);
    updateBuffer(gl,normalsBuffer,gl.ARRAY_BUFFER,new Float32Array(normalsData),gl.STATIC_DRAW);
    updateBuffer(gl,uvBuffer,gl.ARRAY_BUFFER,new Float32Array(uvData),gl.STATIC_DRAW);
}

// create vertex and fragment shader
var vertexShader = new myVertexShader(gl);
var fragmentShader = new myFragmentShader(gl);

var sceneVertex = new fboSceneVertexShader(gl);
var sceneFragment = new fboSceneFragmentShader(gl);

var shadowMapVShader = new shadowVertexShader(gl);
var shadowMapFShader = new shadowFragmentShader(gl);

var shadowProgram = gl.createProgram();
attachShader(gl,shadowProgram,shadowMapVShader);
attachShader(gl,shadowProgram,shadowMapFShader);
gl.linkProgram(shadowProgram);

var sceneProgram = gl.createProgram();
attachShader(gl,sceneProgram,sceneVertex);
attachShader(gl,sceneProgram,sceneFragment);
gl.linkProgram(sceneProgram);

createVertexAttributePointer(gl,sceneProgram,quadBuffer,gl.ARRAY_BUFFER,`position`,gl.FLOAT,3,false,0,0);

// create the program and attach all shaders
var program = gl.createProgram();
attachShader(gl,program, vertexShader);
attachShader(gl,program, fragmentShader);
gl.linkProgram(program);

// create attribute pointers
createVertexAttributePointer(gl,program,positionBuffer,gl.ARRAY_BUFFER,`position`,gl.FLOAT,3,false,0,0);
createVertexAttributePointer(gl,program,normalsBuffer,gl.ARRAY_BUFFER,`normal`,gl.FLOAT,3,false,0,0);
createVertexAttributePointer(gl,program,uvBuffer,gl.ARRAY_BUFFER,`uv`,gl.FLOAT,2,false,0,0);


// use the reated program inside the webgl context
gl.useProgram(program);
debug.log(entities,"Entities");

var uniformLocations = {
    //sceneTexture
    texID: gl.getUniformLocation(sceneProgram,`texID`),
	//sceneFBO
    projectionMatrix: gl.getUniformLocation(program, `projectionMatrix`),
    viewMatrix: gl.getUniformLocation(program, `viewMatrix`),
    modelMatrix: gl.getUniformLocation(program, `modelMatrix`),
    lightViewMatrix: gl.getUniformLocation(program,`lightViewMatrix`),
    lightProjectionMatrix: gl.getUniformLocation(program,`lightProjectionMatrix`),
    textureID: gl.getUniformLocation(program,`textureID`),
    shadowMap: gl.getUniformLocation(program,`shadowMap`),
    alpha: gl.getUniformLocation(program,`alpha`),
    camPos: gl.getUniformLocation(program,`camPos`),
    specularColor: gl.getUniformLocation(program,`specularColor`),
    diffuseColor: gl.getUniformLocation(program,`diffuseColor`),
    ambientColor: gl.getUniformLocation(program,`ambientColor`),
    lightDirection: gl.getUniformLocation(program,`lightDirection`),
    enabled:  gl.getUniformLocation(program,`enabled`),
    intensity:  gl.getUniformLocation(program,`intensity`),
    bloom: gl.getUniformLocation(program,`bloom`),
    // ShadowProgram
    lightViewProjectionMatrix: gl.getUniformLocation(shadowProgram,`lightViewProjectionMatrix`),
};

function initCanvas(opaque = true){
    if(opaque){
        gl.depthFunc(gl.LEQUAL); //Tiefentest einschalten
        gl.enable(gl.DEPTH_TEST);

        gl.disable(gl.BLEND);

        gl.enable(gl.CULL_FACE);

        gl.clearColor(0.3,0.9,0.3,1.0); //Color Buffer: Farb- und Alphawerte (RGBA)
        gl.clearDepth(1.0); //Depth Buffer: speichert Tiefe z für Pixel

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //Setzen des Tiefenbits
    }else{
        //gl.disable(gl.DEPTH_TEST);
        
        gl.enable(gl.BLEND);

        //gl.blendEquation();
        gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);

        gl.disable(gl.CULL_FACE);
    }

    gl.enable(gl.SCISSOR_TEST);
    gl.scissor(0,0,canvas.clientWidth,canvas.clientHeight);

    gl.viewport(0,0,canvas.clientWidth, canvas.clientHeight);

    gl.colorMask(true,true,true,true); //Puffer vor Schreiben maskieren
    gl.depthMask(true);
}

function animationLoop(){
    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    //Shadowmaps
    gl.useProgram(shadowProgram);
    //bindTexture(gl.TEXTURE_2D,shadowTexture);
    if(!lightViewEnabled){
        entities.sunlight.resetTransform();
        gl.bindFramebuffer(gl.FRAMEBUFFER,shadowFBO);
    }
    
    gl.viewport(0,0,512,512);
    gl.clearColor(0.2,0.2,0.4,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    entities.drawShadowMap(gl,uniformLocations);

    //Draw to RenderTexture
    gl.bindFramebuffer(gl.FRAMEBUFFER,sceneFBO);
    //opaque
    gl.useProgram(program);
    initCanvas();
    UpdateBuffers();
    Redraw(false);
    //transparent
    initCanvas(false);
    Redraw(false,false);

    if(!lightViewEnabled){
        gl.bindFramebuffer(gl.FRAMEBUFFER,null);
        //opaque
        gl.useProgram(program);
        initCanvas();
        UpdateBuffers();
        Redraw(false);
        //transparent
        initCanvas(false);
        Redraw(false,false);
    }
    /*
    gl.bindFramebuffer(gl.FRAMEBUFFER,null);
    gl.useProgram(sceneProgram);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);
    entities.drawCanvas(gl,uniformLocations,0);
    */
    Update();
    requestAnimationFrame(animationLoop);
}
animationLoop();

function Redraw(all = true, opaque = true){
    entities.draw(gl,uniformLocations,all,opaque);
}

function Update(){
    mainCamera.cameraMovement();
    if(lightViewEnabled)
        entities.sunlight.lightMovement();
    rotateCube();
    lightswitch();
    enableLightView();
    blooooooom();
    showStats();
}

function showStats(){
    if(input.getInstance().mouseClick){
        showMouse = !showMouse;
        canvas.style.cursor = showMouse? 'crosshair' : 'none';
    }
    let x = lightViewEnabled ?entities.sunlight.transform.position.matArray[3][0].toFixed(2):-mainCamera.transform.position.matArray[3][0].toFixed(2);
    let y = lightViewEnabled ?entities.sunlight.transform.position.matArray[3][1].toFixed(2):-mainCamera.transform.position.matArray[3][1].toFixed(2);
    let z = lightViewEnabled ?entities.sunlight.transform.position.matArray[3][2].toFixed(2):-mainCamera.transform.position.matArray[3][2].toFixed(2);
    stats.innerHTML = "Position ["+x+","+y+","+z+"]<br/>Bloom Intensity: ["+(1-bloomIntensity).toFixed(2)+"]";
}

function lightswitch(){
    entities.sunlight.enabled = !input.getInstance().interact;
}

function enableLightView(){
    //lightViewEnabled = input.getInstance().reload;
}

var bloomIntensity = 0.55;
function blooooooom(){
    if(input.getInstance().reload){
        entities.setBloom(1.0);
    } else entities.setBloom(bloomIntensity);

    if(input.getInstance().increment)
        bloomIntensity += 0.01;
    if(input.getInstance().decrement)
        bloomIntensity -= 0.01;

}

function rotateCube(){
    var rotationspeed = Math.PI / 2 / 70;
    rCube.transform.addRotation(new vector3(rotationspeed*2,rotationspeed*.3,rotationspeed));
}
    
