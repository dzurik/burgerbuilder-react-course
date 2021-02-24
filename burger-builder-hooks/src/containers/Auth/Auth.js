import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Auth.module.scss';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = (props) => {
  const loading = useSelector((state) => {
    return state.auth.loading;
  });

  const error = useSelector((state) => {
    return state.auth.error;
  });

  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  const buildingBurger = useSelector((state) => {
    return state.burgerBuilder.building;
  });

  const authRedirectPath = useSelector((state) => {
    return state.auth.authRedirectPath;
  });

  const dispatch = useDispatch();

  const onAuth = (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup));
  const onSetAuthRedirectPath = useCallback(
    () => dispatch(actions.setAuthRedirectPath('/')),
    [dispatch]
  );

  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const [isSignup, setIsSignup] = useState(true);

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, authForm[controlName].validation),
        touched: true,
      }),
    });

    setAuthForm(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onAuth(authForm.email.value, authForm.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const renderErrorMessage = (error) => {
    let errorMessage;

    if (error !== '') {
      errorMessage = <p>{error}</p>;
    }

    if (error === 'EMAIL_NOT_FOUND') {
      errorMessage = (
        <p>
          There is no user record corresponding to identifier. The user may have been
          deleted.
        </p>
      );
    }

    if (error === 'INVALID_PASSWORD') {
      errorMessage = <p>The password is invalid or the user does not have a password.</p>;
    }

    if (error === 'USER_DISABLED') {
      errorMessage = <p>The user account has been disabled by an administrator.</p>;
    }

    if (error === 'INVALID_EMAIL') {
      errorMessage = <p>The email address is badly formatted.</p>;
    }

    if (error === 'EMAIL_EXISTS') {
      errorMessage = <p>The email address is already in use by another account.</p>;
    }

    if (error === 'OPERATION_NOT_ALLOWED') {
      errorMessage = <p>Password sign-in is disabled for project.</p>;
    }

    if (error === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
      errorMessage = (
        <p>
          We have blocked all requests from device due to unusual activity. Try again
          later
        </p>
      );
    }
    return errorMessage;
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key],
    });
  }

  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (error) {
    errorMessage = renderErrorMessage(error.message);
  }

  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>
  );
};

export default Auth;
