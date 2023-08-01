import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './AuthForm.css';

import Logo from '../Logo/Logo';

function Auth({ isSignIn, handleLoggedIn }) {

  const [isFormError, setFormError] = useState(false);

  function handleSignIn(evt) {
    evt.preventDefault();
    handleLoggedIn();
  };

  function handleSignUp(evt) {
    evt.preventDefault();
    setFormError(true);
  };

  // Clear submit button error style
  function handlePathChange() {
    console.log(isSignIn)
    if ( !isSignIn ) {
      setFormError(false);
    }
  }

  function handleChange() {
    setFormError(false);
  }




  return (
    <div className="auth">

      <Logo classForAuth={ true } />

      <h1 className="auth__title">{ isSignIn ? 'Рады видеть!' : 'Добро пожаловать!' }</h1>

      <form
        className="auth__form"
        name="authForm"
        noValidate
      >

        <div className="auth__fields">

          { /* Field only for registration page */ }
          { !isSignIn &&
            (<>
              <p className="auth__field-text">Имя</p><label className="auth__label">
              <input
                className="auth__field"
                id="auth_field-name"
                name="authFieldName"
                type="text"
                onChange={ handleChange }
              />
              </label>
            </>)
          }

          <p className="auth__field-text">E-mail</p>
          <label className="auth__label">
            <input
              className="auth__field"
              id="auth_field-email"
              name="authFieldEmail"
              type="email"
              onChange={ handleChange }
            />
          </label>

          <p className="auth__field-text">Пароль</p>
          <label className="auth__label">
            <input
              className={ `auth__field ${ isFormError ? 'auth__field_error' : '' }` }
              id="auth_field-password"
              name="authFieldPassword"
              type="password"
              onChange={ handleChange }
              minLength={ 8 }
            />

            { /* Form error text */ }
            <span className="auth__error-text">
              { isFormError && 'Что-то пошло не так...' }
            </span>

          </label>
        </div>

        <div className="auth__buttons">

          { /* Submit button changes function and text depending of the page */ }
          <button
            className={ `auth__submit-button ${ isFormError ? 'auth__submit-button_error' : '' }` }
            name="authFormSubmit"
            type="button"
            onClick={ isSignIn ? handleSignIn : handleSignUp }
          >
            { isSignIn ? 'Войти' : 'Зарегистрироваться' }
          </button>

          <p className="auth__text">
            { isSignIn ? 'Ещё не зарегистрированы?' : 'Уже зарегистрированы?' }
          </p>

          <Link
            className="auth__link"
            onClick={ handlePathChange }
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

export default Auth;
