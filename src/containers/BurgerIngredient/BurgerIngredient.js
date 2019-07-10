import React, { Component } from 'react';
import ingredStyle from './BurgerIngredient.css';
import propTypes from 'prop-types';

class BurgerIngredient extends Component
{
    render(){
        let ingredient = null;

    switch (this.props.type) {
        case ('bread-bottom'):
            ingredient = <div className={ingredStyle.BreadBottom}>
                 
            </div>;
            break;
        case ('bread-top'):
            ingredient = (
                <div className={ingredStyle.BreadTop}>
                    <div className={ingredStyle.Seeds1}></div>
                    <div className={ingredStyle.Seeds2}></div>
                </div>
            );
            break;
        case ('meat'):
            ingredient = (
                <div className={ingredStyle.Meat}>

                </div>
            );
            break;
        case ('Cheese'):
            ingredient = (
                <div className={ingredStyle.Cheese}>

                </div>
            );
            break;
        case ('Salad'):
            ingredient = (
                ingredient = <div className={ingredStyle.Salad}>

                </div>
            );
            break;
        case ('Bacon'):
            ingredient = (
                ingredient = <div className={ingredStyle.Bacon}>

                </div>
            );
            break;
        default:
            ingredient = null;
            

    }
    return ingredient;
    }
}


BurgerIngredient.propTypes={
    types: propTypes.string.isRequired
};

export default BurgerIngredient;