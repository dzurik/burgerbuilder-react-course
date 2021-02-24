import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './ContactData.module.scss';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = (props) => {
  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });

  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });

  const loading = useSelector((state) => {
    return state.order.loading;
  });

  const token = useSelector((state) => {
    return state.auth.token;
  });

  const userId = useSelector((state) => {
    return state.auth.userId;
  });

  const dispatch = useDispatch();

  const onOrderBurger = (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token));

  /* prettier-ignore */
  const orderFormHelper = (errorMessage, elementType, type, placeholder, value, minLength, maxLength, isNumeric, isEmail
  ) =>{

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

  const [orderForm, setOrderForm] = useState({
    name: orderFormHelper('Please enter a valid name', 'input', 'text', 'Your Name', ''),
    street: orderFormHelper('Please enter a valid street', 'input', 'text', 'Street', ''),
    zipCode: orderFormHelper(
      'Please enter a valid zip code',
      'input',
      'text',
      'ZIP Code',
      '',
      4,
      4,
      true
    ),
    country: orderFormHelper(
      'Please enter a valid email country',
      'input',
      'text',
      'Country',
      ''
    ),
    email: orderFormHelper(
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
    deliveryMethod: orderFormHelper(
      '',
      'select',

      [
        { value: 'fastest', displayValue: 'Fastest' },
        { value: 'cheapest', displayValue: 'Cheapest' },
      ],

      '',
      'fastest'
    ),
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    Object.keys(orderForm).forEach((formElIdent) => {
      formData[formElIdent] = orderForm[formElIdent].value;
    });

    const order = {
      ingredients: ings,
      price: price,
      orderData: formData,
      userId: userId,
    };

    onOrderBurger(order, token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
      touched: true,
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;

    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
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
            changed={(event) => inputChangedHandler(event, formElement.id)}
          />
        );
      })}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

export default withErrorHandler(ContactData, axios);
