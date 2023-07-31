import { useState } from 'react';

import './MoviesCard.css';

function MoviesCard({ card, isCardDelete, handleCardDelete }) {

  const [isCardSaved, setCardSaved] = useState(card.saved);
  let buttonClass;


  if (isCardDelete) {
    buttonClass = 'card__button_for_delete';
  }
  else {
    buttonClass = 'card__button_for_save';
  }


  function handleSave() {
    setCardSaved(!isCardSaved);
  };

  function handleDelete() {
    handleCardDelete(card._id);
  };



  return (
    <article className="card">

      <div className="card__container">
        <h3 className="card__title">{ card.title }</h3>
        <p className="card__time">{ card.time }</p>
      </div>

      <img
        className="card__pic"
        src={ card.pic }
        alt="Постер фильма"
      />

      <button
        className={ `card__button ${ isCardSaved ? buttonClass : '' }` }
        type="button"
        name="cardButton"
        onClick={ isCardDelete ? handleDelete : handleSave }
      >
        { !isCardSaved && 'Сохранить' }
      </button>

    </article>
  )
};

export default MoviesCard;
