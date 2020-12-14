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

    movementListener(canvas,moveSpeed = 0.1,rotationSpeed= 0.1){
        let cam = this;
        canvas.setAttribute("tabindex","0");
        canvas.addEventListener('keypress', function(evt){
            switch (evt.charCode){
                case 43:
                    cam.transform.addPosition(cam.transform.forward().multiply(moveSpeed));
                    break;
                case 45:
                    cam.transform.addPosition(cam.transform.forward().multiply(-moveSpeed));
                    break;
            }
        }, true);
        canvas.addEventListener('keydown',function(evt){
            switch (evt.keyCode){
                case 37:
                    cam.transform.addPosition(cam.transform.right().multiply(moveSpeed));
                    break;
                case 38:
                    cam.transform.addPosition(cam.transform.up().multiply(-moveSpeed));
                    break;
                case 39:
                    cam.transform.addPosition(cam.transform.right().multiply(-moveSpeed));
                    break;
                case 40:
                    cam.transform.addPosition(cam.transform.up().multiply(moveSpeed));
                    break;
                case 65: // A
                    cam.transform.addRotation(new vector3(0,rotationSpeed,0));
                    break;
                case 68: // D
                    cam.transform.addRotation(new vector3(0,-rotationSpeed,0));
                    break;
                case 83: // S
                    cam.transform.addRotation(new vector3(-rotationSpeed,0,0));
                    break;
                case 87: // W
                    cam.transform.addRotation(new vector3(rotationSpeed,0,0));
                    break;
            }
    
        }, true);
    }
}