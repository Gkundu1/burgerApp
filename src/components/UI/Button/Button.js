import React from 'react';
import ButtonStyle from './Button.css';

const button =(props)=>{
    return (
        <button
        disabled={props.disabled}
        className={[ButtonStyle.Button,ButtonStyle[props.buttonType]].join(' ')}
        onClick={props.clicked}>
        {props.children}
        </button>
    );
}

export default button;