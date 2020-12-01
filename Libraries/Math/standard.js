/** maps a value from an area to another one */
function map (value, fromStart, fromEnd, toStart, toEnd){
    return ((value-fromStart) * (toEnd-toStart) / (fromEnd - fromStart) + toStart);
}