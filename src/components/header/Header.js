import React from 'react';
import './header.scss'
import PropTypes from "prop-types";

const Header = ({title}) => {
    return (
        <header className="header">
            <h1 className="header-title">{title}</h1>
        </header>
    );
};

export default Header;


Header.propsType = {
    title: PropTypes.string,
}