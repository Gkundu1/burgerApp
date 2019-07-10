import React from 'react';
import ControlStyle from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={ControlStyle.BuildControl}>
            <div className={ControlStyle.Label}>{props.label}</div>
            <button
                className={ControlStyle.Less}
                onClick={props.remove}
                disabled={props.disabled}>Remove</button>
            <button className={ControlStyle.More} onClick={props.added}>Add</button>
        </div>
    );
};

export default buildControl;