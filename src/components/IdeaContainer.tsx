import React, { MouseEvent, ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss'
import { v4 as uuidv4 } from 'uuid';

import Idea, { IdeaProps } from './Idea';

const useStyles = createUseStyles({
    mainIdeaContainer: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    ideaContainer: {
        position: 'fixed',
        top: 0,
        left: 0
    },
    addIdeaBtn: {
        position: 'absolute',
        top: 10,
        right: 10
    }
});

function IdeaContainer(): ReactElement {

    const [ideas, setIdeas] = useState<IdeaProps[]>([]);
    const classes = useStyles();
    const addIdea = (e: MouseEvent) => {
        const newIdea = {
            id: uuidv4(),
            x: Math.floor(Math.random() * 600),
            y: Math.floor(Math.random() * 600)
        };
        console.log('add Idea', newIdea);
        setIdeas([
            ...ideas,
            newIdea
        ]);

    }

    return (
        <div className={classes.mainIdeaContainer}>
            <button className={classes.addIdeaBtn} onClick={addIdea}>ADD</button>
            <div className={classes.ideaContainer}>
                {ideas.map(idea => (
                    <Idea x={idea.x} y={idea.y} id={idea.id} key={idea.id} />
                ))

                }
            </div>
        </div>
    )
}

export default IdeaContainer;