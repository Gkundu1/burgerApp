import React from 'react';
import drawerStyle from './DrawerToggle.css';

const drawerToggle=(props)=>{
    return(
        <div className={drawerStyle.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
            </div>
    );
}

export default drawerToggle;