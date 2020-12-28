import React, { ReactElement, MouseEvent } from 'react'
import { createUseStyles } from 'react-jss'
import { connectionService } from '../services/Connections';

export interface IdeaProps {
    id: string;
    x: number;
    y: number;
}

const useStyles = createUseStyles({
    iContainer: props => ({
        width: props.size,
        height: props.size,
        borderRadius: props.size / 2,
        position: 'absolute',
        top: props.x,
        left: props.y,
        backgroundColor: 'rgb(255, 0, 0, 0.5)',
        cursor: 'pointer',
        zIndex: 10,

    })
})

function Idea(props: IdeaProps): ReactElement {
    let offsetX: number;
    let offsetY: number;

    const size = 50;

    const classes = useStyles({ ...props, size });

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
    return (
        <div className={classes.iContainer}
            onMouseDown={add}
            onMouseUp={remove}
            onMouseLeave={remove}
        />
    )
}


export default Idea;