import React from 'react';
import toolbarStyle from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
        <header className={toolbarStyle.Toolbar}>
            <DrawerToggle clicked={props.toggleDrawer}/>
            <div className={toolbarStyle.Logo}>
                <Logo />
            </div>
            <nav className={toolbarStyle.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default toolbar;