import React, { Component } from 'react';
import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-config';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const INGREDIENT_PRICES = {
    Salad: 5,
    Cheese: 3,
    meat: 4,
    Bacon: 5.5
};

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount() {
        console.log('[BurgerBuilder] routing props',this.props);
        this.props.onInitIngredientsHandler();
    }

    calculateTotalPriceForBurger=()=>{
        let ingredientArry=Object.keys(this.state.ingredients);
        let priceAddition=0
        let newPrice=0
        newPrice = this.state.totalPrice;
        for(var item in ingredientArry)
        {
            priceAddition = INGREDIENT_PRICES[ingredientArry[item]]*this.state.ingredients[ingredientArry[item]];
            newPrice = newPrice + priceAddition;
        }

        this.setState({totalPrice: newPrice });
    }

    purchasedHandler = () => {
        this.setState({ purchasing: true });
    }

    updatePurchaseStateHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            }).reduce((newSum, el) => {
                return newSum + el;
            }, 0);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredient[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
    //     this.updatePurchaseStateHandler(updatedIngredient);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredient[type] = updatedCount;
    //     const priceRemoved = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceRemoved;
    //     this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
    //     this.updatePurchaseStateHandler(updatedIngredient);
    // }

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false });
    }

    placeOrderHandler = () => {
        //alert("Your Order Placed Successfully!!");
            // const ingrdientsQuery=[];
            // for(let i in this.state.ingredients)
            // {
            //     ingrdientsQuery.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
            // }
            // ingrdientsQuery.push('price='+this.state.totalPrice);
            // const queryString=ingrdientsQuery.join('&');
            // this.props.history.push({
            //     pathname:'/checkout',
            //     search:'?'+queryString
            // });
            this.props.onInitPurchasedHandler();
            this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {
            ...this.props.burgerIngredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary=null;
        let burger =  this.props.error?<p>Ingredient can't be loaded</p>:<Spinner/>;
        if(this.props.burgerIngredients)
        {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.burgerIngredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAddedHandler}
                        ingredientRemoved={this.props.onIngredientRemovedHandler}
                        disabled={disableInfo}
                        price={this.props.burgerPrice}
                        purchaseable={this.updatePurchaseStateHandler(this.props.burgerIngredients)}
                        checkout={this.purchasedHandler} />
                </Aux>
            );

            orderSummary = (<OrderSummary
                burgerPrice={this.props.burgerPrice}
                cancelOrder={this.cancelPurchaseHandler}
                placeOrder={this.placeOrderHandler}
                ingrdients={this.props.burgerIngredients} />);
        }
        // if (this.state.loading) {
        //     orderSummary = (<Spinner />);
        // }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        burgerIngredients:state.burgerBuilder.ingredients,
        burgerPrice:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
        onIngredientAddedHandler:(igName)=>dispatch(actions.addIngredient(igName)),
        onIngredientRemovedHandler:(igName)=>dispatch(actions.removeIngredient(igName)),
        onInitIngredientsHandler:()=>dispatch(actions.initIngredientAsync()),
        onInitPurchasedHandler:()=>dispatch(actions.purchaseInit())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));