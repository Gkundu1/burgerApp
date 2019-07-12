import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-config';

export const addIngredient=(ingName)=>{
    return{
        type:actionTypes.ADDINGREDIENT,
        ingredientName:ingName
    };
};

export const removeIngredient=(ingName)=>{
    return{
        type:actionTypes.REMOVEINGREDIENT,
        ingredientName:ingName
    };
};

export const setIngredients=(ingredients)=>{
    return{
        type:actionTypes.INITINGREDIENT,
        ingredients:ingredients
    };
};

export const fetchIngredientFailed=()=>{
    console.log('dispatching action ',actionTypes.FETCHINGREDIENTFAILED);
    return{
        type:actionTypes.FETCHINGREDIENTFAILED
    };

};

export const initIngredientAsync=()=>{
    return dispatch=>{
        axios.get('ingredients.json')
        .then(response => {
            console.log('[BurgerBuilder] server ingredient',response.data);
            if(response.data!==null)
            {
                dispatch(setIngredients(response.data));
            }
            else{
                dispatch(fetchIngredientFailed());
            }
            // this.setState({ ingredients: response.data});
            // this.calculateTotalPriceForBurger();
        })
        .catch(error=>{
            console.log('fetch ingredient api calling',error);
            dispatch(fetchIngredientFailed());
            // this.setState({error:true});
        });
    };
};