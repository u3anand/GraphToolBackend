import React, { useState } from 'react'
import { useEffect } from 'react';
import { Table } from 'antd';
import * as math from 'mathjs'

class Algorithms {
    maxCycle = 0;
    minCycle = Number.MAX_VALUE;

    // edges = [
    //     [1,2,3,4],
    //     [0,2,3,4],
    //     [0,1,3,4],
    //     [0,1,2,4],
    //     [0,1,2,3],
    //     [6,7,8,9],
    //     [5,7,8,9],
    //     [5,6,8,9],
    //     [5,6,7,9],
    //     [5,6,7,8],
    //     [11,12],
    //     [10,12],
    //     [10,11],
    // ]
    
    // edges2 = [
    //     [1,2,3],
    //     [0,2,3],
    //     [0,1,3],
    //     [0,1,2]
    // ]
    
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
                mx = Math.max(mx, 1 + this.longestPathFromVertex(G, v, visited));
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
                this.BFS(G, i, visited);
            }
        }
    
        return count;
    }
    
    getLongestPath(G) {
        let mx = 0;
        for(let k = 0; k < G.length; ++k) {
            mx = Math.max(this.longestPathFromVertex(G, k, new Array(G.length).fill(0)), mx);
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
                    if(idx > this.maxCycle) {
                        this.maxCycle = idx;
                    }
                    if(idx < this.minCycle) {
                        this.minCycle = idx;
                    }
                } else if(visited[v] == 0) {
                    cycles += this.getCyclesFromVertex(G, v, visited, origin, idx+1, visited2);
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

    determinant = m => 
        m.length == 1 ?
        m[0][0] :
        m.length == 2 ? 
        m[0][0]*m[1][1]-m[0][1]*m[1][0] :
        m[0].reduce((r,e,i) => 
            r+(-1)**(i+2)*e*this.determinant(m.slice(1).map(c => 
            c.filter((_,j) => i != j))),0)
    
    getSpanningTrees(G) {
        if(this.getComponents(G) != 1) {
            return 0;
        }
    
        let adjMatrix = this.generateAdjMatrix(G);
        let D = new Array(G.length);
        for(let i = 0; i < G.length; ++i) {
            D[i] = new Array(G.length).fill(0);
        } 
        for(let i = 0; i < G.length; ++i) {
            D[i][i] = G[i].length;
        }

        let laplacian = math.subtract(D, adjMatrix);
        laplacian.pop();

        for(let i = 0; i < G.length-1; ++i) {
            laplacian[i].pop();
        }

        return this.determinant(laplacian);
    }
    
    countCycles(G) {
        let visited2 = new Array(G.length).fill(0);
        let cycles = 0;
        for(let i = 0; i < G.length; ++i) {
            cycles += this.getCyclesFromVertex(G, i, new Array(G.length).fill(0), i, 0, visited2) / 2;
            visited2[i] = 1;
        }
    
        return cycles;
    }

    getProperties(G) {
        let spanningTrees = this.getSpanningTrees(G);
        let cycles = this.countCycles(G);
        let minCyc = this.minCycle;
        let maxCyc = this.maxCycle;
        let longestPath = this.getLongestPath(G);
        let components = this.getComponents(G);
    
        let properties = [
            {
                key: '1',
                property:'Longest Path',
                value: longestPath
            },
            {
                key: '2',
                property: 'Number of Components',
                value: components
            },
            {
                key: '3',
                property: 'Spanning Trees',
                value: spanningTrees
            },
            {
                key: '4',
                property:'Number of Cycles',
                value: cycles
            },
            {
                key: '5',
                property:'Shortest Cycle',
                value: minCyc == Number.MAX_VALUE ? "Null" : minCyc
            },
            {
                key: '6',
                property:'Longest Cycle',
                value: maxCyc == 0 ? "Null" : maxCyc
            }
        ]
    
        return properties;
    }
}

export default function Properties(props) {
    const [vertices, setVertices] = useState(0);
    const [adjList, setAdjList] = useState();
    const [adjMatrix, setAdjMatrix] = useState();
    const [dataSource, setDataSource] = useState();
    const algoService = new Algorithms();
    
    let columns = [
        {
            title: 'Property',
            dataIndex: 'property',
            key: 'name',
            width: 250
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'val',
            width: 120
        },
    ];

    const makeAdjList = (v, edges) => {
        let aList = new Array(v);
        for(let i = 0; i < v; ++i) {
            aList[i] = new Array();
        }

        edges.forEach((value, key) => {
            aList[value.node1].push(value.node2);
            aList[value.node2].push(value.node1);
        })

        setAdjList(aList);
        return(aList);
    }

    useEffect(() => {
        let edges = makeAdjList(props.vertices.length, props.edges);
        setDataSource(algoService.getProperties(edges));
    }, [props.vertices, props.edges])

    return (
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 3 }}/>
    )
}
