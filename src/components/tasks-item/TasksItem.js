import React, {useEffect} from 'react';
import PropTypes from "prop-types";

const TasksItem = ({tasks, rerenderArr, tasksArr, setCurrentBoard, currentBoard, setCurrentItem, currentItem}) => {

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


    return (
        <>
            {
                tasks.items.map((item, i) => (
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
                        <p>{item.title}</p>
                    </div>
                ))
            }
        </>
    )

};

export default TasksItem;

TasksItem.propsType = {
    tasks: PropTypes.array,
}