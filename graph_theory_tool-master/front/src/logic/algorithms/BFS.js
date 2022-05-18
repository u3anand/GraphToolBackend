// returns an array of all the paths branching from one vertex
function BFSRepeat(G, vertex) {
    let paths = [[vertex]];
    let finishedPaths = [];
    let list = G.list;

    while(paths.length > 0) {
        let newPaths = [];
        for(let i = 0; i < paths.length; ++i) {
            let path = paths[i];
            let prevLength = newPaths.length;
            let idx = path[path.length - 1];
            for(let v of list[idx]) {
                if(!path.includes(v)) {
                    let newPath = path.slice(0);
                    newPath.push(v);
                    newPaths.push(newPath);
                }
            }

            if(prevLength == newPaths.length) {
                finishedPaths.push(path);
                paths.splice(i, 1);
                --i;
            }
        }
        paths = newPaths;
    }
    return finishedPaths;
}

function BFSCycle(G, vertex) {
    let paths = [[vertex]];
    let finishedPaths = [];
    let list = G.list;

    while(paths.length > 0) {
        let newPaths = [];
        for(let i = 0; i < paths.length; ++i) {
            let path = paths[i];
            let prevLength = newPaths.length;
            let idx = path[path.length - 1];
            for(let v of list[idx]) {
                if(!path.includes(v)) {
                    let newPath = path.slice(0);
                    newPath.push(v);
                    newPaths.push(newPath);
                }

                if(v === vertex && path.length > 2) {
                    let newPath = path.slice(0);
                    newPath.push(v);
                    finishedPaths.push(newPath);
                }
            }

            if(prevLength == newPaths.length) {
                paths.splice(i, 1);
                --i;
            }
        }
        paths = newPaths;
    }
    
    for(let path of finishedPaths) {
        if(path[1] > path[path.length - 2]) {
            path.reverse();
        }
    }

    let finishedCycles = Array.from(new Set(finishedPaths.map(JSON.stringify)), JSON.parse);

    return finishedCycles;
}

// input: G is the graph, vertex is the starting vertex, and removedVertices
// is an array consisting of the vertices currently in your search already
// (array of 1's and 0's, 1 meaning the vertex is included, 0 meaning not included)

// returns two arrays: One with all the vertices you can reach in the bfs, 
// and one with all the vertices you cannot reach using bfs

function BFSNoRepeat(G, vertex, vertices) {
    let list = G.list;
    let currentVertices = [vertex];
    let vertexMap = vertices;

    vertexMap[vertex] = 1;

    while(currentVertices.length > 0) {
        let newVertices = [];
        for(let v of currentVertices) {
            for(let i = 0; i < list[v].length; ++i) {
                if(vertexMap[list[v][i]] != 1) {
                    ++vertexMap[list[v][i]];
                    newVertices.push(list[v][i]);
                }
            }
        }
        
        currentVertices = newVertices.slice(0);
    }
    
    return vertexMap;
}

export {BFSRepeat, BFSNoRepeat, BFSCycle};

