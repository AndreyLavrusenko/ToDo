import React from 'react';
import {connect} from "react-redux";
import Project from "./Project";


const mapStateToProps = state => {
    return {
        projectPage: state.projectPage
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}


const ProjectContainer = connect(mapStateToProps, mapDispatchToProps)(Project);

export default ProjectContainer;