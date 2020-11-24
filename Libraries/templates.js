function house(){ // static
    entitiesholder = e.getInstance();
    var roof = new tri(entitiesholder);
    roof.setVertices([0,0.8,0,
                      0.6,0,0,
                      -0.6,0,0,]);
    roof.setSingleColorRGB(rgbColor.red());
    var wall1 = new tri(entitiesholder);
    wall1.setVertices([0.5,0,0,
                       -0.5,0,0,
                       -0.5,-1,0,]);
    wall1.setSingleColorRGB(rgbColor.yellow());
    var wall1 = new tri(entitiesholder);
    wall1.setVertices([-0.5,-1,0,
                       0.5,0,0,
                       0.5,-1,0,]);
    wall1.setSingleColorRGB(rgbColor.yellow());
}

function minuteHand(){ //dynamic
    entitiesholder = e.getInstance();
    minuteHand = new tri(entitiesholder);
    minuteHand.setVertices([0,0.8,0,
                      0.6,0,0,
                     -0.6,0,0,]);
    minuteHand.setSingleColorRGB(rgbColor.black());
    return minuteHand;
}

function secondsHand(){ //dynamic
    entitiesholder = e.getInstance();
    secondsHand = new tri(entitiesholder);
    secondsHand.setVertices([0,0.8,0,
                            0.6,0,0,
                            -0.6,0,0,]);
    secondsHand.setSingleColorRGB(rgbColor.grey());
    return secondsHand;
}