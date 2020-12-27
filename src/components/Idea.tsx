import React, { ReactElement, MouseEvent, useRef } from 'react'
import styled from 'styled-components';
import { connectionService } from '../services/Connections';

interface IdeaProps {
    x: number;
    y: number;
}

function Idea(props: IdeaProps): ReactElement {
    let offsetX: number;
    let offsetY: number;

    const size = 50;


    const move = (e: globalThis.MouseEvent): any => {
        const el = e.target as HTMLDivElement;
        el.style.left = `${e.pageX - offsetX}px`;
        el.style.top = `${e.pageY - offsetY}px`;
        connectionService.IdeaLocation = {
            x: e.pageX - offsetX + (size / 2),
            y: e.pageY - offsetY + (size / 2)
        }
    }

    const add = (event: MouseEvent<HTMLDivElement>) => {
        const el = event.target as HTMLDivElement;
        offsetX = event.clientX - el.getBoundingClientRect().left;
        offsetY = event.clientY - el.getBoundingClientRect().top;
        el.addEventListener('mousemove', move);
    }

    const remove = (e: MouseEvent<HTMLDivElement>) => {
        const el = e.target as HTMLDivElement;
        el.removeEventListener('mousemove', move);
    }

    const Wrapper = styled.div`
        width: ${size}px;
        height: ${size}px;
        border-radius: ${size / 2}px;
        position: absolute;
        top: ${props.x}px;
        left: ${props.y}px;
        background-color: rgb(255,0,0,0.5);
        cursor:pointer;
        z-index:10;
        `
    return (
        <Wrapper onMouseDown={add} onMouseUp={remove} />
    )
}


export default Idea;