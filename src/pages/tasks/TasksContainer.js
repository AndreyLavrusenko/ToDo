import React from 'react';
import {connect} from "react-redux";
import Tasks from "./Tasks";
import {
    addSubtask,
    createNewTask, deleteSubtask, deleteTask,
    updateCompleteSubtask,
    updateCompleteTask, updateTask,
    updateTasksState
} from "../../redux/reducer/tasksReducer";


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
        },

        addSubtask: (itemId, projectId, title, subtaskId) => {
            dispatch(addSubtask(itemId, projectId, title, subtaskId))
        },

        updateTask: (itemId, projectId, array) => {
            dispatch(updateTask(itemId, projectId, array))
        },

        deleteSubtask: (itemId, projectId, taskId) => {
            dispatch(deleteSubtask(itemId, projectId, taskId))
        }
    }
}


const TasksContainer = connect(mapStateToProps, mapDispatchToProps)(Tasks);

export default TasksContainer;