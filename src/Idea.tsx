import React, { ReactElement, MouseEvent } from 'react'
import styled from 'styled-components';

interface IdeaProps {
    x: number;
    y: number;
}

function Idea(props: IdeaProps): ReactElement {
    let offsetX: number;
    let offsetY: number;

    const move = (e: globalThis.MouseEvent): any => {
        const el = e.target as HTMLDivElement;
        el.style.left = `${e.pageX - offsetX}px`;
        el.style.top = `${e.pageY - offsetY}px`;
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
        width: 50px;
        height: 50px;
        border-radius: 29px;
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