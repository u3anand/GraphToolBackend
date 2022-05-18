export default class InputGraph {
    constructor(vertices, edges) {
        this.vertices = [];
        for(let i = 0; i < vertices; ++i) {
            this.vertices.push({"id": i, "posX": 500, "posY": 500});
        }

        this.edges = new Map;
        this.bendPositions = new Map;
        this.valid = true;
        this.errors = [];
        for(let i = 0; i < edges.length; ++i) {
            this.errors.push("none");
            for(let neighbor of edges[i]) {
                if(!this.addEdge(i, neighbor)) {
                    this.valid = false;
                    this.errors[i] = ("error");
                    break;
                } else if (neighbor === "") {
                    this.errors[i] = ("error");
                }
            }
        }
    }

    addEdge = (v1, v2) => {
        if(!(/^\d+$/.test(v1)) || !(/^\d+$/.test(v2))) {
            return false;
        }

        v1 = Number(v1);
        v2 = Number(v2);
        if(!(Number.isInteger(v1)) || v1 > this.vertices.length - 1) {
            return false;
        }
        if(!(Number.isInteger(v2)) || v2 > this.vertices.length - 1) {
            return false;
        }

        if(v1 == v2) {
            return false;
        }
        
        let key;
        if(v2 > v1) {
            let temp = v1;
            v1 = v2;
            v2 = temp;
        }

        key = v1 + "." + v2;
        
        this.edges.set(key, {
            "id": key,
            "node1": v1,
            "node2": v2,
            "bent": false,
            "posX": null,
            "posY": null
        });


        this.bendPositions.set(key, {
            "id": key,
            "bent": false,
            "posX": null,
            "posY": null
        });

        return true;
    }

}