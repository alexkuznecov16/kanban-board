import React, { FC, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

import './App.css';

// COMPONENTS and images
import arrow__icon from './Assets/arrow-top.png';
import profile__icon from './Assets/profile.png';
import BoardHeader from './Components/BoardHeader/BoardHeader';
import TaskDetails from './Components/TaskDetails/TaskDetails';
import TaskCard from './Components/TaskCard/TaskCard';
import SelectCardForm from './Components/SelectCardForm/SelectCardForm';
import BoardFooter from './Components/BoardFooter/BoardFooter';
import ButtonSubmit from './Components/ButtonSubmit/ButtonSubmit';
///////////////////////////////////////////////////////////////////

// FUNCTION FOR DATA SAVING
const loadDataFromLocalStorage = () => {
    const savedData = localStorage.getItem('kanbanData'); // get saved data
    if (savedData) {
        return JSON.parse(savedData); // convert saved data
    }
    return [
        [], // Backlog
        [], // Ready
        [], // In Progress
        [], // Finished
    ];
};

///////////////////////////////////////////////////////////////////
// MAIN FUNCTION
const App = () => {
    ///////////////////////////////////////////////////////////////////
    // all variables
    const [appData, setAppData] = useState(() => loadDataFromLocalStorage());
    const [isAddingCard, setIsAddingCard] = useState(false); // onClick to +add card
    const [isMenuOpen, setIsMenuOpen] = useState(false); // onClick to open profile menu
    const [taskIsOpen, setTaskIsOpen] = useState(false); // onClick to open task details
    const [taskTitle, setTaskTitle] = useState(''); // onClick to set title for task
    const [taskInfo, setTaskInfo] = useState(''); // onClick to set info for task
    const [openTaskId, setOpenTaskId] = useState(null); // onClick to set ID for opened task
    const [taskId, setTaskId] = useState(0); // onClick to set ID for task
    const [newTaskTitle, setNewTaskTitle] = useState(''); // onClick to set new title for task
    // onClick to check what block is active for task adding
    const [isBtnActive, setisBtnActive] = useState({
        Backlog: false,
        Ready: false,
        InProgress: false,
        Finished: false,
    });
    // onClick to check what block is active for task details opening
    const [isSelectVisible, setIsSelectVisible] = useState({
        Backlog: false,
        Ready: false,
        InProgress: false,
        Finished: false,
    });
    ///////////////////////////////////////////////////////////////////

    // Open + Close header profile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    ///////////////////////////////////////////////////////////////////

    // function will add new tasks in selected blocks
    const setNewTask = (taskColumn) => {
        if (taskColumn === 0) {
            // Code for backlog
            if (newTaskTitle === '') {
                alert('Task title cannot to be smaller then 1 symbol!');
            } else {
                const newTask = {
                    title: newTaskTitle,
                    info: '',
                    id: taskId,
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
            // code for ready
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
            // Code for In progress
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
            // Code for finished
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
    ///////////////////////////////////////////////////////////////////

    // function check button and select group(block)
    const addFunc = (group) => {
        setIsSelectVisible({ ...isSelectVisible, [group]: true }); // find choose select group and set true
        setisBtnActive({ ...isBtnActive, [group]: true }); // find selected button group and set true
    };
    ///////////////////////////////////////////////////////////////////

    // function for task details opening
    const openTask = (task) => {
        setOpenTaskId(task.id);
        setTaskIsOpen(true);
        setTaskTitle(task.title);
        setTaskInfo(task.info);
    };
    ///////////////////////////////////////////////////////////////////

    // On task details closing all data will be saving
    const updateTaskInfoAndTitle = (taskId, newInfo, newTitle) => {
        const updatedAppData = [...appData];
        for (let column = 0; column < updatedAppData.length; column++) {
            for (let i = 0; i < updatedAppData[column].length; i++) {
                if (updatedAppData[column][i].id === taskId) {
                    updatedAppData[column][i].info = newInfo;
                    updatedAppData[column][i].title = newTitle;
                    break;
                }
            }
        }
        setAppData(updatedAppData); // Update data
    };
    ///////////////////////////////////////////////////////////////////

    // function for task details closing
    const closeTask = (taskTitle, taskInfo) => {
        if (openTaskId !== null) {
            updateTaskInfoAndTitle(openTaskId, taskInfo, taskTitle);
            setOpenTaskId(null); // Reset task ID after task details close
        }
        setTaskIsOpen(false); // Close task details
    };
    ///////////////////////////////////////////////////////////////////

    // function save app data tasks
    const saveDataToLocalStorage = (data) => {
        localStorage.setItem('kanbanData', JSON.stringify(data)); // Save tasks and set in localStorage
    };
    ///////////////////////////////////////////////////////////////////

    useEffect(() => {
        // Save tasks in local storage
        saveDataToLocalStorage(appData);
    }, [appData]);

    return (
        <div className='Kanban-Board'>
            <BoardHeader arrow__icon={arrow__icon} isMenuOpen={isMenuOpen} profile__icon={profile__icon} toggleMenu={toggleMenu} />
            <div className='Kanban-Board__main'>
                {taskIsOpen ? <TaskDetails closeTask={closeTask} setTaskInfo={setTaskInfo} setTaskTitle={setTaskTitle} taskInfo={taskInfo} taskTitle={taskTitle} /> : null}
                <div className='Kanban-Board__main-Backlog'>
                    <span>Backlog</span>
                    {appData[0].map((task, index) => (
                        <TaskCard openTask={openTask} task={task} index={index} />
                    ))}
                    {isAddingCard ? <input id={`task-${taskId}`} type='text' placeholder='Task title...' value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} /> : ''}
                    {isAddingCard ? <ButtonSubmit setNewTask={setNewTask} taskColumn={0} /> : <button onClick={() => setIsAddingCard(true)}>+ Add card</button>}
                </div>
                <div className='Kanban-Board__main-Ready'>
                    <span>Ready</span>
                    {appData[1].map((task, index) => (
                        <TaskCard openTask={openTask} task={task} index={index} />
                    ))}
                    {isSelectVisible.Ready ? <SelectCardForm taskColumnNum={1} appData={appData} taskColumn={'Ready'} /> : null}
                    {isBtnActive.Ready ? <ButtonSubmit setNewTask={setNewTask} taskColumn={1} /> : <button onClick={() => addFunc('Ready')}>+ Add card</button>}
                </div>
                <div className='Kanban-Board__main-InProgress'>
                    <span>In Progress</span>
                    {appData[2].map((task, index) => (
                        <TaskCard openTask={openTask} task={task} index={index} />
                    ))}
                    {isSelectVisible.InProgress ? <SelectCardForm taskColumnNum={2} appData={appData} taskColumn={'InProgress'} /> : null}
                    {isBtnActive.InProgress ? <ButtonSubmit setNewTask={setNewTask} taskColumn={2} /> : <button onClick={() => addFunc('InProgress')}>+ Add card</button>}
                </div>
                <div className='Kanban-Board__main-Finished'>
                    <span>Finished</span>
                    {appData[3].map((task, index) => (
                        <TaskCard openTask={openTask} task={task} index={index} />
                    ))}
                    {isSelectVisible.Finished ? <SelectCardForm taskColumnNum={3} appData={appData} taskColumn={'Finished'} /> : null}
                    {isBtnActive.Finished ? <ButtonSubmit setNewTask={setNewTask} taskColumn={3} /> : <button onClick={() => addFunc('Finished')}>+ Add card</button>}
                </div>
            </div>
            <BoardFooter appData={appData} />
        </div>
    );
};

export default App;
