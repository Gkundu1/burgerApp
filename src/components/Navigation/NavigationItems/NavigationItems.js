import React from 'react';
import navitemsStyle from './NavigationItems.css';
import NavgationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={navitemsStyle.NavigationItems}>
            <NavgationItem link="/" exact>Burger Builder</NavgationItem>
            {props.auth?<NavgationItem link="/orders">Orders</NavgationItem>:null}
            {!props.auth ? <NavgationItem link="/auth">Login</NavgationItem> : <NavgationItem link="/logout">Logout</NavgationItem>}
        </ul>
    );
}

export default navigationItems;