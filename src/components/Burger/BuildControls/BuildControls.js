import React from 'react';
import ControlsStyle from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {label:'Salad',type:'Salad'},
    {label:'Bacon',type:'Bacon'},
    {label:'Cheese',type:'Cheese'},
    {label:'Meat',type:'meat'}
];

const buildControls=(props)=>{
    return(
        <div className={ControlsStyle.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl=>(
                <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={()=>props.ingredientAdded(ctrl.type)}
                remove={()=>props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
            ))}
            <button className={ControlsStyle.OrderButton} disabled={!props.purchaseable} 
            onClick={props.checkout}>{props.isAuth?'ORDER NOW!!':'SIGN UP TO ORDER'}</button>
        </div>
    );
};

export default buildControls;