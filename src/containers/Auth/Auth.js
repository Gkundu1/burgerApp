import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import style from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

 class Auth extends Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Your Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        errorMessage: "*Email is required"
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter Your Password"
        },
        value: "",
        validation: {
          required: true,
          minlength: 6
        },
        valid: false,
        touched: false,
        errorMessage: "*Password is required"
      }
    },
    isSignup:true
  };

  componentDidMount(){
    if(!this.props.burgerReady&&this.props.authRedirectPath!=='/')
    {
      this.props.onSetAuthRedirectPath();
    }
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {   
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

inputChangedHandler=(event,controlName)=>{
        const updateLoginForm={
            ...this.state.loginForm,
            [controlName]:{
                ...this.state.loginForm[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.loginForm[controlName].validation),
                touched:true
            }
        };
        this.setState({loginForm:updateLoginForm});
}

submitAuthHandler=(event)=>{
    event.preventDefault();
    this.props.onAuthHandler(this.state.loginForm.email.value,this.state.loginForm.password.value,this.state.isSignup);
}

switchAuthModeHandler=()=>{
  this.setState(prevState=>{
    return{isSignup:!prevState.isSignup};
  })
}

  render() {
    const loginelements = [];
    for (let key in this.state.loginForm) {
        loginelements.push({
        id: key,
        config: this.state.loginForm[key]
      });
    }
    let form = loginelements.map(formElem => (
      <Input
        key={formElem.id}
        elementType={formElem.config.elementType}
        elementConfig={formElem.config.elementConfig}
        value={formElem.config.value}
        changed={event => this.inputChangedHandler(event, formElem.id)}
        invalid={!formElem.config.valid}
        shouldValidate={formElem.config.validation}
        touched={formElem.config.touched}
        errorMessage={formElem.config.errorMessage}
      />
    ));

    if(this.props.loading)
    {
      form=<Spinner/>
    }
    let errorMesg=null;
    if(this.props.error)
    {
      errorMesg=(
        <p>{this.props.error.message}</p>
      );
    }
    let authRedirect=null;
    if(this.props.isLogin)
    {
      authRedirect=<Redirect to={this.props.authRedirectPath}/>;
    }
    return (
      <div className={style.Auth}>
        {authRedirect}
        {errorMesg}
      <form onSubmit={this.submitAuthHandler}>
      {form}
        <Button buttonType="Success">{this.state.isSignup?'SIGNUP':'LOGIN'}</Button>
      </form>
      <Button buttonType="Danger" clicked={this.switchAuthModeHandler} >SWITCH TO {this.state.isSignup?'LOGIN':'SIGNUP'}</Button>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
    return{
      loading:state.auth.loading,
      error:state.auth.error,
      isLogin:state.auth.token!==null,
      burgerReady:state.burgerBuilder.burgerReady,
      authRedirectPath:state.auth.authRedirectPath    
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
        onAuthHandler:(email,password,isSignUp)=>dispatch(actions.authenticateAsync(email,password,isSignUp)),
        onSetAuthRedirectPath:()=>dispatch(actions.seAuthRedirectPath("/"))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
