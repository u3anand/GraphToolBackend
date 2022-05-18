import math from 'mathjs'

class Algorithms {
    edges = [
        [1,2,3,4],
        [0,2,3,4],
        [0,1,3,4],
        [0,1,2,4],
        [0,1,2,3],
        [6,7,8,9],
        [5,7,8,9],
        [5,6,8,9],
        [5,6,7,9],
        [5,6,7,8],
        [11,12],
        [10,12],
        [10,11],
    ]
    
    edges2 = [
        [1,2,3],
        [0,2,3],
        [0,1,3],
        [0,1,2]
    ]

    maxCycle = 0;
    minCycle = Number.MAX_VALUE;
    
    BFS(G, vertex, visited) {
        let vertices = [vertex];
        visited[vertex] = 1;
    
        while(vertices.length > 0) {
            let newVertices = [];
            for(let v of vertices) {
                for(let i = 0; i < G[v].length; ++i) {
                    if(visited[G[v][i]] != 1) {
                        ++visited[G[v][i]];
                        newVertices.push(G[v][i]);
                    }
                }
            }
            vertices = newVertices;
        }
    }
    
    longestPathFromVertex(G, vertex, visited) {
        let mx = 0;
        visited[vertex] = 1;
        for(let v of G[vertex]) {
            if(visited[v] != 1) {
                mx = Math.max(mx, 1 + longestPathFromVertex(G, v, visited));
            }
        }
    
        return mx;
    }
    
    getComponents(G) {
        let count = 0;
        let visited = new Array(G.length).fill(0)
        for(let i = 0; i < G.length; ++i) {
            if(visited[i] == 0) {
                ++count;
                BFS(G, i, visited);
            }
        }
    
        return count;
    }
    
    getLongestPath(G) {
        let mx = 0;
        for(let k = 0; k < G.length; ++k) {
            mx = Math.max(longestPathFromVertex(G, k, new Array(G.length).fill(0)), mx);
        }
    
        return mx;
    }
    
    getCyclesFromVertex(G, vertex, visited, origin, idx, visited2) {
        let cycles = 0;
        visited[vertex] = 1;
        for(let v of G[vertex]) {
            if(visited2[v] == 0) {
                if(v == origin && idx >= 2) {
                    ++cycles;
                    if(idx > maxCycle) {
                        maxCycle = idx;
                    }
                    if(idx < minCycle) {
                        minCycle = idx;
                    }
                } else if(visited[v] == 0) {
                    cycles += getCyclesFromVertex(G, v, visited, origin, idx+1, visited2);
                }
            }
        }
        visited[vertex] = 0;
        return cycles;
    }
    
    generateAdjMatrix(G) {
        let adjMatrix = new Array(G.length);
        for(let i = 0; i < G.length; ++i) {
            adjMatrix[i] = new Array(G.length).fill(0);
        }
    
        for(let i = 0; i < G.length; ++i) {
            for(let j = 0; j < G[i].length; ++j) {
                adjMatrix[i][G[i][j]] = 1;
            }
        }
        return adjMatrix;
    }
    
    getSpanningTrees(G) {
        if(getComponents(G) != 1) {
            return 0;
        }
    
        let adjMatrix = generateAdjMatrix(G);
        let D = new Array(G.length);
        for(let i = 0; i < G.length; ++i) {
            D[i] = new Array(G.length).fill(0);
        } 
        for(let i = 0; i < G.length; ++i) {
            D[i][i] = G[i].length;
        }
    
        Math.subtract
    }
    
    // console.log(getCyclesFromVertex(edges, 12, [0,0,0,0,0,0,0,0,0,0,0,0,0], 12, 0)/2)
    // console.log(countCycles(edges))
    // console.log(getCyclesFromVertex(edges2, 0, [0,0,0,0], 0, 0, [0,1,0,0], 0)/2)
    // console.log(maxCycle + 1);
    // console.log(minCycle + 1);
    // console.log(generateAdjMatrix(edges));
    
    countCycles(G) {
        let visited2 = new Array(G.length).fill(0);
        let cycles = 0;
        for(let i = 0; i < G.length; ++i) {
            cycles += getCyclesFromVertex(G, i, new Array(G.length).fill(0), i, 0, visited2) / 2;
            visited2[i] = 1;
        }
    
        return cycles;
    }
}