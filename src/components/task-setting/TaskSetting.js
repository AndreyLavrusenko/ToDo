import React, {useState} from 'react';

const TaskSetting = () => {
    const [search, setSearch] = useState("")

    return (
        <div className="tasks__setting">
            <input
                type="text"
                name="search"
                value={search}
                placeholder={`Введите номер или текст задачи...`}
                onChange={e => setSearch(e.target.value)}
            />
            <button>+ Добавить задачу</button>
        </div>
    );
};

export default TaskSetting;