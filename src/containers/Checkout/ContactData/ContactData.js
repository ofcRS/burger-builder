import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';

import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        inputType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        inputType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        inputType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zip: {
        inputType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 7
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        inputType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: '',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, elementId) => {
    const updatedOrderForm = { ...this.state.orderForm };
    updatedOrderForm[elementId].value = event.target.value;
    updatedOrderForm[elementId].valid = this.checkValidity(updatedOrderForm[elementId].value, updatedOrderForm[elementId].validation);
    updatedOrderForm[elementId].touched = true;

    let formIsValid = true;
    for (let elementKey in updatedOrderForm) {
      if (!updatedOrderForm[elementKey].valid && formIsValid) {
        formIsValid = false
      }
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    })
  };

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};

    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };

    this.props.onBurgerPurchase(order)
  };

  render() {
    const formElementArray = Array.from(Object.keys(this.state.orderForm)).map(data => {
        return {
          id: data,
          config: this.state.orderForm[data]
        }
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map( formElement => {
          return (
            <Input
              key={formElement.id}
              elementName={formElement.id}
              elementConfig={formElement.config.elementConfig}
              elementType={formElement.config.inputType}
              value={formElement.config.value}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched} />
          )
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.contactData.loading
  }
};

const mapActionToProps = dispatch => {
  return {
    onBurgerPurchase: orderData => dispatch(actions.purchaseBurger(orderData))
  }
};

export default connect(mapStateToProps, mapActionToProps)(ContactData);
