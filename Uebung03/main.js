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

var buffer = gl.createBuffer(); // Buffer ertellen
gl.bindBuffer(gl.ARRAY_BUFFER,buffer); // vertexdata in Buffer laden
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

var vertexShader = gl.createShader(gl.VERTEX_SHADER); // Vertex shader erzeugen
gl.shaderSource(vertexShader,`
attribute vec3 position;
void main() {
    gl_Position = vec4(position, 1);
}
`);
gl.compileShader(vertexShader);

var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); // Fragment shader erzeugen
gl.shaderSource(fragmentShader, `
void main(){
    gl_FragColor = vec4(1,0,0,1);
}
`);
gl.compileShader(fragmentShader);

var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

gl.useProgram(program);

var posAttribLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(posAttribLocation);
gl.vertexAttribPointer(posAttribLocation, 3, gl.FLOAT, false, 0,0);

gl.drawArrays(gl.TRIANGLES, 0, 9);

gl.disableVertexAttribArray(posAttribLocation);
gl.deleteBuffer(buffer);