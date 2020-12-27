import React, { ReactElement, useRef, useState, useEffect } from 'react'
import styled from 'styled-components';

function Lines(): ReactElement {
    const canvasRef = useRef(null);
    const margin = 32;
    const [width, setWidth] = useState<number>(window.innerWidth - margin);
    const [height, setHeight] = useState<number>(window.innerHeight - margin);

    const updateSize = () => {
        setWidth(window.innerWidth - margin);
        setHeight(window.innerHeight - margin);
    }

    useEffect(() => {
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize)
    })

    const Wrapper = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    `;

    return (
        <Wrapper>
            <canvas ref={canvasRef} width={width} height={height} />
        </Wrapper>
    )
}

export default Lines;