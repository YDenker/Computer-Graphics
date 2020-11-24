/** Attaches a shader to a create program inside the context of webgl.
 * 
 * @param {*} webGLContext from canvas.getContext('webgl');
 * @param {*} program the program created inside said context.
 * @param {*} shader the shader you want to attach
 */
function attachShader(webGLContext, program, shader){
    webGLContext.attachShader(program,shader.get());
}

class myVertexShader{
    shader;
    constructor(webGLContext){
        this.shader = webGLContext.createShader(webGLContext.VERTEX_SHADER);

        webGLContext.shaderSource(this.shader,`
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
        webGLContext.compileShader(this.shader);
    }

    get(){
        return this.shader;
    }
}

class myFragmentShader{
    shader;
    constructor(webGLContext){
        this.shader = webGLContext.createShader(webGLContext.FRAGMENT_SHADER);
        webGLContext.shaderSource(this.shader, `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1);
        }
        `);
        webGLContext.compileShader(this.shader);
    }

    get(){
        return this.shader;
    }
}