import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/checkoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../contact_data/ContactData";
import { connect } from "react-redux";


class Checkout extends Component {
  // componentWillMount() {
  //     console.log('[Checkout] routing props', this.props);
  //     const query = new URLSearchParams(this.props.location.search);
  //     const newingredients = {};
  //     let price =0;
  //     for (let param of query.entries()) {
  //         if(param[0]==='price')
  //         {
  //             price=param[1];
  //         }
  //         else{
  //             newingredients[param[0]] = +param[1];
  //         }

  //     }
  //     this.setState({ ingredients: newingredients, totalPrice:price})
  // }

  // componentWillMount() {
  //   this.props.onInitPurchase();
  // }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkOutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.burgerIngredients) {
      const purchaseRedirect=this.props.purchased?<Redirect to="/" />:null;
      summary = (
        <div>
        {purchaseRedirect}
          <CheckoutSummary
            ingredients={this.props.burgerIngredients}
            checkoutCancel={this.checkoutCancelHandler}
            checkoutContinue={this.checkOutContinueHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            //render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.props.price} {...props}/>)} />
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    burgerIngredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased:state.order.purchased
  };
};

// const mapDispatchToProps=dispatch=>{
//   return{
//       onInitPurchase:()=>dispatch(actions.purchaseInit())
//   };
// };

export default connect(mapStateToProps)(Checkout);
