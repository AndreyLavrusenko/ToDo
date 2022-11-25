import React from 'react';
import { NavLink} from "react-router-dom";
import PropTypes from 'prop-types';

const ProjectItem = ({id, title, color, sticker}) => {
    return (
        <NavLink to={`/tasks/${id}`} className="project__item" style={{backgroundColor: color}}>
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
    color: PropTypes.string,
    sticker: PropTypes.string,
}