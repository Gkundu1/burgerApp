import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import drawerstyle from './SideDrawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/_Aux';

const sideDrawer = (props) => {
    let attachStyle = [drawerstyle.SideDrawer, drawerstyle.Close]
    if (props.open) {
        attachStyle = [drawerstyle.SideDrawer, drawerstyle.Open]
    }
    return (
        <Aux>
            <BackDrop
                show={props.open}
                clicked={props.closedDrawer} />
            <div className={attachStyle.join(' ')} onClick={props.closedDrawer}>
                <div className={drawerstyle.Logo}>
                    <Logo /></div>
                <nav>
                    <NavigationItems  auth={props.auth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;