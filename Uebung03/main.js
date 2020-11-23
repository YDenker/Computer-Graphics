var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');

if(!gl){
    throw new Error('WebGL not supported');
}

gl.depthFunc(gl.LEQUAL); //Tiefentest einschalten
gl.enable(gl.DEPTH_TEST);

gl.clearColor(0.3,0.9,0.3,1.0); //Color Buffer: Farb- und Alphawerte (RGBA)

gl.clearDepth(1.0); //Depth Buffer: speichert Tiefe z für Pixel

gl.viewport(0,0,canvas.clientWidth, canvas.clientHeight);

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //Setzen des Tiefenbits

gl.colorMask(true,true,true,true); //Puffer vor Schreiben maskieren
gl.depthMask(true);

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
void main() {
    vColor = color;
    gl_Position = vec4(position, 1);
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
gl.drawArrays(gl.TRIANGLES, 0, 9);

gl.disableVertexAttribArray(posAttribLocation);
gl.deleteBuffer(positionBuffer);

gl.disableVertexAttribArray(colorAttribLocation);
gl.deleteBuffer(colorBuffer);