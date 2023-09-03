import { useState, useEffect, useRef } from "react";

import './Popup.css';
import success from '../../images/success.svg';
import failed from '../..//images/failed.svg';

function Popup({ isOpen, setIsOpen, submitError = true }) {
  const esc = 'Escape';
  const [errorText, setErrorText] = useState(''),
        [popupPic, setPopupPic] = useState(''),
        [altText, setAltText] = useState('');
  const popup = useRef();

  function handleButtonClose() {
    setIsOpen(false);
  };

  function handleCloseByOverlay(evt) {
    if (evt.target === popup.current) {
      setIsOpen(false);
    }
  };

  //Close popup by Esc
  useEffect(() => {
    function closePopupByEsc(evt) {
      if (evt.key === esc) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', closePopupByEsc);
    }

    return () => {
      document.removeEventListener('keydown', closePopupByEsc);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!submitError) {
      setErrorText('Профиль успешно обновлён!');
      setPopupPic(success);
      setAltText('Успех!');
    }
    else {
      setErrorText('Что-то пошло не так! Попробуйте ещё раз.');
      setPopupPic(failed);
      setAltText('Ошибка.');
    }
  }, [submitError]);

  return (
    <div
      className={ `popup ${ isOpen ? 'popup_opened' : '' }` }
      onClick={ handleCloseByOverlay }
      ref={ popup }
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Кнопка закрытия формы"
          onClick={ handleButtonClose }
        />
        <div className="tooltip popup__form">
          <img className="popup__pic" src={ popupPic } alt={ altText } />
          <p className="popup__text">
            { errorText }
          </p>
        </div>
      </div>
    </div>
  )
}

export default Popup;
