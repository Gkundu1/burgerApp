import React from 'react';
import BurgerStyle from './Burger.css';
import BurgerIngredient from '../../containers/BurgerIngredient/BurgerIngredient';

const burger = (props)=>{
    //console.log("Ingredient is ",Object.keys(props.ingredients));
    let transformedIngredients=Object.keys(props.ingredients)
    .map(igkey=>{
        //console.log("igkey value is ",igkey);
        return  [...Array(props.ingredients[igkey])].map((_,index)=>{
           // console.log("index value is ",index);
               return (<BurgerIngredient key={igkey+index} type={igkey}/>);
        });
    }).reduce((arr,el)=>{
            return arr.concat(el);
    },[]);
    if(transformedIngredients.length===0)
    {
        transformedIngredients=<p>Please Start Adding Ingredient!</p>
    }
    console.log("Created array is ",transformedIngredients);
    return(
        <div className={BurgerStyle.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;