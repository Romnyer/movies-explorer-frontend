import './SavedMovies.css';

import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies({ savedCards, handleCardDelete }) {

  return (
    <>
      <SearchForm />
      <MoviesCardList
        cardsData={ savedCards }
        isCardDelete={ true }
        handleCardDelete={ handleCardDelete }
        isCardsButton = { false }
      />
    </>
  )
};

export default SavedMovies;
