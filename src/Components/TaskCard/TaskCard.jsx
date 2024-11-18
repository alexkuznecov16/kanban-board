import React from 'react';

const TaskCard = ({ task, openTask, index, deleteTask }) => {
    return (
        <p className='copyright' onClick={() => openTask(task, index)} key={index} id={`task-${task.id}`}>
            {task.title}
            <span onClick={(e) => {
                e.stopPropagation();
                deleteTask();
            }}>X</span>
        </p>
    );
};


export default TaskCard;
