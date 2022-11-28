import React, {useState} from 'react';
import ReactDOM from "react-dom";
import '../modal.scss'
import {useParams} from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";


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
    const [file, setFile] = useState(null)

    const onChange = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleFileChange = e => {
        setFile(e.target.files[0])
    }

    const handleUploadImg = async () => {
        if (!file) return;

        const formData = new FormData();

        const ext = ((/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name)[0] : undefined)


        formData.append('file', file, values.title+'.'+ext);

        try {
            await axios.post("http://localhost:5001/files", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        } catch (err) {
            console.error(err)
        }


    }


    const handleSubmitForm = (e) => {
        e.preventDefault();

        let ext = ""
        if (file) {
           ext = ((/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name)[0] : undefined)
        }

        const createObj = {
            ...values,
            id: Math.random().toString(),
            created: `${hour < 10 ? '0'+hour : hour}:${minute < 10 ? '0'+minute : minute} ${day}-${month}-${year}`,
            fullTimeCreate: new Date() / 1,
            files: file ? values.title+'.'+ext : ""
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
                            <input onChange={(e) => handleFileChange(e)} type="file" name="file"/>
                            <span className="input-file-btn">Выберите файл</span>
                            <span className="input-file-text">
                                {file
                                    ? file.name.length > 40 ? file.name.substring(0, 40)+'...' : file.name
                                    : "Максимальный размер 10мб"
                                }
                            </span>
                        </label>

                        <div>
                            <button type="submit" onClick={handleUploadImg}>Создать</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>,
        document.getElementById('create-modal')
    )
};


CreateModal.propTypes = {
    setCreateModalActive: PropTypes.func,
    createModalActive: PropTypes.bool,
    createNewTask: PropTypes.func,
}

export default CreateModal;