import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";

import TaskCard from "./tasks-card/TaskCard";


const TasksItem = ({
                       tasks,
                       setCurrentBoard,
                       setCurrentItem,
                       updateCompleteTask,
                       updateCompleteSubtask,
                       deleteTask,
                       addSubtask,
                       updateTask,
                       deleteSubtask,
                       selectSearch,
                   }) => {

    const params = useParams();
    const projectId = params.id

    useEffect(() => {
        setCurrentItem([])
        setCurrentBoard([])
    }, [])

    function dragOverHandler(e) {
        e.preventDefault()

        if (e.target.className === 'task__border-tasks') {
            e.target.style.boxShadow = "0 2px 3px gray"
        }
    }

    function dragLeaveHandler(e) {
        e.target.style.boxShadow = "none"
    }

    function dragStartHandler(e, tasks, item) {
        setCurrentBoard(tasks.items) // Текущая доска
        setCurrentItem(item) // Текущая задача
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = "none"
        setCurrentBoard([])
        setCurrentItem([])
    }


    const handleCheckboxChange = (id, status) => {
        updateCompleteTask(id, projectId, status)
    }

    const handlerCheckboxSubTasksChange = (subId, id, status) => {
        // Id подзадачи, Id задачи, Id проекта
        updateCompleteSubtask(subId, id, projectId, status)
    }

    const handleDeleteTask = (id) => {
        deleteTask(projectId, id)
    }

    const handleSaveSubtask = (id, text) => {
        const taskId = Math.floor(Math.random() * 100000)
        addSubtask(id, projectId, text, taskId)
    }

    return (
        <>
            {
                tasks.items.map((item, i) => {
                   return <TaskCard
                       item={item}
                       handleCheckboxChange={handleCheckboxChange}
                       handleDeleteTask={handleDeleteTask}
                       handlerCheckboxSubTasksChange={handlerCheckboxSubTasksChange}
                       dragEndHandler={dragEndHandler}
                       dragStartHandler={dragStartHandler}
                       dragOverHandler={dragOverHandler}
                       dragLeaveHandler={dragLeaveHandler}
                       handleSaveSubtask={handleSaveSubtask}
                       tasks={tasks}
                       updateTask={updateTask}
                       deleteSubtask={deleteSubtask}
                       selectSearch={selectSearch}
                       i={i}
                       key={i}
                   />
                })
            }
        </>
    )

};

export default TasksItem;

TasksItem.propsType = {
    tasks: PropTypes.array,
    setCurrentBoard: PropTypes.func,
    setCurrentItem: PropTypes.func,
    updateCompleteTask: PropTypes.func,
    updateCompleteSubtask: PropTypes.func,
    deleteTask: PropTypes.func,
}