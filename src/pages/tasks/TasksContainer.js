import React from 'react';
import {connect} from "react-redux";
import Tasks from "./Tasks";
import {updateCompleteTask, updateTasksState} from "../../redux/reducer/tasksReducer";


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

        updateCompleteTask: (itemId, projectId) => {
            dispatch(updateCompleteTask(itemId, projectId))
        }
    }
}


const TasksContainer = connect(mapStateToProps, mapDispatchToProps)(Tasks);

export default TasksContainer;