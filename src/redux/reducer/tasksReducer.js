const UPDATE_TASKS_STATE = 'UPDATE_TASKS_STATE';
const UPDATE_COMPLETE_TASKS = 'UPDATE_COMPLETE_TASKS'
const UPDATE_COMPLETE_SUBTASKS = 'UPDATE_COMPLETE_SUBTASKS'


const initialState = {
    tasksProject: [
        {
            projectId: 1,
            tasks: [
                {
                    id: 'q1',
                    title: "В очереди 🚀",
                    items: [
                        {
                            id: 1,
                            title: "Пойти в магазин",
                            desc: "Зайти в пятерочку",
                            created: "23.11.2022",
                            inWork: "4h 12m",
                            expiration: "29.11.2022",
                            priority: "low",
                            files: [],
                            subtasks: [
                                {id: 's1', title: "Посмотреть есть ли свежий хлеб", subtasksComplete: false},
                                {id: 's2', title: "Взять кофе на вынос", subtasksComplete: false}
                            ],
                            comments: [],
                            isComplete: false

                        },
                        {
                            id: 2,
                            title: "Купить корм",
                            desc: "Зайти в пятерочку",
                            created: "23.11.2022",
                            inWork: "4h 12m",
                            expiration: "29.11.2022",
                            priority: "important",  // important middle low
                            files: [],
                            subtasks: [
                                {id: 's3', title: "Посмотреть есть ли свежий хлеб", subtasksComplete: true},
                                {id: 's4', title: "Взять кофе на вынос", subtasksComplete: false}
                            ],
                            comments: [],
                            isComplete: false
                        },
                        {
                            id: 3,
                            title: "Сделать техническое задание",
                            priority: "middle",
                            subtasks: [],
                            isComplete: false
                        },
                    ]
                },
                {
                    id: 'q2',
                    title: "Выполняется 🔥",
                    items: [
                        {
                            id: 4,
                            title: "Зарядить телефон",
                            priority: "middle",
                            subtasks: [],
                            isComplete: false
                        },
                        {
                            id: 5,
                            title: "Написать 4 строчки кода",
                            subtasks: [],
                            isComplete: false
                        },
                    ]
                },
                {
                    id: 'q3',
                    title: "Готово 😁",
                    items: [
                        {
                            id: 6,
                            title: "Пообедать",
                            subtasks: [],
                            isComplete: false
                        }
                    ]
                }
            ],
        },
        {
            projectId: 2,
            tasks: [
                {
                    id: 'q1',
                    title: "В очереди 🚀",
                    items: [
                        {
                            id: 1,
                            title: "Пойти в магазин",
                            desc: "Зайти в пятерочку",
                            created: "23.11.2022",
                            inWork: "4h 12m",
                            expiration: "29.11.2022",
                            priority: "low",  // important medium low
                            files: [],
                            subtasks: [
                                {id: 's1', title: "Посмотреть есть ли свежий хлеб"},
                                {id: 's2', title: "Взять кофе на вынос"}
                            ],
                            comments: [],
                            isComplete: false

                        },
                        {
                            id: 2,
                            title: "Купить корм",
                            desc: "Зайти в пятерочку",
                            created: "23.11.2022",
                            inWork: "4h 12m",
                            expiration: "29.11.2022",
                            priority: "important",  // important medium low
                            files: [],
                            subtasks: [
                                {id: 's1', title: "Посмотреть есть ли свежий хлеб"},
                                {id: 's2', title: "Взять кофе на вынос"}
                            ],
                            comments: [],
                            isComplete: true
                        },
                        {
                            id: 3,
                            title: "Сделать техническое задание",
                            isComplete: false
                        },
                    ]
                },
                {
                    id: 'q2',
                    title: "Выполняется 🔥",
                    items: [
                        {
                            id: 4,
                            title: "Зарядить телефон",
                            isComplete: false
                        },
                        {
                            id: 5,
                            title: "Написать 4 строчки кода",
                            isComplete: false
                        },
                    ]
                },
                {
                    id: 'q3',
                    title: "Готово 😁",
                    items: [
                        {
                            id: 6,
                            title: "Пообедать",
                            isComplete: false
                        }
                    ]
                }
            ],
        },
    ]
}


if (!localStorage.getItem("tasksProject")) {
    localStorage.setItem("tasksProject", JSON.stringify(initialState))
}

const tasksReducer = (state = JSON.parse(localStorage.getItem("tasksProject")), action) => {
    switch (action.type) {
        case UPDATE_TASKS_STATE:
            localStorage.setItem("tasksProject", JSON.stringify(state))

            state.tasksProject.map(item => {
                if (+item.projectId === +action.id) {
                    return action.array
                } else {
                    return state.tasksProject
                }
            })

            return state;


        case UPDATE_COMPLETE_TASKS:
            return {
                ...state,
                tasksProject: state.tasksProject.map(item => {
                    // Если список совпадает
                    if (+item.projectId === +action.projectId) {
                        // Смотрим все состояние tasks
                        item.tasks.map(task => {
                            // Перебираем id в tasks
                            task.items.map(taskId => {
                                if (taskId.id === action.itemId) {

                                    // Удаление сделанной задачи из спсика
                                    const currentIndex = task.items.indexOf(taskId)
                                    task.items.splice(currentIndex, 1)

                                    // Переном в завершенные
                                    item.tasks[2].items.push(taskId)

                                    taskId.subtasks.map(subtask => {
                                        return subtask.subtasksComplete = true
                                    })

                                    return taskId.isComplete = !action.status
                                }
                                return taskId
                            })
                            return task
                        })
                        localStorage.setItem("tasksProject", JSON.stringify(state))
                    }
                    return item
                })
            }


        case UPDATE_COMPLETE_SUBTASKS:
            return {
                ...state,
                tasksProject: state.tasksProject.map(item => {
                    // Если список совпадает
                    if (+item.projectId === +action.projectId) {
                        // Смотрим все состояние tasks
                        item.tasks.map(task => {
                            // Перебираем id в tasks
                            task.items.map(taskId => {
                                if (taskId.id === action.itemId) {
                                    // Перебираем подзадачи
                                    taskId.subtasks.map(subtask => {
                                        if (subtask.id === action.subStatusId) {
                                            return subtask.subtasksComplete = !action.status
                                        }
                                        return subtask
                                    })
                                }
                                return taskId
                            })
                            return task
                        })
                        localStorage.setItem("tasksProject", JSON.stringify(state))
                    }
                    return item
                })
            }


        default:
            return state;
    }
}


export const updateTasksState = (array, id) => {
    return {type: UPDATE_TASKS_STATE, array, id}
}

export const updateCompleteTask = (itemId, projectId, status) => {
    return {type: UPDATE_COMPLETE_TASKS, itemId, projectId, status}
}

export const updateCompleteSubtask = (subStatusId, itemId, projectId, status) => {
    return {type: UPDATE_COMPLETE_SUBTASKS, subStatusId, itemId, projectId, status}
}


export default tasksReducer