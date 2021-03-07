class inputManager {
    forwards;
    backwards;
    left;
    right;
    up;
    down;
    mouseX;
    mouseY;
    mouseClick;
    interact;
    reload;
    increment;
    decrement;
    constructor(){
        this.forwards = false,this.backwards=false,this.left=false,this.right=false,this.up=false,this.down=false,this.mouseClick = 0, this.mouseX = 0,this.mouseY = 0;
    }

    addListeners(canvas){
        // Adding all the eventlisteners to capture what buttons are pressed
        let i = this;
        canvas.addEventListener('keydown',function(evt){
            switch(evt.keyCode){
                case 37:
                case 65:
                    i.left = true;
                    break;
                case 38:
                case 87:
                    i.forwards = true;
                    break;
                case 39:
                case 68:
                    i.right = true;
                    break;
                case 40:
                case 83:
                    i.backwards = true;
                    break;
                case 81:
                case 45:
                    i.down = true;
                    break;
                case 69:
                case 43:
                    i.up = true;
                    break;
                case 70:
                    i.interact = true;
                    break;
                case 82:
                    i.reload = true;
                    break;
                case 89:
                    i.decrement = true;
                    break;
                case 88:
                    i.increment = true;

            }
        },true);
        canvas.addEventListener('keyup',function(evt){
            switch(evt.keyCode){
                case 37:
                case 65:
                    i.left = false;
                    break;
                case 38:
                case 87:
                    i.forwards = false;
                    break;
                case 39:
                case 68:
                    i.right = false;
                    break;
                case 40:
                case 83:
                    i.backwards = false;
                    break;
                case 81:
                case 45:
                    i.down = false;
                    break;
                case 69:
                case 43:
                    i.up = false;
                    break;
                case 70:
                    i.interact = false;
                    break;
                case 82:
                    i.reload = false;
                    break;
                case 89:
                    i.decrement = false;
                    break;
                case 88:
                    i.increment = false;
            }
        },true);
        canvas.addEventListener('mousemove',function(evt){
            i.mouseX = evt.offsetX;
            i.mouseY = evt.offsetY;
        },true);
        canvas.addEventListener('mousedown',function(evt){
            i.mouseClick = true;
        },true);
        canvas.addEventListener('mouseup',function(evt){
            i.mouseClick = false;
        },true);
    }
}

var input = (function(){
    var instance;
    function createInstance(){
        var entitiesSingleton = new inputManager();
        return entitiesSingleton;
    }
    return {
        getInstance: function (){
            if(!instance){
                instance = createInstance();
            }
            return instance;
        }
    };
})();