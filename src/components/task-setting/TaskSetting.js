import React, {useEffect, useState} from 'react';
import CreateModal from "../modals/modal-create/CreateModal";
import PropTypes from "prop-types";

const TaskSetting = ({tasks, createModalActive, setCreateModalActive, createNewTask, setSelectSearch}) => {
    const [search, setSearch] = useState("")
    const [tasksItem, setTasksItem] = useState([])


    useEffect(() => {
        const arr = [];

        tasks.map(item => {
            return arr.push(...item.items)
        })

        setTasksItem(arr)
    }, [tasks])

    useEffect(() => {
        if (search === "") {
            setSelectSearch(null)
        }
    }, [search])


    const filteredTasks = tasksItem.filter(item => {
        return item.title.toLowerCase().includes(search.toLowerCase()) || Math.floor(item.id * 1000) === +search
    })


    return (
        <>
            <div className="tasks__setting">
                <div className="tasks__dropdown">
                    <input
                        type="text"
                        name="search"
                        value={search}
                        autoComplete="off"
                        placeholder={`Введите номер или текст задачи...`}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {
                        filteredTasks.length !== tasksItem.length

                            ? <div className="tasks__dropdown-content">
                                {filteredTasks.map(item => (
                                    <p
                                        key={item.id}
                                        onClick={() => setSelectSearch(item.id)}
                                    >{item.title}
                                    </p>
                                ))}
                            </div>

                            : null
                    }
                </div>
                <button
                    onClick={() => {
                        setCreateModalActive(true)
                    }}
                >+ Добавить задачу
                </button>
            </div>

            <CreateModal createNewTask={createNewTask} createModalActive={createModalActive} setCreateModalActive={setCreateModalActive} />
        </>
    );
};


TaskSetting.propTypes = {
    tasks: PropTypes.array,
    createModalActive: PropTypes.bool,
    setCreateModalActive: PropTypes.func,
    createNewTask: PropTypes.func,
    setSelectSearch: PropTypes.func,
}

export default TaskSetting;

