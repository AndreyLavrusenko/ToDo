import React from 'react';
import Header from "../../components/header/Header";
import './project.scss'
import ProjectItem from "../../components/project-item/ProjectItem";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";

const Project = ({projectPage}) => {


    return (
        <div className="project">
            <Helmet>
                <title>Ваши проекты</title>
            </Helmet>
            <Header title={"Ваши проекты"} />

            <div className="project__items">
                {
                    projectPage.project.map(({id, title, sticker}) => (
                        <ProjectItem key={id} id={id} title={title} sticker={sticker} />
                    ))
                }
            </div>

        </div>
    );
};

Project.propsType = {
    projectPage: PropTypes.array
}

export default Project;