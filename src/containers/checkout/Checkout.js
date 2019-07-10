import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/checkoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../contact_data/ContactData';


class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice:0
    }

    componentWillMount() {
        console.log('[Checkout] routing props', this.props);
        const query = new URLSearchParams(this.props.location.search);
        const newingredients = {};
        let price =0;
        for (let param of query.entries()) {
            if(param[0]==='price')
            {
                price=param[1];
            }
            else{
                newingredients[param[0]] = +param[1];
            }
            
        }
        this.setState({ ingredients: newingredients, totalPrice:price})
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkOutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkOutContinueHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} />
            </div>
        );
    }
}

export default Checkout;