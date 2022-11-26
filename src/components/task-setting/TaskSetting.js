import React, {useEffect, useState} from 'react';
import CreateModal from "../modals/modal-create/CreateModal";

const TaskSetting = ({tasks, createModalActive, setCreateModalActive, createNewTask}) => {
    const [search, setSearch] = useState("")
    const [tasksItem, setTasksItem] = useState([])


    useEffect(() => {
        const arr = [];

        tasks.map(item => {
            arr.push(...item.items)
        })

        setTasksItem(arr)
    }, [tasks])


    const filteredTasks = tasksItem.filter(item => {
        return item.title.toLowerCase().includes(search.toLowerCase())
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
                                        onClick={() => console.log(item.id)}
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

export default TaskSetting;