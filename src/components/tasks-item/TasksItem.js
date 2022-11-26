import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";


const TasksItem = ({
                       tasks,
                       rerenderArr,
                       tasksArr,
                       setCurrentBoard,
                       currentBoard,
                       setCurrentItem,
                       currentItem,
                       updateCompleteTask
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

    function dropHandler(e, tasks, item) {
        e.preventDefault()

        const currentIndex = currentBoard.indexOf(currentItem) // Индекс в массиве у текущей карточки, которую держим в руке
        currentBoard.splice(currentIndex, 1)
        // Получаем идекс элемента, над которым мы держим карточку
        const dropIndex = tasks.items.indexOf(item)
        tasks.items.splice(dropIndex + 1, 0, currentItem)

        rerenderArr(tasksArr.map(b => {
            if (b.id === tasks.id) {
                return tasks
            }

            if (b.id === currentBoard.id) {
                return currentBoard
            }

            return b;
        }))
    }


    const handleCheckboxChange = (id) => {
        updateCompleteTask(id, projectId)
    }


    return (
        <>
            {
                tasks.items.map((item, i) => {
                    return (
                        <div
                            className="task__border-tasks"
                            draggable={true}
                            key={i}
                            onDragOver={e => dragOverHandler(e)}
                            onDragLeave={e => dragLeaveHandler(e)}
                            onDragStart={e => dragStartHandler(e, tasks, item)}
                            onDragEnd={e => dragEndHandler(e)}
                            onDrop={e => dropHandler(e, tasks, item)}
                        >
                            <div className="tasks__card">
                                <div className="tasks__card-header">
                                    <h3 className="tasks__card-title"
                                        style={item.isComplete ? {textDecoration: 'line-through'} : null}>{item.title}</h3>
                                    {/*<div className="round">*/}
                                        <input
                                            type="checkbox"
                                            checked={item.isComplete}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                        {/*<input*/}
                                        {/*    type="checkbox"*/}
                                        {/*    checked={item.isComplete}*/}
                                        {/*    id="checkbox"*/}
                                        {/*/>*/}
                                        {/*<label*/}
                                        {/*    htmlFor="checkbox"*/}
                                        {/*    onClick={() => handleCheckboxChange(item.id)}*/}
                                        {/*/>*/}
                                    {/*</div>*/}
                                </div>
                                {item.desc ? <div className="tasks__card-desc">{item.desc}</div> : null}
                                <hr style={{marginTop: "20px", height: "1px"}}/>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )

};

export default TasksItem;

TasksItem.propsType = {
    tasks: PropTypes.array,
}