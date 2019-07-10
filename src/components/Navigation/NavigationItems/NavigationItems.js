import React from 'react';
import navitemsStyle from './NavigationItems.css';
import NavgationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems=(props)=>{
    return (
        <ul className={navitemsStyle.NavigationItems}>
            <NavgationItem link="/" exact>Burger Builder</NavgationItem>
            <NavgationItem link="/orders">Orders</NavgationItem> 
        </ul>
    );
}

export default navigationItems;