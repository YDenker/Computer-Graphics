function house(){ // static
    var entitiesholder = e.getInstance();
    var roof = new tri(entitiesholder);
    roof.setVertices([0,0.8,0,
                      0.6,0,0,
                      -0.6,0,0,]);
    roof.setColorRGB(rgbColor.red());
    var wall = new quad(entitiesholder);
    wall.setVertices([0.5,0,0,
                      -0.5,0,0,
                      -0.5,-1,0,
                      -0.5,-1,0,
                       0.5,0,0,
                       0.5,-1,0,]);
    wall.setColorRGB(rgbColor.yellow());
}

function minuteHand(){ //dynamic
    var entitiesholder = e.getInstance();
    var minuteHand = new tri(entitiesholder);
    minuteHand.setVertices([0,0.8,0,
                      0.6,0,0,
                     -0.6,0,0,]);
    minuteHand.transform.setScale(new vector3(.05,.5,1));
    minuteHand.transform.setPosition(new vector3(0,-.5,0));
    minuteHand.setColorRGB(rgbColor.black());
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
    c.textureID = 1;
    c.transform.setScale(new vector3(0.5,0.5,0.5));
    c.transform.setPosition(new vector3(1.5,1.5,0));
    return c;
}