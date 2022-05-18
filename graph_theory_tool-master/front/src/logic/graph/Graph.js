import Cycles from '../algorithms/Cycles'
import Hamiltonian from '../algorithms/Hamiltonian'
import Planarity from '../algorithms/Planarity'
import SpanTrees from '../algorithms/SpanTrees'
import Components from '../algorithms/Components'


class Graph {
    constructor(adjMatrix) {
        this.list = this.makeAdjacenyList(adjMatrix);
        this.matrix = adjMatrix;
    }

    makeAdjacenyList = (m) => {
        let list = [];
        for(let v = 0; v < m.length; ++v) {
            let current = [];
            for(let i = 0; i < m.length; ++i) {
                if(m[v][i] == 1) {
                    current.push(i);
                }
            }

            list.push(current);
        }

        return list;
    }

    getCompleteSubgraph(vertices) {
        
    }

    getSubgraph(vertices, adjacencyList) {

    }

    getRequirement = (requirement) => {
        if(requirement == "components") {
            this.getComponents();
        }
    }

    // returns the number of components in G;
    getComponents = () => {
        const components = Components(this);
        this.compenents = components.getComponents();
    }

    // returns all hamiltonian cycles in G;
    getHamiltonianCycles = () => {
        const hamiltonian = Hamiltonian(this);
        this.hamiltonianCycleCount = hamiltonian.getHamiltonianCycleCount();
        this.hamiltonianCycles = hamiltonian.getHamiltonianCycles();
    }
    

}

export default Graph;






/* // returns an array of graphs (which are subgraphs of G which happen to be spanning trees/forests)
    spanTrees = () => {
        const trees = SpanTrees.getTrees(this);
        return trees;
    }

    // returns the number of spanning trees
    numberOfSpanTrees = () => {
        const treeCount = SpanTrees.getTreeCount(this);
        return treeCount;
    }

    // returns a boolean as to whether or not this graph is planar
    planarity = () => {
        let b = Planarity.getPlanarity(this);
        return b;
    }

    // returns a K_(3,3) or K_5 subdivision
    nonPlanar = () => {
        let b = Planarity.getSubdivision(this);
        return b;
    }

    // returns smallest + largest cycle in G (array of Graphs);
    cycles = () => {
        const cycleArray = Cycles.getCycles(this);
        return cycleArray;
    }
*/