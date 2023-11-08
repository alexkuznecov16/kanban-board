import React from 'react';

const TaskDetails = ({ taskTitle, taskInfo, setTaskTitle, setTaskInfo, closeTask }) => {
    return (
        <div className='Kanban-Board__main--full-task' style={{ width: '96%', height: '92%', position: 'fixed', zIndex: '1000', padding: '12px', borderRadius: '5px' }}>
            <input id='inputTitle' style={{ marginBottom: '40px', width: '80%' }} type='text' placeholder='Task title' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
            <input id='inputInfo' style={{ background: 'transparent', color: '#000' }} type='text' placeholder='Task info' value={taskInfo} onChange={(e) => setTaskInfo(e.target.value)} />
            <span style={{ position: 'absolute', right: '10px', top: '10px', color: '#fff', fontSize: '30px', background: 'red', padding: '7px', borderRadius: '20px', cursor: 'pointer' }} onClick={() => closeTask(taskTitle, taskInfo)}>
                X
            </span>
        </div>
    );
};

export default TaskDetails;
