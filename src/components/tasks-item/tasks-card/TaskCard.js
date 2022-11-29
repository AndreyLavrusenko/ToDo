import React, {useState} from 'react';
import moment from "moment";
import pencil from "../../../assets/img/edit.png";
import trash from "../../../assets/img/delete.png";
import ChangeModal from "../../modals/modal-change/ChangeModal";

const TaskCard = ({
                      i,
                      item,
                      dragEndHandler,
                      dragOverHandler,
                      dragStartHandler,
                      handleCheckboxChange,
                      handlerCheckboxSubTasksChange,
                      handleDeleteTask,
                      dragLeaveHandler,
                      handleSaveSubtask,
                      tasks,
                      updateTask,
                      deleteSubtask,
                      selectSearch,
                      addSubComment,
                      projectId,
                      addComment,
                  }) => {
    const [isSubtask, setIsSubtask] = useState(false)
    const [subtaskText, setSubtaskText] = useState("")
    const [changeModal, setChangeModal] = useState(false)

    const [subMessage, setSubMessage] = useState("")
    const [message, setMessage] = useState("")

    let priority

    if (item.priority === "important") {
        priority = "🔴"
    } else if (item.priority === "middle") {
        priority = "🟠"
    } else {
        priority = "🟢"
    }

    const startDate = new Date();

    const timeStart = moment(item.fullTimeCreate);
    const timeEnd = moment(startDate);

    const diff = timeEnd.diff(timeStart);
    const diffDuration = moment.duration(diff);


    const handleSubMessage = (itemId, id) => {
        if (subMessage === "") return

        const messageId = "m"+Math.floor(Math.random() * 100000)
        addSubComment(itemId, projectId, id, subMessage, messageId)

        setSubMessage("")
    }


    const handleMessage = (itemId) => {
        if (message === "") return

        const messageId = "m"+Math.floor(Math.random() * 100000)
        addComment(itemId, projectId, message, messageId)

        setMessage("")
    }


    return (
        <div
            className="task__border-tasks"
            draggable={true}
            style={selectSearch === item.id ? {border: "2px solid #1363E7"} : null}
            key={i}
            onDragOver={e => dragOverHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragStart={e => dragStartHandler(e, tasks, item)}
            onDragEnd={e => dragEndHandler(e)}
        >
            <div className="tasks__card">
                <div className="tasks__card-header">
                    <h3 className="tasks__card-title"
                        style={item.isComplete ? {textDecoration: 'line-through'} : null}
                    >
                        {item.isComplete ? item.title : priority + " " + item.title}
                    </h3>
                    <div className="round">
                        <input
                            type="checkbox"
                            checked={item.isComplete}
                            id="checkbox"
                            readOnly={true}
                        />
                        <label
                            htmlFor="checkbox"
                            onClick={() => handleCheckboxChange(item.id, item.isComplete)}
                        />
                    </div>
                </div>
                {item.desc ? <div className="tasks__card-desc">{item.desc}</div> : null}
                <div className="tasks__card-info">
                    <div>Статус: {tasks.title}</div>
                    <div>Номер: {Math.floor(item.id * 1000)}</div>
                </div>
                <div className="tasks__card-time">
                    <div className="tasks__card-create"><span>Дата создания: </span>{item.created}</div>
                    <div className="tasks__card-create"><span>В работе уже: </span>
                        {diffDuration.days() ? diffDuration.days() + "д " : null}
                        {diffDuration.hours() ? diffDuration.hours() + "ч " : null}
                        {diffDuration.minutes() ? diffDuration.minutes() + "м " : null}
                    </div>
                    <div className="tasks__card-create">
                        <span>Дата завершения: </span>{item.expiration ? item.expiration : 'Бессрочный'}
                    </div>
                </div>
                <div className="tasks__card-subtasks">
                    {item.subtasks.length > 0
                        ? item.subtasks.map(subtask => {
                            return (
                                <div className="checkbox" key={subtask.id}
                                     style={{marginBottom: "10px"}}>
                                    <input
                                        className="custom-checkbox"
                                        type="checkbox"
                                        id={subtask.id}
                                        checked={subtask.subtasksComplete}
                                        readOnly={true}
                                        name={subtask.id}
                                    />
                                    <label
                                        htmlFor={subtask.id}
                                        onClick={() => handlerCheckboxSubTasksChange(subtask.id, item.id, subtask.subtasksComplete)}
                                    >{subtask.title}
                                    </label>
                                </div>
                            )
                        })
                        : null
                    }

                    {isSubtask
                        ? <div className="tasks__card-subtasksinput">
                            <input
                                type="text"
                                value={subtaskText}
                                onChange={e => setSubtaskText(e.target.value)}
                                placeholder="Новая подзадача"
                            />

                            <button onClick={() => {
                                handleSaveSubtask(item.id, subtaskText)
                                setSubtaskText("")
                                setIsSubtask(false)
                            }
                            }>Добавить</button>
                        </div>
                        : <button onClick={() => setIsSubtask(true)}>+ Добавить подзадачу</button>
                    }


                </div>
                <div className="tasks__card-change">
                    <img src={pencil} alt="Редактировать" onClick={() => setChangeModal(true)} style={{marginBottom: "20px"}}/>
                    <img src={trash} onClick={() => handleDeleteTask(item.id)} alt="Удалить"/>
                </div>

                {item.files
                    ? <div className="tasks__card-file">
                        <a download={true} href={`http://localhost:5001/uploads/${item.files}`}>
                            Скачать вложенный файл
                        </a>
                    </div>
                    : null
                }


                <div className="tasks__card-chat">
                    {item.comments.map((comment, i) => (
                        <div key={i} className="tasks__card-chatblock">
                            {comment.map((message, i) => {
                                return (
                                    <div key={message.messageId} style={{marginLeft: i * 10 + "px"}} className="tasks__card-chatmain">
                                        <div className='tasks__card-chaticon'/>
                                        <div className="tasks__card-chatitem" >{message.messageText}</div>
                                    </div>
                                )
                            })}
                            <input
                                type="text"
                                onBlur={() => {
                                    handleSubMessage(item.id, i)
                                    setSubMessage("")
                                }}
                                onChange={e => setSubMessage(e.target.value)}
                                placeholder="Ваше сообщение"
                            />
                        </div>
                    ))}
                    <input
                        type="text"
                        placeholder="Ваше сообщение"
                        onBlur={() => handleMessage(item.id)}
                        onChange={e => setMessage(e.target.value)}
                    />
                </div>

            </div>

            {
                changeModal ? <ChangeModal deleteSubtask={deleteSubtask} updateTask={updateTask} task={item} setChangeModal={setChangeModal} changeModal={changeModal} /> : null
            }

        </div>
    )
};

export default TaskCard;