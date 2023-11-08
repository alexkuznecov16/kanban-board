import React from 'react';

const TaskCard = ({ task, openTask, index }) => {
    return (
        <p className='copyright' onClick={() => openTask(task, index)} key={index} id={`task-${task.id}`}>
            {task.title}
        </p>
    );
};

export default TaskCard;
