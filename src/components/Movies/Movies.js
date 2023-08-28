import './Movies.css';

import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({ cards }) {
  return (
    <>
      <SearchForm />
      <MoviesCardList
        cardsData={ cards }
        isCardDelete={ false }
      />
    </>
  )
};

export default Movies;
