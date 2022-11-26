import React from 'react';
import Header from "../../components/header/Header";
import './project.scss'
import ProjectItem from "../../components/project-item/ProjectItem";

const Project = ({projectPage}) => {


    return (
        <div className="project">
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

export default Project;