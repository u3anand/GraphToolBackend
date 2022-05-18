import { BFSNoRepeat } from './BFS'

class Components {
    constructor(G) {
        let c = this.countComponents(G);
        this.componentCount = c[0];
        this.components = c[1];
    }

    // optimize this later
    countComponents = (G) => {
        let count = 0;
        let components = [];
        let vertices = [];

        for(let i = 0; i < G.list.length; ++i)
            vertices.push(0);

        let empty = vertices.slice(0);

        for(let i = 0; i < vertices.length; ++i) {
            if(vertices[i] === 0) {
                ++ count;
                vertices = BFSNoRepeat(G, i, vertices);
                components.push(BFSNoRepeat(G, i, empty.slice(0)));
            }
        }

        let finalComponents = [];
        for(let component of components) {
            let current = [];
            for(let i = 0; i < component.length; ++i) {
                if(component[i] === 1) {
                    current.push(i);
                }
            }

            finalComponents.push(current);
        }
        
        return [count, components];
    }

    getComponentCount = () => { return this.componentCount; }
    getComponents = () => {return this.components; }
}

export default Components
