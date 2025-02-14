function house(){ // static
    var entitiesholder = e.getInstance();
    var roof = new tri(entitiesholder);
    roof.setVertices([0,0.8,0,
                      0.6,0,0,
                      -0.6,0,0,]);
    roof.setColorRGB(rgbColor.red());
    roof.textureID = 1;
    var wall = new quad(entitiesholder);
    wall.transform.setPosition(new vector3(0,-0.5,0));
    wall.transform.setScale(new vector3(0.5,0.5,0.5));
    wall.setColorRGB(rgbColor.maroon());
    wall.textureID = 2;
}

function minuteHand(){ //dynamic
    var entitiesholder = e.getInstance();
    var minuteHand = new tri(entitiesholder);
    minuteHand.setVertices([0,0.8,0,
                      0.6,0,0,
                     -0.6,0,0,]);
    minuteHand.transform.setScale(new vector3(.05,.5,1));
    minuteHand.transform.setPosition(new vector3(0,-.5,0));
    minuteHand.setColorRGB(rgbColor.teal());
    return minuteHand;
}

function secondsHand(){ //dynamic
    var entitiesholder = e.getInstance();
    var secondsHand = new tri(entitiesholder);
    secondsHand.setVertices([0,0.8,0,
                            0.6,0,0,
                            -0.6,0,0,]);
    secondsHand.transform.setScale(new vector3(.02,.6,1));
    secondsHand.transform.setPosition(new vector3(0,-.5,0));
    secondsHand.setColorRGB(rgbColor.grey());
    return secondsHand;
}

function rotatingCube(){ // dynamic
    var entitiesholder = e.getInstance();
    var c = new cube(entitiesholder);
    c.setSidesColorRGBRandom();
    c.textureID = 4;
    c.transform.setScale(new vector3(0.5,0.5,0.5));
    c.transform.setPosition(new vector3(1.5,1.5,0));
    return c;
}

function sphere(position = new vector3(-.5,0,-3)){ // dynamic
    var entitiesholder = e.getInstance();
    var s = new uvsphere(entitiesholder,1,20,20);
    //s.setFaceColorRandom();
    s.setColorRGB(rgbColor.grey());
    s.transform.setPosition(position);
    return s;
}

function treeThing(){ //static
    var entitiesholder = e.getInstance();
    var tBase = new cube(entitiesholder);
    tBase.transform.setScale(new vector3(1,4,1));
    tBase.setColorRGB(rgbColor.maroon());
    for(var i = 0; i < 3; i++){
        let tBranch = new cube(entitiesholder,pivots.BOT)
        tBranch.transform.setScale(new vector3(1,4,1));
        tBranch.transform.addRotation(new vector3(0,Math.PI/1.5*i,0));
        tBranch.transform.addRotation(new vector3(Math.PI/3,0,0));
        tBranch.transform.setPosition(new vector3(0,2,0));
        tBranch.setColorRGB(rgbColor.maroon());
    }
}

function objTemplate(filepath){ //static
    var entitiesHolder = e.getInstance();
    return loadFile(filepath, entitiesHolder);
}

function floor(){ //static
    var entitiesHolder = e.getInstance();
    var floor = new quad(entitiesHolder);
    floor.transform.setScale(new vector3(100,100,100));
    floor.transform.setPosition(new vector3(0,-4.1,0));
    floor.transform.setRotation(new vector3(Math.PI / 2,0,0));
    floor.textureID = 5;
    return floor;
}

function TranparentCube(){ // static
    var entitiesHolder = e.getInstance();
    var c = new cube(entitiesHolder);
    c.transform.setScale(new vector3(1.5,1.0,0.5));
    c.transform.setPosition(new vector3(4,-2,0));
    c.alpha = 0.3;
    return c;
}

function ShadowMapQuad(){ // static debug
    var entitiesHolder = e.getInstance();
    var quaddy = new quad(entitiesHolder);
    quaddy.transform.setScale(new vector3(6,6,6));
    quaddy.transform.setPosition(new vector3(0,3,-5));
    quaddy.transform.setRotation(new vector3(Math.PI,0,0));
    quaddy.textureID = 0;
    quaddy.alpha = 0.98;
}