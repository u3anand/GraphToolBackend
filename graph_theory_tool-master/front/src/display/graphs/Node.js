import React, {useState, useEffect, useRef} from 'react'

export default function Node(props) {
    const [position, setPosition] = useState(props.position);
    
    const labelX = position[0];
    const labelY = position[1];

    useEffect(() => {
        setPosition(props.position);
    }, [props.position])

    return (
        <g style={{userSelect:"none"}} onMouseDown={e => props.dragStart(e, props.id, true)} onMouseUp={(e) => props.dragEnd(e)}>
            <circle cx={labelX} cy={labelY} r="40" stroke="#2ab863" stroke-width="4" fill="#ccffcf"/>
            <text pointerEvents={"none"} textAnchor="middle" transform={`translate(${labelX}, ${labelY + 5})`} fontSize="20">{props.id}</text>
        </g>
    )
}