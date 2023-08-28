import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormValidation';
import { setCustomNameValidError, setCustomEmailValidError, setErrorText } from '../../utils/utils';
import { mainApi } from '../../utils/MainApi';

function Profile({ handleLogout }) {

  const [isEditing, setEditing] = useState(false),
        [errorCode, setErrorCode] = useState(false),
        [submitErrorText, setSubmitErrorText] = useState(''),
        [validity, setValidity] = useState(false);

  const profileName = useRef(),
        profileEmail = useRef();

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
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
    mainApi.changeUserInfo(values.name, values.email)
      .then((newData) => {
        values.name = newData.name;
        values.email = newData.email;
        setCurrentUser(newData);

        setEditing(false);
        setErrorCode(false);
      })
      .catch((err) => {
        console.log(err.message);
        setErrorCode(err.status);
      });
  };

  function setValues() {
    values.name = currentUser.name;
    values.email = currentUser.email;
  };

  function handleEditing() {
    setEditing(true);
    profileName.current.focus();
    profileEmail.current.focus();
  };

  function handleStopEditing() {
    setValues();
    setEditing(false);
    setErrorCode(false);
    errors.name = '';
    errors.email = '';
  };

  function logout() {
    handleLogout();
  };


  useEffect(() => {
    setValues();
  }, []);

  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setValidity(true);
    }
    else {
      setValidity(!isValid);
    };
  }, [values.name, currentUser.name, values.email, currentUser.email]);

  useEffect(() => {
    setSubmitErrorText(setErrorText(errorCode));
  }, [errorCode]);


  return (
    <div className="profile">

      <h1 className="profile__title">{ `Привет, ${ currentUser.name }!` }</h1>

      <form
        className="profile__form"
        name="profile__form"
        noValidate
        onChange={ handleChange }
        onSubmit={ handleFormSubmit }

      >
        <div className="profile__container">
          <p className="profile__text">Имя</p>
          <input
              className="profile__input"
              id="profile_field-name"
              name="name"
              type="text"
              value={ values.name || "" }
              ref={ profileName }
              disabled={ !isEditing && 'disabled' }
              onChange={ handleNameChange }
              minLength={ 2 }
              maxLength={ 40 }
              required
            />

          <span className="profile__error-text">
            {errors.name}
          </span>

          <div className="profile__line" />

          <p className="profile__text">E-mail</p>
          <input
              className="profile__input"
              id="profile_field-email"
              name="email"
              type="email"
              value={ values.email || "" }
              ref={ profileEmail }
              disabled={ !isEditing && 'disabled' }
              onChange={ handleEmailChange }
              required
            />

          <span className="profile__error-text">
            {errors.email}
          </span>
        </div>

        { /*
          If inputs value is not changing – default view
          Else – submit button view
        */ }
        <div className="profile__buttons">
          <span className="profile__error-text">
            {errorCode && submitErrorText }
          </span>

          { !isEditing ?

            (<>
              <button
                className="profile__button"
                type="button"
                name="profileEditButton"
                onClick={ handleEditing }
              >
                Редактировать
              </button>

              <Link
                className="profile__button profile__button_active"
                to="/"
                onClick={ logout }
              >
                Выйти из аккаунта
              </Link>
            </>)

            :

            (<>

              <button
                className={ `profile__submit-button ${ validity ? 'profile__submit-button_error' : '' }` }
                type="submit"
                name="profileSubmitButton"
                disabled={ validity && 'disabled' }
              >
                Сохранить
              </button>

              <button
                className="profile__button"
                type="button"
                name="profileEditButton"
                onClick={ handleStopEditing }
              >
                Отмена
              </button>
            </>)

          }


        </div>

      </form>

    </div>
  )
};

export default Profile;
