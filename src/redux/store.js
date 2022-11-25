import {combineReducers, createStore} from 'redux';
import projectReducer from "./reducer/projectReducer";
import tasksReducer from "./reducer/tasksReducer";

let reducers = combineReducers({
    projectPage: projectReducer,
    tasksPage: tasksReducer,
})

let store = createStore(reducers);

export default store;
window.store = store;