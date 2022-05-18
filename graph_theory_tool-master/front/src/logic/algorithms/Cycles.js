
class Cycles {
    constructor(G) {
        let c = this.cycles();
        this.cycles = c;
        this.minCycle = this.minC();
        this.maxCycle = this.maxC();
    }

    cycles = () => {

    }

    maxC = () => {

    }

    minC = () => {
        
    }

    getCycles = () => { return this.cycles; }

    getMaxCycle = () => { return this.maxCycle; }

    getMinCycle = () => { return this.minCycle }
}

export default Cycles
