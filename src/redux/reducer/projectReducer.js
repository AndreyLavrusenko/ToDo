const initialState = {
    project: [
        {id:1, title:"Работа", sticker:"💼"},
        {id:2, title:"Здоровье", sticker:"💪"},
        {id:3, title:"Покупки", sticker:"🍏"}
    ]
}


const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}


export default projectReducer;