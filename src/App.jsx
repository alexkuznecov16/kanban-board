import { FC, useState, useEffect } from 'react';
import './App.css';

import arrow__icon from './Assets/arrow-top.png';
import profile__icon from './Assets/profile.png';

const loadDataFromLocalStorage = () => {
    const savedData = localStorage.getItem('kanbanData');
    if (savedData) {
        return JSON.parse(savedData);
    }
    return [
        [], // Backlog
        [], // Ready
        [], // In Progress
        [], // Finished
    ];
};

const App = () => {
    const [appData, setAppData] = useState(() => loadDataFromLocalStorage());

    const [isAddingCard, setIsAddingCard] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBtnActive, setisBtnActive] = useState({
        Backlog: false,
        Ready: false,
        InProgress: false,
        Finished: false,
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const activeInput = (group) => {
        setisBtnActive({ ...isBtnActive, [group]: true });
    };

    const [taskId, setTaskId] = useState(0);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const setNewTask = (taskColumn) => {
        if (taskColumn === 0) {
        if (newTaskTitle === '') {
            alert('Название задачи должно иметь хотя бы 1 символ.');
        } else {
            const newTask = {
                title: newTaskTitle,
                info: '', // Выставляйте пустую строку при создании новой задачи
                id: taskId, // Генерация уникального ID
            };

            const updatedAppData = [...appData];
            updatedAppData[taskColumn].push(newTask);

            setNewTaskTitle('');
            setIsAddingCard(false);

            setAppData(updatedAppData);
            setTaskId(taskId + 1);
            console.log(appData);
        }
    } else if (taskColumn === 1) {
        const selectedValue = document.getElementById('select-Ready').value;
        if (selectedValue) {
            const existingTask = appData[0].find((task) => task.title === selectedValue);

            if (existingTask) {
                const newTask = {
                    title: selectedValue,
                    info: existingTask.info, // Используйте info существующей задачи
                    id: taskId, // Генерация уникального ID
                };

                const updatedAppData = [...appData];
                updatedAppData[taskColumn].push(newTask);

                // Удалите задачу из Backlog
                updatedAppData[0] = updatedAppData[0].filter((task) => task.title !== selectedValue);

                setNewTaskTitle('');
                setIsAddingCard(false);

                setAppData(updatedAppData);
                setTaskId(taskId + 1);
                console.log(appData);
            } else {
                alert('Выберите задачу из выпадающего списка.');
            }
    }
        } else if (taskColumn === 2) {
                    // Код для In Progress
        const selectedValue = document.getElementById('select-InProgress').value;
        if (selectedValue) {
            const existingTask = appData[1].find((task) => task.title === selectedValue);

            if (existingTask) {
                const newTask = {
                    title: selectedValue,
                    info: existingTask.info, // Используйте info существующей задачи
                    id: taskId, // Генерация уникального ID
                };

                const updatedAppData = [...appData];
                updatedAppData[taskColumn].push(newTask);

                // Удалите задачу из Ready
                updatedAppData[1] = updatedAppData[1].filter((task) => task.title !== selectedValue);

                setNewTaskTitle('');
                setIsAddingCard(false);

                setAppData(updatedAppData);
                setTaskId(taskId + 1);
                console.log(appData);
            } else {
                alert('Выберите задачу из выпадающего списка.');
            }
        }
        } else if (taskColumn === 3) {
            // Код для Finished
        const selectedValue = document.getElementById('select-Finished').value;
        if (selectedValue) {
            const existingTask = appData[2].find((task) => task.title === selectedValue);

            if (existingTask) {
                const newTask = {
                    title: selectedValue,
                    info: existingTask.info, // Используйте info существующей задачи
                    id: taskId, // Генерация уникального ID
                };

                const updatedAppData = [...appData];
                updatedAppData[taskColumn].push(newTask);

                // Удалите задачу из In Progress
                updatedAppData[2] = updatedAppData[2].filter((task) => task.title !== selectedValue);

                setNewTaskTitle('');
                setIsAddingCard(false);

                setAppData(updatedAppData);
                setTaskId(taskId + 1);
                console.log(appData);
            } else {
                alert('Выберите задачу из выпадающего списка.');
            }
        }
        }
        setisBtnActive(false);
        setIsSelectVisible(false);
    };

    const [isSelectVisible, setIsSelectVisible] = useState({
        Backlog: false,
        Ready: false,
        InProgress: false,
        Finished: false,
    });

    const addFunc = (group) => {
        setIsSelectVisible({ ...isSelectVisible, [group]: true });
        console.log(group, isSelectVisible);
        setisBtnActive({ ...isBtnActive, [group]: true });
    };

    const [taskIsOpen, setTaskIsOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskInfo, setTaskInfo] = useState('');
    const [openTaskId, setOpenTaskId] = useState(null);

    const openTask = (task) => {
        setOpenTaskId(task.id);
        setTaskIsOpen(true);
        setTaskTitle(task.title);
        setTaskInfo(task.info);
    };

    const updateTaskInfoAndTitle = (taskId, newInfo, newTitle) => {
        const updatedAppData = [...appData];
        for (let column = 0; column < updatedAppData.length; column++) {
            for (let i = 0; i < updatedAppData[column].length; i++) {
                if (updatedAppData[column][i].id === taskId) {
                    updatedAppData[column][i].info = newInfo;
                    updatedAppData[column][i].title = newTitle;
                    break; // Мы нашли задачу и обновили ее, можно выйти из цикла.
                }
            }
        }
        setAppData(updatedAppData);
    };
    
    // ...
    
    const closeTask = (taskTitle, taskInfo) => {
        if (openTaskId !== null) {
            updateTaskInfoAndTitle(openTaskId, taskInfo, taskTitle);
            setOpenTaskId(null); // Сбрасываем openTaskId после закрытия задачи
        }
        setTaskIsOpen(false);
    };

    const saveDataToLocalStorage = (data) => {
        localStorage.setItem('kanbanData', JSON.stringify(data));
    };

    useEffect(() => {
        // Сохраняем данные в localStorage при обновлении
        saveDataToLocalStorage(appData);
    }, [appData]);

    return (
        <>
            <div className='Kanban-Board'>
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
                <div className='Kanban-Board__main'>
                    {taskIsOpen ? (
                        <div className='Kanban-Board__main--full-task' style={{ width: '96%', height: '92%', position: 'absolute', zIndex: '1000', padding: '12px', borderRadius: '5px' }}>
                            <input id='inputTitle' style={{ marginBottom: '40px' }} type='text' placeholder='Task title' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                            <input id='inputInfo' style={{ background: 'transparent', color: '#000' }} type='text' placeholder='Task info' value={taskInfo} onChange={(e) => setTaskInfo(e.target.value)} />
                            <span onClick={() => closeTask(document.getElementById('inputTitle').value, document.getElementById('inputInfo').value)}>X</span>
                        </div>
                    ) : (
                        null
                    )}
                    <div className='Kanban-Board__main-Backlog'>
                        <span>Backlog</span>
                        {appData[0].map((task, index) => (
                            <p onClick={() => openTask(task, index)} key={index} id={`task-${task.id}`}>
                                {task.title}
                            </p>
                        ))}
                        {isAddingCard ? <input id={`task-${taskId}`} type='text' placeholder='Task title...' value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} /> : null}
                        {isAddingCard ? (
                            <button className='active' onClick={() => setNewTask(0)}>
                                Submit
                            </button>
                        ) : (
                            <button onClick={() => setIsAddingCard(true)}>+ Add card</button>
                        )}
                    </div>
                    <div className='Kanban-Board__main-Ready'>
                        <span>Ready</span>
                        {appData[1].map((task, index) => (
                            <p onClick={() => openTask(task, index)} key={index} id={`task-${task.id}`}>
                                {task.title}
                            </p>
                        ))}
                        {isSelectVisible.Ready ? (
                            <p>
                                <select id='select-Ready'>
                                    {appData[0].map((task, index) => (
                                        <option key={index} value={task.title}>
                                            {task.title}
                                        </option>
                                    ))}
                                </select>
                            </p>
                        ) : null}
                        {isBtnActive.Ready ? (
                            <button className='active' onClick={() => setNewTask(1)}>
                                Submit
                            </button>
                        ) : (
                            <button onClick={() => addFunc('Ready')}>+ Add card</button>
                        )}
                    </div>

                    <div className='Kanban-Board__main-InProgress'>
                        <span>In Progress</span>
                        {appData[2].map((task, index) => (
                            <p onClick={() => openTask(task, index)} key={index} id={`task-${task.id}`}>
                                {task.title}
                            </p>
                        ))}
                        {isSelectVisible.InProgress ? (
                            <p>
                                <select id='select-InProgress'>
                                    {appData[1].map((task, index) => (
                                        <option key={index} value={task.title}>
                                            {task.title}
                                        </option>
                                    ))}
                                </select>
                            </p>
                        ) : null}
                        {isBtnActive.InProgress ? (
                            <button className='active' onClick={() => setNewTask(2)}>
                                Submit
                            </button>
                        ) : (
                            <button onClick={() => addFunc('InProgress')}>+ Add card</button>
                        )}
                    </div>
                    <div className='Kanban-Board__main-Finished'>
                        <span>Finished</span>
                        {appData[3].map((task, index) => (
                            <p onClick={() => openTask(task, index)} key={index} id={`task-${task.id}`}>
                                {task.title}
                            </p>
                        ))}
                        {isSelectVisible.Finished ? (
                            <p>
                                <select id='select-Finished'>
                                    {appData[2].map((task, index) => (
                                        <option key={index} value={task.title}>
                                            {task.title}
                                        </option>
                                    ))}
                                </select>
                            </p>
                        ) : null}
                        {isBtnActive.Finished ? (
                            <button className='active' onClick={() => setNewTask(3)}>
                                Submit
                            </button>
                        ) : (
                            <button onClick={() => addFunc('Finished')}>+ Add card</button>
                        )}
                    </div>
                </div>
                <div className='Kanban-Board__footer'>
                    <div className='Kanban-Board__footer-details'>
                        <span>Active tasks: {appData[0].length}</span>
                        <span>Finished tasks: {appData[3].length}</span>
                    </div>
                    <div className='Kanban-Board__footer-author'>
                        <span>Kanban board by Alexander, 2023</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
