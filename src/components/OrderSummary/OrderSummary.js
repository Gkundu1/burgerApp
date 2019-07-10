import React, { Component } from 'react';
import Aux from '../../hoc/_Aux';
import Button from '../../components/UI/Button/Button';

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingrdients)
        .map(igkey => {
            return <li key={igkey}>
                <span style={{ textTransform: 'capitalize' }}>{igkey}</span>
                : {this.props.ingrdients[igkey]}
            </li>
        });
    
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious Burger with Ingredient is ready</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price:: {this.props.burgerPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button buttonType="Danger" clicked={this.props.cancelOrder}>CANCEL</Button>
                <Button buttonType="Success" clicked={this.props.placeOrder}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;