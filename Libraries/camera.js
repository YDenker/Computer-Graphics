class camera{
    mainCam; // bool true if this is the main camera
    transform; // current position
    fieldOfView; // field of view in radian
    aspects; //width and height of the frustum
    clipping; // near and far clipping

    projectionType; // 0 = perspective, 1 = orthographic

    projectionMatrix; // the projection matrix

    constructor(widthAspect,heighAspect,mainCam = false, projectionType = 0){
        this.mainCam = mainCam;
        this.projectionType = projectionType;
        this.transform = new mat4();
        this.transform.setTranslate([0,0,-2]);
        this.fieldOfView = 70*Math.PI/180;
        this.aspects = [widthAspect,heighAspect];
        this.clipping = [1e-4,1e4];
        this.projectionMatrix = new mat4();

        this.updateProjectionMatrix();

        if(mainCam)
            e.getInstance().mainCamera = this;
    }
    /** needs to be called when either one of the relevant camera values have changed */
    updateProjectionMatrix(){
        if(this.projectionType == 0) this.projectionMatrix.setPerspectiveProjection(this.fieldOfView,this.aspects[0]/this.aspects[1],this.clipping[0],this.clipping[1]);
        else this.projectionMatrix.setOrthographicProjection(this.aspects[0]/2,this.aspects[0]/2,this.aspects[1]/2,this.aspects[1]/2,this.clipping[0],this.clipping[1]);
        debug.logOnce(this.projectionMatrix, "Projetion matrix");
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
}