function loadFile(filepath, entitiesHolder){
    fetch(filepath).then(response => response.text()).then(text => parseToEntity(text).init(entitiesHolder));
}

function parseToEntity(text){
var out = new Entity();
let objPositions = [[0, 0, 0]];
let objTexcoords = [[0, 0]];
let objNormals = [[0, 0, 0]];

let objVertexData = [
    objPositions,
    objTexcoords,
    objNormals,
];

let webglVertexData = [
        [],   // positions
        [],   // texcoords
        [],   // normals
    ];

    function addVertex(vert) {
        const ptn = vert.split('/');
        ptn.forEach((objIndexStr, i) => {
        if (!objIndexStr) {
            return;
        }
        const objIndex = parseInt(objIndexStr);
        const index = objIndex + (objIndex >= 0 ? 0 : objVertexData[i].length);
        webglVertexData[i].push(...objVertexData[i][index]);
        });
    }
    let keywords ={
        v(parts) {
            objPositions.push(parts.map(parseFloat));
        },
        vn(parts) {
            objNormals.push(parts.map(parseFloat));
        },
        vt(parts) {
            objTexcoords.push(parts.map(parseFloat));
        },
        f(parts) {
            const numTriangles = parts.length - 2;
            for (let tri = 0; tri < numTriangles; ++tri) {
            addVertex(parts[0]);
            addVertex(parts[tri + 1]);
            addVertex(parts[tri + 2]);
            }
        },
    };

    let keywordRE = /(\w*)(?: )*(.*)/;
    let lines = text.split('\n');
    for(let row = 0; row < lines.length; ++row){
        let line = lines[row].trim();
        if(line === '' || line.startsWith('#')) continue;
        m = keywordRE.exec(line);
        if(!m) continue;
        let [, keyword,unparsedArgs] = m;
        let parts = line.split(/\s+/).slice(1);
        let handler = keywords[keyword];
        if(!handler){
            console.warn('unhandled keyword:', keyword, ' at line ', row +1);
            continue;
        }   
        handler(parts,unparsedArgs);
    }
    out.setVertices(webglVertexData[0]);
    out.setUVCoords(webglVertexData[1]);
    out.setNormals(webglVertexData[2]);
    return out;
}