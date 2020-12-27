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
    });

    useEffect(() => {
        draw();
    })

    function draw() {
        const canvas: HTMLCanvasElement = canvasRef.current!;
        if (canvas) {
            const ctx = canvas.getContext('2d')!;
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            ctx.moveTo(50, 50);
            ctx.lineTo(150, 150);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgb(255, 0, 0)';
            ctx.stroke();
        }
    }


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