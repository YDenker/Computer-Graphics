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
        uniform vec3 camPos;
        uniform vec3 diffuseColor[3];
        uniform vec3 specularColor[3];
        uniform vec3 ambientColor[3];
        uniform float enabled[3];
        uniform float intensity[3];
        uniform vec3 lightTransform[3];
        vec3 CalculateDirectionalLight(vec3 lightDirection, vec3 diffColor, vec3 specColor, vec3 ambColor, float multiplier){
            vec3 light = normalize(-lightDirection);
            vec3 view = normalize(-vPosition);
            vec3 normal = normalize(vNormal);
            vec3 halfVec = normalize(light+view);

            float NdotL = max(dot(normal,light),0.0);
            vec3 diffuse = texture2D(textureID,vUV).rgb * NdotL * diffColor;

            float powNdotH = pow(max(dot(normal, halfVec),0.0),128.0);
            vec3 specular = specColor * powNdotH;

            return ((ambColor + diffuse + specular)*multiplier).rgb;
        }
        vec3 CalculatePointLight(vec3 lightPosition, vec3 diffColor, vec3 specColor, vec3 ambColor, float multiplier){
            vec3 light = lightPosition - vPosition;
            vec3 direction = normalize(light);
            vec3 normal = normalize(vNormal);

            float distance = length(light);
            float attenuation = 1.0/(0.1 + 0.1 * distance + 1.0 * distance * distance);
            float diffuse = max(dot(normal,light),0.0) * attenuation  * multiplier;

            vec3 camDirection = normalize(camPos - vPosition);
            vec3 lightReflect = reflect(-direction,normal);
            float specular = 0.5 * pow(max(dot(lightReflect,camDirection),0.0),20.0)* attenuation * multiplier;

            return (texture2D(textureID,vUV).rgb * diffuse * diffColor + specular * specColor+ ambColor*multiplier).rgb;
        }
        void main() {
            vec3 directional = CalculateDirectionalLight(lightTransform[0],diffuseColor[0],specularColor[0],ambientColor[0],enabled[0]*intensity[0]);
            vec3 headlight = CalculatePointLight(lightTransform[1],diffuseColor[1],specularColor[1],ambientColor[1],(enabled[1]*intensity[1]));
            vec3 pointlight = CalculatePointLight(lightTransform[2],diffuseColor[2],specularColor[2],ambientColor[2],(enabled[2]*intensity[2]));
            
            vec4 finalColor = vec4(directional,1.0);

            finalColor.rgb += headlight;
            finalColor.rgb += pointlight;

            gl_FragColor = finalColor;
        }
        `);
        webGLContext.compileShader(this.shader);
    }

    get(){
        return this.shader;
    }
}