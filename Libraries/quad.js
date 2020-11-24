class quad extends Entity{
    constructor(entitiesHolder){
        super();
        this.vertices = [-1,1,0,
                         1,-1,0,
                         -1,-1,0,
                         -1,1,0,
                         1,1,0,
                         1,-1,0,];
        this.color = [];
        for(var i = 0; i < this.vertices.length; i++){
            this.color.push(1);
        }
        this.transform = new mat4();
        this.vertexAmount = 6;
        this.entityIndex = entitiesHolder.addEntity(this);
    }
}