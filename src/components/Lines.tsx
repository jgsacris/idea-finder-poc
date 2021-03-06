import React, { ReactElement, useRef, useState, useEffect } from 'react'
import styled from 'styled-components';
import { connectionService, Point } from '../services/Connections';

function Lines(): ReactElement {
    const canvasRef = useRef(null);
    const connection = useRef(connectionService);

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
        const subscription = connection.current.$IdeaLocation.subscribe((point: Point) => {
            draw(point);
        })
        return () => subscription.unsubscribe();
    });



    function draw(point: Point) {
        const canvas: HTMLCanvasElement = canvasRef.current!;
        if (canvas) {
            const start = { x: 50, y: 50 };
            const bz = 50;
            const ctx = canvas.getContext('2d')!;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgb(255, 0, 0)';
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.bezierCurveTo(start.x + bz, start.y, point.x - bz, point.y, point.x, point.y);
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