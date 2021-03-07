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
        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;
        uniform mat4 lightProjectionMatrix;
        uniform mat4 lightViewMatrix;
        varying vec2 vUV;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec4 vPosLightSpace;
        void main() {
            mat4 modelView = viewMatrix * modelMatrix;
            mat4 modelViewProjectionMatrix = projectionMatrix * modelView;
            vPosition = (modelView * vec4(position,1.0)).xyz;
            vNormal = (modelMatrix * vec4(normal,0.0)).xyz;
            vUV = uv;
            vPosLightSpace = lightProjectionMatrix * lightViewMatrix * vec4(position, 1.0);
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
        varying vec4 vPosLightSpace;
        uniform sampler2D textureID;
        uniform sampler2D shadowMap;
        uniform float alpha;
        uniform vec3 camPos;
        uniform vec3 diffuseColor;
        uniform vec3 specularColor;
        uniform vec3 ambientColor;
        uniform vec3 lightDirection;
        uniform float enabled;
        uniform float intensity;
        float calcShadow(){
            vec3 pos = vPosLightSpace.xyz * 0.5 + 0.5;
            float depth = texture2D(shadowMap, pos.xy).r;
            //return depth < pos.z ? 0.0 : 1.0;
            return 1.0;
        }
        vec3 CalculateDirectionalLight(vec3 lightDirection, vec3 diffColor, vec3 specColor, vec3 ambColor, float multiplier){
            vec3 light = normalize(-lightDirection);
            vec3 view = normalize(-vPosition);
            vec3 normal = normalize(vNormal);
            vec3 halfVec = normalize(light+view);

            float NdotL = max(dot(normal,light),0.0);
            vec3 diffuse = texture2D(textureID,vUV).rgb * NdotL * diffColor;

            float powNdotH = pow(max(dot(normal, halfVec),0.0),128.0);
            vec3 specular = specColor * powNdotH;

            float shadow = calcShadow();

            return ((ambColor + shadow*(diffuse + specular))*multiplier).rgb;
        }
        void main() {
            vec3 directional = CalculateDirectionalLight(lightDirection,diffuseColor,specularColor,ambientColor,enabled*intensity);
            
            vec4 finalColor = vec4(directional,alpha);

            gl_FragColor = finalColor;
        }
        `);
        webGLContext.compileShader(this.shader);
    }

    get(){
        return this.shader;
    }
}

class fboSceneVertexShader{
    shader;
    constructor(webGLContext){
        this.shader = webGLContext.createShader(webGLContext.VERTEX_SHADER);

        webGLContext.shaderSource(this.shader,`
        precision mediump float;
        attribute vec3 position;
        varying vec2 vTextureCoord;
        void main() {
            vTextureCoord = (position.xy + 1.0) / 2.0;
            gl_Position = vec4(position,1.0);
        }
        `);
        webGLContext.compileShader(this.shader);
    }

    get(){
        return this.shader;
    }
}

class fboSceneFragmentShader{
    shader;
    constructor(webGLContext){
        this.shader = webGLContext.createShader(webGLContext.FRAGMENT_SHADER);
        webGLContext.shaderSource(this.shader, `
        precision mediump float;
        varying vec2 vTextureCoord;
        uniform sampler2D texID;
        void main(){
            gl_FragColor = texture2D(texID,vTextureCoord);
        }
        `);
        webGLContext.compileShader(this.shader);
    }

    get(){
        return this.shader;
    }
}

class shadowVertexShader{
    shader;
    constructor(webGLContext){
        this.shader = webGLContext.createShader(webGLContext.VERTEX_SHADER);

        webGLContext.shaderSource(this.shader,`
        precision mediump float;
        attribute vec3 position;
        uniform mat4 lightViewProjectionMatrix;
        varying vec4 vProjCoord;
        void main() {
            vProjCoord = lightViewProjectionMatrix * vec4(position,1.0);
            gl_Position = vProjCoord;
        }
        `);
        webGLContext.compileShader(this.shader);
    }

    get(){
        return this.shader;
    }
}

class shadowFragmentShader{
    shader;
    constructor(webGLContext){
        this.shader = webGLContext.createShader(webGLContext.FRAGMENT_SHADER);
        webGLContext.shaderSource(this.shader, `
        precision mediump float;
        varying vec4 vProjCoord;
        void main(){
            vec3 proj = (vProjCoord.xyz/vProjCoord.w + 1.0)/2.0;
            gl_FragColor = vec4(proj,1.0);
        }
        `);
        webGLContext.compileShader(this.shader);
    }

    get(){
        return this.shader;
    }
}

class bloomShader{
    shader;
    constructor(webGLContext){
        this.shader = webGLContext.createShader(webGLContext.FRAGMENT_SHADER);
        webGLContext.shaderSource(this.shader,`
        precision mediump float;
        varying vec2 textureCoords;
        uniform sampler2D colorTexture;
        void main(){
            vec4 color = texture(colorTexture, textureCoords);
            float brightness = (color.r * 0.2126) + (color.g * 0.7152) + (color.b * 0.0722);
            gl_FragColor = color * brightness;
        }
        `);
    }
    get(){
        return this.shader;
    }
}

class combineFragment{
    shader;
    constructor(webGLContext){
        this.shader = webGLContext.createShader(webGLContext.FRAGMENT_SHADER);
        webGLContext.shaderSource(this.shader,`
        precision mediump float;
        varying vec2 textureCoords;
        varying float bloom;
        uniform sampler2D colorTexture;
        uniform sampler2D highlightTexture;
        void main(){
            vec4 sceneColor = texture(colorTexture, textureCoords);
            vec4 highlightColor = texture(highlightTexture, textureCoords);
            gl_FragColor = sceneColor + highlightColor * bloom;
        }
        `);
    }
    get(){
        return this.shader;
    }
}