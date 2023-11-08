import React from 'react';

const ButtonSubmit = ({ setNewTask, taskColumn }) => {
    return (
        <button className='active' onClick={() => setNewTask(taskColumn)}>
            Submit
        </button>
    );
};

export default ButtonSubmit;
