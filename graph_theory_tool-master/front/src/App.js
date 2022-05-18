import logo from './logo.svg';
import './App.css';
import React from 'react'
import Graph from './logic/graph/Graph'
import GraphVisual from './display/graphs/GraphVisual'
import { useEffect, useState } from 'react'
import { BFSCycle, BFSNoRepeat, BFSRepeat } from './logic/algorithms/BFS'
import Components from './logic/algorithms/Components'
import 'antd/dist/antd.css';
import Routes from './routing/Routes'
import { Helmet } from 'react-helmet'

function App() {
  useEffect(() => {
    
  })
  return (
    <React.Fragment>
      <Helmet>
          <title>Graph Theory Tool</title>
        </Helmet>
      <Routes/>
    </React.Fragment>
  );
}

export default App;

/*     let adj = [[0,1,0,1], [1,0,1,1], [0,1,0,1], [1,1,1,0]];
    let graph = new Graph(adj);
    let vertices = BFSCycle(graph, 0);

    let k = new Components(graph);
    console.log(k.getComponents());
    console.log(k.getComponentCount()); */
    