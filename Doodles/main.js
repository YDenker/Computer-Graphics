var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl');

if(!gl){
    throw new Error('WebGL not supported');
}
alert('works just fine');

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clearDepth(1.0);
gl.viewport(0,0,canvas.clientWidth, canvas.clientHeight);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

