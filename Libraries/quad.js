class quad extends Entity{
    constructor(entitiesHolder){
        super();
        this.vertices = [-1,1,0,
                        1,-1,0,
                        -1,-1,0,
                        -1,1,0,
                        1,1,0,
                        1,-1,0,];
        this.init(entitiesHolder);
    }
}