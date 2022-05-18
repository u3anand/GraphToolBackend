import React, {useState, useEffect, useRef} from 'react';
import Node from './Node';
import Edge from './Edge';

export default function GraphVisual(props) {
    const [mouseIn, setMouseIn] = useState(false);
    const [dragId, setDragId] = useState();
    const [isDraggingNode, setIsDraggingNode] = useState(false);
    const [isDraggingEdge, setIsDraggingEdge] = useState(false);

    const [originX, setOriginX] = useState(0);
    const [originY, setOriginY] = useState(0);
    const [prevPosition, setPrevPosition] = useState([]);

    const dragStart = (e, id, node) => {
        if(mouseIn === true) {
            if(props.deletingVertex && e.type == 'mousedown') {
                props.deleteVertex(id);
                return;
            }
            setDragId(id);
            setOriginX(e.clientX);
            setOriginY(e.clientY);

            if(node) {
                setIsDraggingNode(true);
                setPrevPosition([props.vertices[id].posX, props.vertices[id].posY]);
            } else {
                setIsDraggingEdge(true);
                if(props.bendPositions.get(id).bent === true) {
                    setPrevPosition([props.bendPositions.get(id).posX, props.bendPositions.get(id).posY]);
                } else {  
                    let node1 = props.vertices[props.edges.get(id).node1];
                    let node2 = props.vertices[props.edges.get(id).node2];
                    setPrevPosition([(node1.posX + node2.posX) / 2, (node1.posY + node2.posY) / 2]);
                }
            }
        }
    }

    const dragging = (e) => {
        if(isDraggingNode && mouseIn) {
            let newX = e.clientX - originX;
            let newY =  e.clientY - originY;
            updateData({
                "id": dragId, 
                "posX": prevPosition[0] + newX, 
                "posY": prevPosition[1] + newY
            });
        } else if(isDraggingEdge && mouseIn) {
            let newX = e.clientX - originX;
            let newY =  e.clientY - originY;
            updateBendPositions({
                "id": dragId, 
                "posX": prevPosition[0] + newX, 
                "posY": prevPosition[1] + newY,
                "bent": true
            });
        }
    }

    const dragEnd = () => {
        setIsDraggingNode(false);
        setIsDraggingEdge(false);
    }

    const updateData = (a) => {
        let newVertices = props.vertices.slice(0);
        newVertices[a.id] = a;
        props.setVertices(newVertices);
    }

    const updateBendPositions = (a) => {
        let newBendPositions = new Map(props.bendPositions.set(a.id, a));
        props.setBendPositions(newBendPositions);
    }

    const updateVertices = (a) => {
        return props.vertices.map(node => {
            return (<Node dragStart={dragStart} dragEnd={dragEnd} id={node.id} position={[node.posX, node.posY]}/>);
        })
    }

    const updateEdges = (a) => {
        let e = [];
        props.edges.forEach((edge) => {
            e.push(<Edge dragStart={dragStart} dragEnd={dragEnd} id={edge.id} node1={props.vertices[edge.node1]} 
                    node2={props.vertices[edge.node2]} bendPos={props.bendPositions.get(edge.id)}/>)
        })
        return e;
    }

    useEffect(() => {}, [props.vertices, props.bendPositions, props.bendPositions, props.edges, props.vertices])

    return (
        <svg style={{height:"600vh", width:"600vw", backgroundColor: '#dbedff'}} 
            onMouseOver={() => {setMouseIn(true)}} onMouseLeave={(e) => {dragging(e); setMouseIn(false); dragEnd()}}
            onMouseMove={(e) => {dragging(e)}} onMouseUp={() => dragEnd()}>
            {updateEdges()}
            {updateVertices()}
        </svg>
    )
}

