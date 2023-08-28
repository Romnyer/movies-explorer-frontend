import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

function Profile({ handleLogout, profileName, profileEmail }) {

  const [userName, setUserName] = useState(profileName),
        [userEmail, setUserEmail] = useState(profileEmail),
        [isEditing, setEditing] = useState(false),
        [isError, setError] = useState(false);

  const profileInput = useRef();


  function handleNameChange(evt) {
    setUserName(evt.target.value);
    setError(false);
  };

  function handleEmailChange(evt) {
    setUserEmail(evt.target.value);
    setError(false);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    setEditing(false);
  };

  function handleError() {
    setError(true);
  }

  function handleEditing() {
    setEditing(true);
    profileInput.current.focus();
  }

  function handleStopEditing() {
    setUserName(profileName);
    setUserEmail(profileEmail);
    setEditing(false);
    setError(false);
  }

  function logout() {
    handleLogout();
  };


  useEffect(() => {
    if (userName !== profileName || userEmail !== profileEmail) {
      setEditing(true);
    }
  }, [userName, userEmail]);



  return (
    <div className="profile">

      <h1 className="profile__title">{ `Привет, ${ profileName }!` }</h1>

      <form
        className="profile__form"
        name="profile__form"
        noValidate
        onSubmit={ handleSubmit }

      >
        <div className="profile__container">
          <p className="profile__text">Имя</p>
          <input
            className="profile__input"
            id="profile_field-name"
            name="profileName"
            type="text"
            value={ userName || '' }
            ref={ profileInput }
            disabled={ !isEditing }
            onChange={ handleNameChange }
            minLength={ 2 }
            maxLength={ 30 }
          />

          <div className="profile__line" />

          <p className="profile__text">E-mail</p>
          <input
            className="profile__input"
            id="profile_field-email"
            name="profileEmail"
            type="email"
            value={ userEmail || '' }
            disabled={ !isEditing }
            onChange={ handleEmailChange }
            minLength={ 2 }
            maxLength={ 30 }
          />
        </div>

        { /*
          If inputs value is not changing – default view
          Else – submit button view
        */ }
        <div className="profile__buttons">
          <span className="profile__error-text">
            {isError && 'При обновлении профиля произошла ошибка.' }
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
                className={ `profile__submit-button ${ isError ? 'profile__submit-button_error' : '' }` }
                type="button"
                name="profileSubmitButton"
                disabled={ isError }
                onClick={ handleError }
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
