import React from 'react';

const SelectCardForm = ({ taskColumn, appData, taskColumnNum }) => {
    const taskList = appData[taskColumnNum - 1]; // Выбираем список задач из предыдущей колонки

    return (
        <>
            <p>
                <select id={`select-${taskColumn}`}>
                    {taskList.map((task, index) => (
                        <option key={index} value={task.title}>
                            {task.title}
                        </option>
                    ))}
                </select>
            </p>
        </>
    );
};

export default SelectCardForm;
