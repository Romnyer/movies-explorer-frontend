import { useState, useContext } from 'react';

import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';

function SavedMovies() {

  const [request, setRequest] = useState(''),
        [isShortFilm, setShortFilm] = useState(false);

  const { storedMovies } = useContext(SavedMoviesContext);


  function handleSavedMovieSubmit(value, checked) {
    setRequest(value);
    setShortFilm(checked);
  };



  return (
    <>
      <SearchForm handleMovieSubmit={ handleSavedMovieSubmit } />
      <MoviesCardList
        cardsData={ storedMovies }
        isCardDelete={ true }
        request={ request }
        isShortFilm={ isShortFilm }
      />
    </>
  )
};

export default SavedMovies;
