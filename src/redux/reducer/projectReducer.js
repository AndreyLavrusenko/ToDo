const initialState = {
    project: [
        {id:1, title:"Работа", sticker:"💼", color:"#43A2F9"},
        {id:2, title:"Здоровье", sticker:"💪", color:"#53d672"},
        {id:3, title:"Покупки", sticker:"🍏", color:"#f7434b"}
    ]
}


const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}


export default projectReducer;