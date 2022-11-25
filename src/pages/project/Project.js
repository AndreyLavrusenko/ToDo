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
                    projectPage.project.map(({id, title, sticker, color}) => (
                        <ProjectItem key={id} id={id} title={title} sticker={sticker} color={color} />
                    ))
                }
            </div>

            {/*<button className="project__create">+ Создать новый проект</button>*/}
        </div>
    );
};

export default Project;