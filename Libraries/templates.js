function house(){ // static
    entitiesholder = e.getInstance();
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
    entitiesholder = e.getInstance();
    minuteHand = new tri(entitiesholder);
    minuteHand.setVertices([0,0.8,0,
                      0.6,0,0,
                     -0.6,0,0,]);
    minuteHand.setColorRGB(rgbColor.black());
    return minuteHand;
}

function secondsHand(){ //dynamic
    entitiesholder = e.getInstance();
    secondsHand = new tri(entitiesholder);
    secondsHand.setVertices([0,0.8,0,
                            0.6,0,0,
                            -0.6,0,0,]);
    secondsHand.setColorRGB(rgbColor.grey());
    return secondsHand;
}