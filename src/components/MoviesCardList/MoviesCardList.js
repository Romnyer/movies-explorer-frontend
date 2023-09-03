import { useState, useEffect } from 'react';

import './MoviesCardList.css';

import MoviesCard from './MoviesCard/MoviesCard';
import Preloader from './Preloader/Preloader';

import { moviesNumber, searchFilms } from '../../utils/utils';

function MoviesCardList({
  cardsData,
  isCardDelete = false,
  isPreloader,
  request,
  isShortFilm = false,
  isGetFilmsError,
  saveSearchData = false
}) {

  const [searchedCards, setSearchedCards] = useState([]),
        [visibleCards, setVisibleCards] = useState([]),
        [isCardsButton, setCardsButton] = useState(false),
        [numberVisibleCards, setNumberVisibleCards] = useState(0),
        [numberAdditionalCards, setNumberAdditionalCards] = useState(0),
        [isSearched, setSearched] = useState(false);

  function handleAddCardsButton() {
    setNumberVisibleCards((state) => state + numberAdditionalCards);
  };

  function handleMoviesNumber(visibleNumber, additionalNumber) {
    setNumberVisibleCards(visibleNumber);
    setNumberAdditionalCards(additionalNumber);
  };

  // Show searched films by request of SearchForm
  useEffect(() => {
    setSearchedCards(cardsData.filter((film) => {
      return searchFilms(film, request, isShortFilm);
    }));
  }, [cardsData, request, isShortFilm]);


  // Set number of visible cards
  useEffect(() => {
    if (!isCardDelete) {
      setVisibleCards(searchedCards.slice(0, numberVisibleCards));
    }
    else {
      setVisibleCards(searchedCards);
    }

    if (searchedCards.length > 0 && saveSearchData) {
      localStorage.setItem('searchedMovies', JSON.stringify(searchedCards));
    }
  }, [searchedCards, numberVisibleCards]);

  // Show empty result after search
  useEffect(() => {
    if (searchedCards.length === 0 && cardsData.length > 0) {
      setSearched(true);

      if(saveSearchData) {
        localStorage.removeItem('searchedMovies');
      };
    }
    else {
      setSearched(false);
    }
  }, [cardsData, searchedCards]);


  // Show or hide more button
  useEffect(() => {
    setCardsButton(searchedCards.length > visibleCards.length);
  }, [searchedCards, visibleCards]);


  // Set number of visible cards depending on width of window
  useEffect(() => {
    const handleNumber = () => moviesNumber(handleMoviesNumber);

    window.addEventListener('resize', handleNumber);
    return () => window.removeEventListener('resize', handleNumber);
  });


  // Set number of visible cards depending on width of window on mounting
  useEffect(() => {
    moviesNumber(handleMoviesNumber, 0);
  }, []);

  return (
    <section className="cards">
      { isPreloader ?

        <Preloader />

        :

        (<>
          { visibleCards.length > 0 ?

            <ul className="cards__list">
              { visibleCards.map((card) => (
                <li className="cards__item" key={ isCardDelete ? card._id : card.id }>
                  <MoviesCard
                    card={ card }
                    isCardDelete={ isCardDelete }
                  />
                </li>
              )) }
            </ul>

            :

            (<>
            { isSearched ?
              <p className="cards__empty-text">
                { !isGetFilmsError ?
                  'Ничего не найдено'
                  :
                  'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
                }
              </p>
              :
              ''
            }
            </>)
          }
        </>)

      }

      {!isCardDelete &&
        <>
          { isCardsButton &&
            <button
              className="cards__button"
              name="cardsButton"
              id="cards-button"
              onClick={ handleAddCardsButton }
              type="button"
            >
              Ещё
            </button>
          }
        </>
      }

    </section>
  )
};

export default MoviesCardList;
