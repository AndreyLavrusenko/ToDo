import React, {useState} from 'react';
import PropTypes from "prop-types";
import TasksItem from "../tasks-item/TasksItem";

const TasksBorder = ({tasks, rerenderArr, tasksArr, currentBoard, setCurrentBoard, currentItem, setCurrentItem}) => {

    function dragOverHandler(e) {
        e.preventDefault()

        if (e.target.className === 'task__border-tasks') {
            e.target.style.boxShadow = "0 2px 3px gray"
        }
    }

    function dropCardHandler(e, tasks) {
        if (e.target.className !== "task__border-tasks") {
            tasks.items.push(currentItem)
            const currentIndex = currentBoard.indexOf(currentItem) // Индекс в массиве у текущей карточки, которую держим в руке
            currentBoard.splice(currentIndex, 1)

            rerenderArr(tasksArr.map(b => {
                if (b.id === tasks.id) {
                    return tasks
                }

                if (b.id === currentBoard.id) {
                    return currentBoard
                }

                return b;
            }))

            e.target.style.boxShadow = "none"
            setCurrentItem([])
            setCurrentBoard([])
        }
    }

    return (
        <div
            className="tasks__border-item"
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dropCardHandler(e, tasks)}

        >
            <h2 className="tasks__border-title">{tasks.title}</h2>

            <TasksItem tasks={tasks} rerenderArr={rerenderArr} currentItem={currentItem} setCurrentItem={setCurrentItem}
                       tasksArr={tasksArr} currentBoard={currentBoard} setCurrentBoard={setCurrentBoard}/>
        </div>
    );
};

export default TasksBorder;


TasksBorder.propsType = {
    tasks: PropTypes.array,
}