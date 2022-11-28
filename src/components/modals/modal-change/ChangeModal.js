import React, {useState} from 'react';
import ReactDOM from "react-dom";
import trash from '../../../assets/img/delete.png'
import {useParams} from "react-router-dom";


const ChangeModal = ({changeModal, setChangeModal, task, updateTask, deleteSubtask}) => {
    const params = useParams();
    const projectId = params.id

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const d = `${year}-${month}-${day}`

    const [values, setValues] = useState({
        title: task.title,
        desc: task.desc,
        expiration: task.expiration,
        priority: task.priority,
    })

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleDeleteSubtask = (taskId) => {
        deleteSubtask(task.id, projectId, taskId)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();


        updateTask(task.id, projectId, values)

        setValues({
            title: "",
            desc: "",
            expiration: "",
            priority: "",
        })

        setChangeModal(false)
    }

    return ReactDOM.createPortal(
        <div
            className={changeModal ? "modal active" : "modal"}
            onClick={() => setChangeModal(false)}
        >
            <div className="modal__content" style={{width: "900px"}} onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                    <h2>Редактирование задачи</h2>

                    <form onSubmit={e => handleSubmitForm(e)} className="modal__create">

                        <label htmlFor="title">Заголовок</label>
                        <input name="title" onChange={e => onChange(e)} id="title" type="text" value={values.title}/>

                        <label htmlFor="desc">Описание</label>
                        <textarea name="desc" onChange={e => onChange(e)} id="desc" value={values.desc}/>

                        <label htmlFor="expiration">Дата окончания</label><br/>
                        <input value={values.expiration} onChange={e => onChange(e)} type="date" id="expiration" name="expiration" min={d}
                               placeholder="Дата окончания"/>

                        <label htmlFor="priority">Приоритет</label>
                        <select value={values.priority} onChange={e => onChange(e)} name="priority" id="priority">
                            <option value="low">Низкий 🟢</option>
                            <option value="middle">Средний 🟠</option>
                            <option value="important">Высокий 🔴</option>
                        </select>

                        <div className="modal__list">
                            {task.subtasks.map((item, i) => (
                                <div className="modal__list-item" key={i}>
                                    <span>{item.title}</span>
                                    <img onClick={() => handleDeleteSubtask(item.id)} src={trash} alt="удалить"/>
                                </div>
                            ))}
                        </div>

                        <div>
                            <button style={{bottom: "14px", right: "20px"}} type="submit">Сохранить</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>,
        document.getElementById('change-modal')
    )
};

export default ChangeModal;