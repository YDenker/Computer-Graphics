var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');

if(!gl){
    throw new Error('WebGL not supported');
}



var vertexData = [
    0,0.8,0,
    0.6,0,0,
    -0.6,0,0,
    0.5,0,0,
    -0.5,0,0,
    -0.5,-1,0,
    -0.5,-1,0,
    0.5,0,0,
    0.5,-1,0,
    0,0.8,0,
    0.6,0,0,
    -0.6,0,0,
    0,0.8,0,
    0.6,0,0,
    -0.6,0,0,
];

var colorData = [
    1,0,0,
    1,0,0,
    1,0,0,
    1,1,0,
    1,1,0,
    1,1,0,
    1,1,0,
    1,1,0,
    1,1,0,
    0,0,0,
    0,0,0,
    0,0,0,
    0.2,0.2,0.2,
    0.2,0.2,0.2,
    0.2,0.2,0.2,
];

var positionBuffer = gl.createBuffer(); // Buffer ertellen
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer); // vertexdata in Buffer laden
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

var colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);

var vertexShader = gl.createShader(gl.VERTEX_SHADER); // Vertex shader erzeugen
gl.shaderSource(vertexShader,`
precision mediump float;
attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;
uniform mat4 matrix;
void main() {
    vColor = color;
    gl_Position = matrix * vec4(position, 1);
}
`);
gl.compileShader(vertexShader);
console.log(gl.getShaderInfoLog(vertexShader));

var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); // Fragment shader erzeugen
gl.shaderSource(fragmentShader, `
precision mediump float;
varying vec3 vColor;
void main() {
    gl_FragColor = vec4(vColor, 1);
}
`);
gl.compileShader(fragmentShader);
console.log(gl.getShaderInfoLog(fragmentShader));

var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

var posAttribLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(posAttribLocation);
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
gl.vertexAttribPointer(posAttribLocation, 3, gl.FLOAT, false, 0,0);

var colorAttribLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorAttribLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorAttribLocation, 3, gl.FLOAT, false, 0,0);

gl.useProgram(program);

var uniformLocations = {
    matrix: gl.getUniformLocation(program, `matrix`),
};

var matrix = new mat4();
matrix.setScale(1);
matrix.setRotate([0,0,0]);
matrix.setTranslate([0,0,0]);
console.log(matrix);

var secondsMatrix = new mat4();

var minutesMatrix = new mat4();

function UpdateClockMatrices(){
    var timeSecRad = new Date().getSeconds()* Math.PI / 30;
    secondsMatrix.setIdentity();
    secondsMatrix.setScaleX(.02);
    secondsMatrix.setScaleY(.6);
    secondsMatrix.setScaleZ(1);
    secondsMatrix.setRotateZ(timeSecRad);
    secondsMatrix.setTranslate([0,-.5,0]);

    var timeMinRad = new Date().getMinutes()* Math.PI / 30;
    minutesMatrix.setIdentity();
    minutesMatrix.setScaleX(.05);
    minutesMatrix.setScaleY(.5);
    minutesMatrix.setScaleZ(1);
    minutesMatrix.setRotateZ(timeMinRad);
    minutesMatrix.setTranslate([0,-.5,0]);
}

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

function drawTriangles(start,finish, matrix){
    gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix.toFloat32Array());
    gl.drawArrays(gl.TRIANGLES, start, finish);
}

function animate(){
    initCanvas();
    UpdateClockMatrices();
    drawTriangles(0,9,matrix);
    drawTriangles(12,3,minutesMatrix);
    drawTriangles(9,3,secondsMatrix);
    requestAnimationFrame(animate);
}
animate();
