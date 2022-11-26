import React from 'react';
import { NavLink} from "react-router-dom";
import PropTypes from 'prop-types';

const ProjectItem = ({id, title, sticker}) => {
    return (
        <NavLink to={`/tasks/${id}`} className="project__item">
            <div className="project__item-top">
                <div className="project__item-sticker">{sticker}</div>
                <h2 className="project__item-title">{title}</h2>
            </div>
        </NavLink>
    );
};

export default ProjectItem;

ProjectItem.propsType = {
    id: PropTypes.number,
    title: PropTypes.string,
    sticker: PropTypes.string,
}