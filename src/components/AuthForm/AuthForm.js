import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './AuthForm.css';

import Logo from '../Logo/Logo';

import { useFormWithValidation } from '../../hooks/useFormValidation';
import { setCustomNameValidError, setCustomEmailValidError, setErrorText } from '../../utils/utils';

function AuthForm({ isSignIn, handleSubmit, preloader, submitError }) {

  const [submitErrorText, setSubmitErrorText] = useState(false);

  const {
    values,
    handleChange,
    errors,
    isValid
  } = useFormWithValidation();


  function handleNameChange(evt) {
    setCustomNameValidError(evt);
  };

  function handleEmailChange(evt) {
    setCustomEmailValidError(evt);
  };

  function handleFormSubmit(evt) {
    evt.preventDefault();
    handleSubmit(values);
  };


  useEffect(() => {
    setSubmitErrorText(setErrorText(submitError));
  }, [submitError]);

  useEffect(() => {
    setSubmitErrorText('');
  }, [isSignIn]);



  return (
    <div className="auth">

      <Logo classForAuth={ true } />

      <h1 className="auth__title">{ isSignIn ? 'Рады видеть!' : 'Добро пожаловать!' }</h1>

      <form
        className="auth__form"
        name="authForm"
        onChange={ handleChange }
        onSubmit={ handleFormSubmit }
        noValidate
      >

        <div className="auth__fields">

          { /* Field only for registration page */ }
          { !isSignIn &&
            (<>
              <p className="auth__field-text">Имя</p>
              <label className="auth__label">
                <input
                  className="auth__field"
                  id="auth_field-name"
                  name="name"
                  type="text"
                  value={ values.name || "" }
                  autoComplete="off"
                  onChange={ handleNameChange }
                  minLength={ 2 }
                  maxLength={ 30 }
                  required
                />

                <span className="auth__error-text">
                  { errors.name }
                </span>
              </label>
            </>)
          }

          <p className="auth__field-text">E-mail</p>
          <label className="auth__label">
            <input
              className="auth__field"
              id="auth_field-email"
              name="email"
              type="email"
              value={ values.email || "" }
              autoComplete="off"
              onChange={ handleEmailChange }
              required
            />

            <span className="auth__error-text">
              { errors.email }
            </span>
          </label>

          <p className="auth__field-text">Пароль</p>
          <label className="auth__label">
            <input
              className="auth__field"
              id="auth_field-password"
              name="password"
              type="password"
              value={ values.password || "" }
              onChange={ handleChange }
              autoComplete="off"
              minLength={ 8 }
              required
            />

            <span className="auth__error-text">
              { errors.password }
            </span>

          </label>
        </div>

        <div className="auth__buttons">

          { /* Submit error text */ }
          <span className="auth__error-text">
            { submitError && submitErrorText }
          </span>

          <button
            className={
              `auth__submit-button
              ${ !isValid ? 'auth__submit-button_error' : '' }
              ${ preloader ? 'auth__submit-button_preloader' : '' }`
            }
            name="authFormSubmit"
            type="submit"
            disabled={!isValid && 'disabled'}
          >
            { isSignIn ? 'Войти' : 'Зарегистрироваться' }
          </button>

          <p className="auth__text">
            { isSignIn ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?' }
          </p>

          <Link
            className="auth__link"
            to={ isSignIn ?
              "/sign-up"
              :
              "/sign-in"
            }
          >
            { isSignIn ? 'Регистрация' : 'Войти' }
          </Link>
        </div>

      </form>
    </div>
  )
};

export default AuthForm;
