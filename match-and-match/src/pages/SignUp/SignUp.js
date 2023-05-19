import React, { useState, useReducer, useRef,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Card from '../../components/UI/Card/Card';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './SignUp.module.css';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const textReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      return { value: action.val, isValid: action.val.trim().length >= 1 };
    }
    if (action.type === 'INPUT_BLUR') {
      return { value: state.value, isValid: state.value.trim().length >= 1 };
    }
    return { value: '', isValid: false };
  };

const SignUp = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [firstNameState, dispatchFirstName] = useReducer(textReducer, {
    value: '',
    isValid: null,
  });
  const [lastNameState, dispatchLastName] = useReducer(textReducer, {
    value: '',
    isValid: null,
  });
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const navigate = useNavigate();

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();


  const { isValid: firstNameIsValid } = firstNameState;
  const { isValid: lastNameIsValid } = lastNameState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        firstNameIsValid &&
        lastNameIsValid &&
        emailIsValid &&
        passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [firstNameIsValid, lastNameIsValid, emailIsValid, passwordIsValid]);

  const firstNameChangeHandler = (event) => {
    dispatchFirstName({ type: 'USER_INPUT', val: event.target.value });
  };

  const lastNameChangeHandler = (event) => {
    dispatchLastName({ type: 'USER_INPUT', val: event.target.value });
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateFirstNameHandler = () => {
    dispatchFirstName({ type: 'INPUT_BLUR' });
  };

  const validateLastNameHandler = () => {
    dispatchLastName({ type: 'INPUT_BLUR' });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      // Perform form submission logic
      navigate('/');
    } else {
      if (!firstNameIsValid) {
        firstNameInputRef.current.focus();
      } else if (!lastNameIsValid) {
        lastNameInputRef.current.focus();
      } else if (!emailIsValid) {
        emailInputRef.current.focus();
      } else {
        passwordInputRef.current.focus();
      }
    }
  };

  return (
    <Card className={classes.signup}>
      <form onSubmit={submitHandler}>
        <Input
          ref={firstNameInputRef}
          id="firstName"
          label="First Name"
          type="text"
          isValid={firstNameIsValid}
          value={firstNameState.value}
          onChange={firstNameChangeHandler}
          onBlur={validateFirstNameHandler}
        />
        <Input
          ref={lastNameInputRef}
          id="lastName"
          label="Last Name"
          type="text"
          isValid={lastNameIsValid}
          value={lastNameState.value}
          onChange={lastNameChangeHandler}
          onBlur={validateLastNameHandler}
        />
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit">Sign Up</Button>
          <Link to="/">Already have an account? Login</Link>
        </div>
      </form>
    </Card>
  );
};

export default SignUp;
