import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import ContactStyle from './ContactData.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-config';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: '*Name is required'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Address'
                },
                value: '',
                validation: {
                    required: true
                }, valid: false,
                touched: false,
                errorMessage: 'Street Address is required'
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minlength: 6,
                    maxlength: 6
                }, valid: false,
                touched: false,
                errorMessage: 'Postal Code is required'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'COUNTRY'
                },
                value: '',
                validation: {
                    required: true
                }, valid: false,
                touched: false,
                errorMessage: 'Country is required'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your EmailId'
                },
                value: '',
                validation: {
                    required: true
                }, valid: false,
                touched: false,
                errorMessage: 'EmailId is required'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        isFormValid: false
    }

    orderPlacedHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients); 
        this.setState({ loading: true });
        const formData = {};
        for (let formElemIdentifier in this.state.orderForm) {
            formData[formElemIdentifier] = this.state.orderForm[formElemIdentifier].value;
        }
        const orderData = {
            ingrdients: this.props.burgerIngredients,
            orderPrice: 'Rs. ' + this.props.price,
            orderData: formData,
            userdId: this.props.userId
        }

        this.props.onOrderBurger(orderData, this.props.token);

        // axios.post('/orders.json', orderData)
        //     .then(response => {
        //         console.log('[ContactData]', response);
        //         this.setState({ loading: false });
        //         this.props.history.push('/');
        //     }).catch(error => {
        //         console.log('[ContactData]', error);
        //         this.setState({ loading: false });
        //     });
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minlength) {
            isValid = value.length >= rules.minlength && isValid;
        }
        if (rules.maxlength) {
            isValid = value.length <= rules.maxlength && isValid;
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

    inputChangedHandler = (event, inputIdentifier) => {
        //console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let isFormvalid = true;
        for (let inputIdentifier in updatedOrderForm) {
            isFormvalid = updatedOrderForm[inputIdentifier].valid && isFormvalid;
        }
        this.setState({ orderForm: updatedOrderForm, isFormValid: isFormvalid });
    }

    render() {
        const formelements = [];
        for (let key in this.state.orderForm) {
            formelements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderPlacedHandler}>
            {
                formelements.map(formElem => (
                    <Input
                        key={formElem.id}
                        elementType={formElem.config.elementType}
                        elementConfig={formElem.config.elementConfig}
                        value={formElem.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElem.id)}
                        invalid={!formElem.config.valid}
                        shouldValidate={formElem.config.validation}
                        touched={formElem.config.touched}
                        errorMessage={formElem.config.errorMessage} />
                ))
            }
            <Button buttonType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
        </form>);
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={ContactStyle.ContactData}>
                <h4>Enter your contact Details</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        burgerIngredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurgerAsync(orderData, token))
    };

};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));