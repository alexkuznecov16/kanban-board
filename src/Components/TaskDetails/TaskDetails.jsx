import React from 'react';

const TaskDetails = ({ taskTitle, taskInfo, setTaskTitle, setTaskInfo, closeTask }) => {
    return (
        <div
            className='Kanban-Board__main--full-task'
            style={{
                width: '96%',
                height: '92%',
                position: 'fixed',
                zIndex: '1000',
                padding: '12px',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                background: '#fff',
            }}
        >
            {/* Title Input */}
            <input
                id='inputTitle'
                style={{
                    marginBottom: '20px',
                    width: '80%',
                    fontSize: '18px',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                }}
                type='text'
                placeholder='Task title'
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
            />
            {/* Description Input */}
            <textarea
                id='inputInfo'
                style={{
                    flex: '1',
                    width: '100%',
                    fontSize: '16px',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    resize: 'none',
                    overflowY: 'auto',
                }}
                placeholder='Task info'
                value={taskInfo}
                onChange={(e) => setTaskInfo(e.target.value)}
            />
            {/* Close Button */}
            <span
                style={{
                    position: 'absolute',
                    right: '10px',
                    top: '10px',
                    color: '#fff',
                    fontSize: '30px',
                    background: 'red',
                    padding: '7px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                }}
                onClick={() => closeTask(taskTitle, taskInfo)}
            >
                X
            </span>
        </div>
    );
};

export default TaskDetails;
