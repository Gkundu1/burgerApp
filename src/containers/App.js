import React, { Component } from 'react';
import Layout from '../components/Layout/Layout';
import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
//import Checkout from '../containers/checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
//import Orders from '../containers/Orders/Orders';
//import Auth from '../containers/Auth/Auth';
import Logout from '../containers/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import asyncComponent from '../hoc/AsyncComponent/asyncComponent';

const asyncCheckout=asyncComponent(()=>{
  return import('../containers/checkout/Checkout')
})
const asyncOrders=asyncComponent(()=>{
  return import('../containers/Orders/Orders')
})
const asyncAuth=asyncComponent(()=>{
  return import('../containers/Auth/Auth')
})

class App extends Component {



  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isUserLogIn) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUserLogIn: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
