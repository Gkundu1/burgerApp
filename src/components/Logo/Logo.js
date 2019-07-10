import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import logostyle from './Logo.css';

const logo=(props)=>{
    return (
        <div className={logostyle.Logo} style={{height:props.height}}>
            <img src={burgerLogo} alt="MyBurger"/>
        </div>
    );
}

export default logo;