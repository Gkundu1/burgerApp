import React from 'react';
import navItemStyle from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem=(props)=>{
    return (
        <li className={navItemStyle.NavigationItem}>

            <NavLink 
            activeClassName={navItemStyle.active}
            to={props.link} exact={props.exact}>{props.children}
            </NavLink>
            </li>
    );
}

export default navigationItem;