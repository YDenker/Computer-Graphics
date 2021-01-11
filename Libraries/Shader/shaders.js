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
        attribute vec3 color;
        attribute vec2 uv;
        varying vec3 vColor;
        varying vec2 vUV;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform mat4 modelViewProjectionMatrix;
        uniform mat4 modelViewMatrix;
        uniform mat4 normalMatrix;
        void main() {
            vNormal = (normalMatrix * vec4(normal,0.0)).xyz;
            vPosition = (modelViewMatrix * vec4(position,1.0)).xyz;
            vColor = color;
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
        varying vec3 vColor;
        varying vec2 vUV;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform sampler2D textureID;
        void main() {
            vec3 diffuseColor = vec3(0.0,0.0,1.0);
            vec3 specularColor = vec3(0.3,0.3,0.3);
            vec3 lightDirection = vec3(-0.57735,-0.57735,-0.57735);

            vec3 light = normalize(-lightDirection);
            vec3 view = normalize(-vPosition);
            vec3 normal = normalize(vNormal);

            vec3 halfVec = normalize(light+view);
            vec3 ambient = vec3(0.1);
            vec3 lightColor = vec3(1.0,1.0,0.8);

            float NdotL = max(dot(normal,light),0.0);
            vec3 diffuse = diffuseColor * NdotL * lightColor;

            float powNdotH = pow(max(dot(normal, halfVec),0.0),128.0);
            vec3 specular = specularColor * powNdotH * lightColor;

            vec4 finalColor = vec4(vec3(ambient + diffuse + specular),1.0);

            finalColor = texture2D(textureID,vUV) * vec4(vColor,1) * finalColor;

            gl_FragColor = finalColor;
        }
        `);
        webGLContext.compileShader(this.shader);
    }

    get(){
        return this.shader;
    }
}