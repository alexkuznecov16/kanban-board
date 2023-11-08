import React from 'react';

const BoardHeader = ({ toggleMenu, isMenuOpen, profile__icon, arrow__icon }) => {
    return (
        <div className='Kanban-Board__header'>
            <h5 className='Kanban-Board__header-title'>Awesome Kanban Board</h5>
            <div className='Kanban-Board__header-profile'>
                <div className='Kanban-Board__header-profile--inner'>
                    <img src={profile__icon} alt='Image' onClick={toggleMenu} />
                    {isMenuOpen ? <img src={arrow__icon} alt='Arrow' style={{ transform: 'rotate(180deg)' }} /> : <img src={arrow__icon} alt='Arrow' />}
                </div>
                {isMenuOpen && (
                    <div className='Kanban-Board__header-profile--dropdown'>
                        <div className='Kanban-Board__header-profile--dropdown-block'>
                            <p>Profile</p>
                            <p>Log out</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardHeader;
