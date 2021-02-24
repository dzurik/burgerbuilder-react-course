import { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.module.scss';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: this.orderFormHelper(
        'Please enter a valid name',
        'input',
        'text',
        'Your Name',
        ''
      ),
      street: this.orderFormHelper(
        'Please enter a valid street',
        'input',
        'text',
        'Street',
        ''
      ),
      zipCode: this.orderFormHelper(
        'Please enter a valid zip code',
        'input',
        'text',
        'ZIP Code',
        '',
        4,
        4,
        true
      ),
      country: this.orderFormHelper(
        'Please enter a valid email country',
        'input',
        'text',
        'Country',
        ''
      ),
      email: this.orderFormHelper(
        'Please enter a valid email address',
        'input',
        'email',
        'Your E-Mail',
        '',
        null,
        null,
        null,
        true
      ),
      deliveryMethod: this.orderFormHelper(
        '',
        'select',

        [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],

        '',
        'fastest'
      ),
    },
    formIsValid: false,
  };

  /* prettier-ignore */
  orderFormHelper(errorMessage, elementType, type, placeholder, value, minLength, maxLength, isNumeric, isEmail
  ) {

    let obj;

    if (placeholder === '') {
      obj = {
        elementType: elementType,
        elementConfig: {
          options: type,
        },
        value: value,
        validation: {},
        valid: true,
      };
    }

    if (placeholder !== '') {
      obj = {
        elementType: elementType,
        elementConfig: {
          type: type,
          placeholder: placeholder,
        },
        value: value,
        validation: {
          required: true,
          minLength: minLength,
          maxLength: maxLength,
          isNumeric: isNumeric,
          isEmail: isEmail,
        },
        errorMessage: errorMessage,
        valid: false,
        touched: false,
      };
    }


    return obj;
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    Object.keys(this.state.orderForm).forEach((formElIdent) => {
      formData[formElIdent] = this.state.orderForm[formElIdent].value;
    });

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.orderForm[inputIdentifier].validation
      ),
      touched: true,
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;

    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              errorMessage={formElement.config.errorMessage}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
