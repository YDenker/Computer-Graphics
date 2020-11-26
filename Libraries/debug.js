class debug{
    debugCatalog = [];

    static log(object, prelog = ""){
        console.log(prelog + " :");
        console.log(object);
    }
    static logOnce(object, name){
        if(!d.getInstance().debugCatalog.includes(name)){
            d.getInstance().debugCatalog.push(name);
            this.log(object,name);
        }
    }
}

var d = (function(){
    var instance;
    function createInstance(){
        var logger = new debug();
        return logger;
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
