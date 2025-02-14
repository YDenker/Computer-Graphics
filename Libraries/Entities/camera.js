class camera{
    mainCam; // bool true if this is the main camera
    transform; // current position, rotation and scale of the camera
    fieldOfView; // field of view in degree
    aspects; //width and height of the frustum
    clipping; // near and far clipping

    projectionMatrix; // the projection matrix

    constructor(widthAspect,heighAspect,mainCam = false){
        this.mainCam = mainCam;
        this.transform = new camTransformation();
        this.transform.setPosition(new vector3(0,0,-3));
        this.fieldOfView = 70;
        this.aspects = [widthAspect,heighAspect];
        this.clipping = [1e-3,1e3];

        this.updateProjectionMatrix();

        if(mainCam)
            e.getInstance().mainCamera = this;
    }
    /** needs to be called when either one of the relevant camera values have changed */
    updateProjectionMatrix(){
        this.projectionMatrix = matrix4.perspectiveProjection(this.fieldOfView,this.aspects[0]/this.aspects[1],this.clipping[0],this.clipping[1]);
    }
    getPosition(){
        let x = -this.transform.position.matArray[3][0],
            y = -this.transform.position.matArray[3][1],
            z = -this.transform.position.matArray[3][2];
        return new vector3(x,y,z);
    }
    /** Sets a new field of view for the camera
     * @param {number} fov field of view in either degree or radian
     * @param {boolean} convertToRadian true if fov was entered as degree value
     */
    setFOV(fov,convertToRadian = false){
        if(convertToRadian)
            this.fieldOfView = fov*Math.PI/180;
        else
            this.fieldOfView = fov;
        
            this.updateProjectionMatrix();
    }
    /** Sets new aspects for the view frustum
     * @param {number} width the width of the view frustum
     * @param {number} height the height of the view frustum
     */
    setAspects(width, height){
        this.aspects[0] = width;
        this.aspects[1] = height;
        this.updateProjectionMatrix();
    }
    /** Sets new near and far clipping values
     * @param {number} near the near clipping value that cannot be <=0
     * @param {number} far the far clipping value that should be bigger then the near value
     */
    setClipping(near, far){
        this.clipping[0] = near;
        this.clipping[1] = far;
        this.updateProjectionMatrix();
    }

    cameraMovement(moveSpeed = 0.1,rotationSpeed=0.01,deltaTime = 1){
        let i = input.getInstance();
        if(i.forwards){
            this.transform.addPosition(this.transform.forward().multiply(moveSpeed*deltaTime));
        }
        if(i.backwards){
            this.transform.addPosition(this.transform.forward().multiply(-moveSpeed*deltaTime));
        }
        if(i.left){
            this.transform.addPosition(this.transform.right().multiply(moveSpeed*deltaTime));
        }
        if(i.right){
            this.transform.addPosition(this.transform.right().multiply(-moveSpeed*deltaTime));
        }
        if(i.up){
            this.transform.addPosition(this.transform.up().multiply(moveSpeed*deltaTime));
        }
        if(i.down){
            this.transform.addPosition(this.transform.up().multiply(-moveSpeed*deltaTime));
        }
        this.transform.setRotation(new vector3((i.mouseY*rotationSpeed)+4,(i.mouseX*rotationSpeed+4),0));
    }
}