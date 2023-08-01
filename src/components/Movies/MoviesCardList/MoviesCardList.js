import { useState, useEffect } from 'react';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ cardsData, isCardDelete, handleCardDelete, isCardsButton = true }) {

  const [isPreloader, setPreloader] = useState(true);

  const cards = cardsData.map((card) => (
    <li className="cards__item" key={ card._id }>
      <MoviesCard
        card={ card }
        isCardDelete={ isCardDelete }
        handleCardDelete={ handleCardDelete }
      />
    </li>
  ));


  useEffect(() => {

    if (cards.length === 0 ) {
      setPreloader(true);
    }

    else {
      setPreloader(false);
    }

  }, [cards]);



  return (
    <section className="cards">
      { isPreloader ?

        (<>
          <Preloader />
        </>)

        :

        (<>
          <ul className="cards__list">
            { cards }
          </ul>
        </>)

      }

      {isCardsButton &&
        <button
          className="cards__button"
          name="cardsButton"
          id="cards-button"
          type="button"
        >
          Ещё
        </button>
      }

    </section>
  )
};

export default MoviesCardList;
