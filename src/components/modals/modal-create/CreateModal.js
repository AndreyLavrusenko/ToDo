import React, {useState} from 'react';
import ReactDOM from "react-dom";
import '../modal.scss'
import {useParams} from "react-router-dom";
import moment from "moment";


const CreateModal = ({setCreateModalActive, createModalActive, createNewTask}) => {
    const params = useParams();

    const projectId = params.id

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hour = date.getHours();
    const minute = date.getMinutes()

    const d = `${year}-${month}-${day}`

    const [values, setValues] = useState({
        title: "",
        desc: "",
        expiration: "",
        select: "low",
    })

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }


    const handleSubmitForm = (e) => {
        e.preventDefault();

        const createObj = {
            ...values,
            id: Math.random().toString(),
            created: `${hour < 10 ? '0'+hour : hour}:${minute < 10 ? '0'+minute : minute} ${day}-${month}-${year}`,
            fullTimeCreate: new Date() / 1
        }

        // Отправляем данные в redux
        createNewTask(projectId, createObj)

        setValues({
            title: "",
            desc: "",
            expiration: "",
            select: "low",
        })

        setCreateModalActive(false)
    }

    return ReactDOM.createPortal(
        <div
            className={createModalActive ? "modal active" : "modal"}
            onClick={() => setCreateModalActive(false)}
        >
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                    <h2>Создайте задачу</h2>
                    <form onSubmit={e => handleSubmitForm(e)} className="modal__create">

                        <label htmlFor="title">Заголовок</label><br/>
                        <input value={values.title} required={true} type="text" onChange={e => onChange(e)} id="title" name="title" placeholder="Введите заголовок"/>

                        <label htmlFor="desc">Описание</label><br/>
                        <textarea value={values.desc} name="desc" id="desc" onChange={e => onChange(e)} placeholder="Введите описание"/>

                        <label htmlFor="expiration">Дата окончания</label><br/>
                        <input value={values.expiration} type="date" id="expiration" onChange={e => onChange(e)} name="expiration" min={d} placeholder="Дата окончания"/>

                        <label htmlFor="select">Приоритет</label>
                        <select value={values.select} name="select" onChange={e => onChange(e)} id="select">
                            <option value="low" defaultValue>Низкий 🟢</option>
                            <option value="middle">Средний 🟠</option>
                            <option value="important">Высокий 🔴</option>
                        </select>

                        <label className="input-file">
                            <input onChange={e => onChange(e)} type="file" name="file"/>
                            <span className="input-file-btn">Выберите файл</span>
                            <span className="input-file-text">Максимум 10мб</span>
                        </label>

                        <div>
                            <button type="submit">Создать</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>,
        document.getElementById('create-modal')
    )
};

export default CreateModal;