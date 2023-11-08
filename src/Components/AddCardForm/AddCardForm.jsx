import React from 'react';

const AddCardForm = ({ newTaskTitle, setNewTaskTitle, setNewTask, taskId }) => {
    return (
        <div>
            <input id={`task-${taskId}`} type='text' placeholder='Task title...' value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
            <button onClick={() => setNewTask(0)}>Submit</button>
        </div>
    );
};

export default AddCardForm;
