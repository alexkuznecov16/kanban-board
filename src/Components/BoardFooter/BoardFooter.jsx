import React from 'react';

const BoardFooter = ({ appData }) => {
    const year = new Date().getFullYear()
    return (
        <div className='Kanban-Board__footer'>
            <div className='Kanban-Board__footer-details'>
                <span>Active tasks: {appData[0].length}</span>
                <span>Finished tasks: {appData[3].length}</span>
            </div>
            <div className='Kanban-Board__footer-author'>
                <span>Kanban board by Alexander, {year}</span>
            </div>
        </div>
    );
};

export default BoardFooter;
