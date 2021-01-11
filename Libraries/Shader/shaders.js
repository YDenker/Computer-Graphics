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
        attribute vec3 normal;
        attribute vec2 uv;
        varying vec2 vUV;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform mat4 modelViewProjectionMatrix;
        uniform mat4 modelViewMatrix;
        uniform mat4 normalMatrix;
        void main() {
            vNormal = (normalMatrix * vec4(normal,0.0)).xyz;
            vPosition = (modelViewMatrix * vec4(position,1.0)).xyz;
            vUV = uv;
            gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);
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
        varying vec2 vUV;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform sampler2D textureID;
        uniform vec3 specularColor[3];
        uniform vec3 ambientColor[3];
        uniform float enabled[3];
        uniform vec3 lightDirection;
        void main() {
            vec3 light = normalize(-lightDirection);
            vec3 view = normalize(-vPosition);
            vec3 normal = normalize(vNormal);

            vec3 halfVec = normalize(light+view);
            vec3 lightColor = vec3(1.0,1.0,0.8);

            float NdotL = max(dot(normal,light),0.0);
            vec3 diffuse = texture2D(textureID,vUV).rgb * NdotL * lightColor;

            float powNdotH = pow(max(dot(normal, halfVec),0.0),128.0);
            vec3 specular = specularColor[0] * powNdotH * lightColor;

            vec3 directional = (ambientColor[0] + diffuse + specular)*enabled[0];

            NdotL = max(dot(normal,view),0.0);
            diffuse = texture2D(textureID,vUV).rgb * NdotL;

            powNdotH = pow(NdotL,128.0);
            specular = specularColor[1] * powNdotH;

            vec3 headlight = (ambientColor[1] + diffuse + specular)*enabled[1];

            vec4 finalColor = vec4(directional,1.0);

            gl_FragColor = finalColor;
        }
        `);
        webGLContext.compileShader(this.shader);
    }

    get(){
        return this.shader;
    }
}