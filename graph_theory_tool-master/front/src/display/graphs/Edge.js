import React, {useState, useEffect} from 'react'

function Edge(props) {
    const [node1, setNode1] = useState(props.node1);
    const [node2, setNode2] = useState(props.node2);
    const [bendPos, setBendPos] = useState(props.bendPos);

    let c;
    let d;
    
    if(props.bendPos && node1 && node2) {
        if(props.bendPos.bent === false) {
            c = [(node1.posX + node2.posX)/2, (node1.posY + node2.posY)/2];
            d = "M " + node1.posX + " " + node1.posY + " Q " + c[0] + " " + c[1] + " " + node2.posX + " " + node2.posY;
        } else {
            c = [props.bendPos.posX, props.bendPos.posY];
            d = calcCirclePath([[node2.posX, node2.posY], c, [node1.posX, node1.posY]]);
        }
    }

    useEffect(() => {
        setNode1(props.node1); setNode2(props.node2);
        setBendPos(props.bendPos);
    }, [props.node1, props.node2, props.bendPos])

    const render = () => {
        if(c && d) {
            return (
                <svg>
                    <svg>
                        <circle onMouseDown={(e) => {props.dragStart(e, props.id, false);}} onMouseUp={(e) => props.dragEnd(e)} cx={c[0]} cy={c[1]} r={6}/>
                    </svg>
                    <svg>
                        <path pointer-events="none" d={d} stroke="black" fill="transparent" stroke-width="3" shape-rendering="geometricPrecision"/>
                    </svg>
                </svg>
            )
        }
    }

    return (
        <React.Fragment>
            {render()}
        </React.Fragment>
    )
}

function calcCirclePath(points){
    var a = points[0]
    var b = points[2]
    var c = points[1]
  
    var A = dist(b, c)
    var B = dist(c, a)
    var C = dist(a, b)
  
    var angle = Math.acos((A*A + B*B - C*C)/(2*A*B))
  
    //calc radius of circle
    var K = .5*A*B*Math.sin(angle)
    var r = A*B*C/4/K
    r = Math.round(r*1000)/1000
  
    //large arc flag
    var laf = +(Math.PI/2 > angle)
  
    //sweep flag
    var saf = +((b[0] - a[0])*(c[1] - a[1]) - (b[1] - a[1])*(c[0] - a[0]) < 0) 
  
    return ['M', a, 'A', r, r, 0, laf, saf, b].join(' ')
  }
  
  function dist(a, b){
    return Math.sqrt(
      Math.pow(a[0] - b[0], 2) +
      Math.pow(a[1] - b[1], 2))
  }

export default Edge

// if(props.bendPos.bent === false) {
//     c = [(props.node1.posX + props.node2.posX)/2, (props.node1.posY + props.node2.posY)/2];
//     d = "M " + props.node1.posX + " " + props.node1.posY + " Q " + c[0] + " " + c[1] + " " + props.node2.posX + " " + props.node2.posY;
// } else {
//     c = [props.bendPos.posX, props.bendPos.posY];
//     d = calcCirclePath([[props.node2.posX, props.node2.posY], c, [props.node1.posX, props.node1.posY]]);
// }

// useEffect(() => {
//     if(props.bendPos.bent === false) {
//         c = [(props.node1.posX + props.node2.posX)/2, (props.node1.posY + props.node2.posY)/2];
//         d = "M " + props.node1.posX + " " + props.node1.posY + " Q " + c[0] + " " + c[1] + " " + props.node2.posX + " " + props.node2.posY;
//     } else {
//         c = [props.bendPos.posX, props.bendPos.posY];
//         d = calcCirclePath([[props.node2.posX, props.node2.posY], c, [props.node1.posX, props.node1.posY]]);
//     }
// }, [props.node1, props.node2, props.bendPos])
