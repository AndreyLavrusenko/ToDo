const UPDATE_TASKS_STATE = 'UPDATE_TASKS_STATE';


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
                            title: "Пойти в магазин"
                        },
                        {
                            id: 2,
                            title: "Купить корм"
                        },
                        {
                            id: 3,
                            title: "Сделать техническое задание"
                        },
                    ]
                },
                {
                    id: 'q2',
                    title: "Выполняется 🔥",
                    items: [
                        {
                            id: 4,
                            title: "Зарядить телефон"
                        },
                        {
                            id: 5,
                            title: "Написать 4 строчки кода"
                        },
                    ]
                },
                {
                    id: 'q3',
                    title: "Готово 😁",
                    items: [
                        {
                            id: 6,
                            title: "Пообедать"
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
                            title: "Пойти в магазин 2"
                        },
                        {
                            id: 2,
                            title: "Купить корм 2"
                        },
                        {
                            id: 3,
                            title: "Сделать техническое задание 2"
                        },
                    ]
                },
                {
                    id: 'q2',
                    title: "Выполняется 🔥",
                    items: [
                        {
                            id: 4,
                            title: "Зарядить телефон 2"
                        },
                        {
                            id: 5,
                            title: "Написать 4 строчки кода 2"
                        },
                    ]
                },
                {
                    id: 'q3',
                    title: "Готово 😁",
                    items: [
                        {
                            id: 6,
                            title: "Пообедать 2"
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

        default:
            return state;
    }
}


export const updateTasksState = (array, id) => {
    return {
        type: UPDATE_TASKS_STATE,
        array,
        id
    }
}

export default tasksReducer