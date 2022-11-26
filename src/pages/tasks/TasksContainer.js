import React from 'react';
import {connect} from "react-redux";
import Tasks from "./Tasks";
import {
    createNewTask, deleteTask,
    updateCompleteSubtask,
    updateCompleteTask,
    updateTasksState
} from "../../redux/reducer/tasksReducer";
import project from "../project/Project";


const mapStateToProps = state => {
    return {
        tasksPage: state.tasksPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTasksState: (tasksProject, id) => {
            dispatch(updateTasksState(tasksProject, id))
        },

        updateCompleteTask: (itemId, projectId, status) => {
            dispatch(updateCompleteTask(itemId, projectId, status))
        },

        updateCompleteSubtask: (subStatusId, itemId, projectId, status) => {
            dispatch(updateCompleteSubtask(subStatusId, itemId, projectId, status))
        },

        createNewTask: (projectId, array) => {
            dispatch(createNewTask(projectId, array))
        },

        deleteTask: (projectId, id) => {
            dispatch(deleteTask(projectId, id))
        }
    }
}


const TasksContainer = connect(mapStateToProps, mapDispatchToProps)(Tasks);

export default TasksContainer;