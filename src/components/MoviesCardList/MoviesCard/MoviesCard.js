import { useState, useEffect, useContext } from 'react';

import './MoviesCard.css';

import { calcDuration } from '../../../utils/utils';
import { SavedMoviesContext } from '../../../contexts/SavedMoviesContext';
import { mainApi } from '../../../utils/MainApi';

function MoviesCard({ card, isCardDelete = false }) {

  const [isCardSaved, setCardSaved] = useState(false),
        [buttonClass, setButtonClass] = useState('');

  const { storedMovies, setStoredMovies } = useContext(SavedMoviesContext);
  const moviesUrl = 'https://api.nomoreparties.co/';
  const duration = calcDuration(card.duration);

  function handleSave() {
    const movieData = {
      ...card,
      movieId: card.id,
      image: `${moviesUrl}${card.image.url}`,
      thumbnail: `${moviesUrl}${card.image.formats.thumbnail.url}`,
    };
    delete movieData.id;
    delete movieData.created_at;
    delete movieData.updated_at;

    mainApi.likeCard(movieData)
      .then((movie) => {
        setCardSaved(!isCardSaved);
        setStoredMovies((state) => ([...state, movie]));

      })
      .catch((err) => console.log(err.message));
  };

  function handleDelete() {
    const savedMovie = storedMovies.find((movie) => movie.movieId === card.id);
    const movieForDelete = isCardDelete ? card : savedMovie;

    mainApi.dislikeCard(movieForDelete._id)
      .then((movie) => {
        setCardSaved(!isCardSaved);
        setStoredMovies((state) => state.filter((m) => m._id !== movie._id));

      })
      .catch((err) => console.log(err.message));
  };


  useEffect(() => {
    if (isCardDelete) {
      setButtonClass('card__button_for_delete');
      setCardSaved(true);
    }
    else {
      setButtonClass('card__button_for_save');
      setCardSaved(false);
    };
  }, [isCardDelete]);

  useEffect(() => {
    const isMovieSaved = storedMovies.some((movie) => {
      return movie.movieId === card.id;
    });

    if (isMovieSaved && !isCardDelete) {
      setCardSaved(true);
      setButtonClass('card__button_for_save');
    }
  }, []);



  return (
    <article className="card">

      <div className="card__container">
        <h3 className="card__title">{ card.nameRU }</h3>
        <p className="card__time">{ duration }</p>
      </div>

      <a
        className="card__link"
        href={ card.trailerLink }
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__pic"
          src={ isCardDelete ? card.image : `${ moviesUrl }${ card.image.url }` }
          alt={ card.nameRU }
        />
      </a>

      <button
        className={ `card__button ${ isCardSaved ? buttonClass : '' }` }
        type="button"
        name="cardButton"
        onClick={ isCardSaved ? handleDelete : handleSave }
      >
        { !isCardSaved && 'Сохранить' }
      </button>

    </article>
  )
};

export default MoviesCard;
