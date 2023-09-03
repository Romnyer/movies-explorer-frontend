import { useState, useEffect } from 'react';

import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import moviesApi from '../../utils/MoviesApi';

function Movies() {

  const [allCards, setAllCards] = useState([]),
        [isPreloader, setPreloader] = useState(false),
        [isGetFilmsError, setGetFilmsError] = useState(false),
        [request, setRequest] = useState(''),
        [isShortFilm, setShortFilm] = useState(false);


  // Get films
  function getFilms() {
    setPreloader(true);
    setGetFilmsError(false);
    const storedMovies = JSON.parse(localStorage.getItem('movies'));

    if (storedMovies) {
      setAllCards(storedMovies);
      setPreloader(false);
      return;
    }

    else {
      moviesApi.getMovies()
      .then((cardsData) => {
        setAllCards(cardsData);
        localStorage.setItem('movies', JSON.stringify(cardsData));
      })
      .catch((err) => {
        console.log(err.message);
        setGetFilmsError(true);
      })
      .finally(() => setPreloader(false))
    };
  };

  // Set and save search parameters
  function handleMovieSubmit(value, checked) {
    getFilms();

    setRequest(value);
    setShortFilm(checked);

    localStorage.setItem('searchParams', JSON.stringify({ value, checked }));
  };


  // Show already searched movies
  useEffect(() => {
    const storedMovies = localStorage.getItem('searchedMovies');

    if (storedMovies) {
      setAllCards(JSON.parse(storedMovies));
    };
  }, []);



  return (
    <>
      <SearchForm
        handleMovieSubmit={ handleMovieSubmit }
        isMovieSearched = { true }
        setShortFilm={ setShortFilm }
      />
      <MoviesCardList
        cardsData={ allCards }
        isCardDelete={ false }
        isPreloader = { isPreloader }
        request = { request }
        isShortFilm = { isShortFilm }
        isGetFilmsError = { isGetFilmsError }
        saveSearchData={ true }
      />
    </>
  )
};

export default Movies;
