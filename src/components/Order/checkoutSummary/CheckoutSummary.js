import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import checkoutstyle from './CheckoutSummary.css';

const checkoutSummary =(props)=>{
    return (
        <div className={checkoutstyle.CheckoutSummary}>
            <h1>A tasty burger is ready to eat</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
            buttonType="Danger" 
            clicked={props.checkoutCancel}>CANCEL</Button>
            <Button 
            buttonType="Success" 
            clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;