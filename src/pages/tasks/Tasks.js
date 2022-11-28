import React, {useEffect, useState} from 'react';
import Header from "../../components/header/Header";
import TaskSetting from "../../components/task-setting/TaskSetting";
import './tasks.scss'
import TasksBorder from "../../components/tasks-border/TasksBorder";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";

const Tasks = ({tasksPage, updateTasksState, updateCompleteTask, updateCompleteSubtask, createNewTask, deleteTask}) => {
    const [createModalActive, setCreateModalActive] = useState(false)

    const params = useParams();

    const projectId = params.id
    const [tasks, setTasks] = useState([])

    const [currentBoard, setCurrentBoard] = useState([]) // Состояние для текущей доски
    const [currentItem, setCurrentItem] = useState([]) // Состояние для текущей задачи


    const rerenderArr = (arr) => {
        setTasks(arr)
        updateTasksState(arr, params.id)
    }


    useEffect(() => {
        tasksPage.tasksProject.map(item => {
            if (+item.projectId === +projectId) {
                return setTasks(item.tasks)
            }
        })
    }, [projectId])


    return (
        <section className="tasks">
            <Header title={"Задачи"}/>

            <TaskSetting
                createModalActive={createModalActive}
                setCreateModalActive={setCreateModalActive}
                tasks={tasks}
                createNewTask={createNewTask}
            />

            <div className="tasks__border">
                {tasks.map(item => (
                    <TasksBorder
                        currentItem={currentItem}
                        setCurrentItem={setCurrentItem}
                        currentBoard={currentBoard}
                        setCurrentBoard={setCurrentBoard}
                        key={item.id}
                        tasks={item}
                        rerenderArr={rerenderArr}
                        tasksArr={tasks}
                        updateCompleteTask={updateCompleteTask}
                        updateCompleteSubtask={updateCompleteSubtask}
                        deleteTask={deleteTask}
                    />
                ))}

            </div>

        </section>
    );
};

Tasks.propsType = {
    tasksPage: PropTypes.array,
    updateTasksState: PropTypes.func,
    updateCompleteTask: PropTypes.func,
    updateCompleteSubtask: PropTypes.func,
    createNewTask: PropTypes.func,
    deleteTask: PropTypes.func,
}

export default Tasks;