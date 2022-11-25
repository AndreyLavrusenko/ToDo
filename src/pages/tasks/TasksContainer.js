import React from 'react';
import {connect} from "react-redux";
import Tasks from "./Tasks";
import {updateTasksState} from "../../redux/reducer/tasksReducer";


const mapStateToProps = state => {
    return {
        tasksPage: state.tasksPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateTasksState: (tasksProject, id) => {
            dispatch(updateTasksState(tasksProject, id))
        }
    }
}


const TasksContainer = connect(mapStateToProps, mapDispatchToProps)(Tasks);

export default TasksContainer;