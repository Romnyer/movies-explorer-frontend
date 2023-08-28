import { useState, useEffect } from 'react';

import './SearchForm.css';

function SearchForm({ handleMovieSubmit, isMovieSearched = false, setShortFilm }) {

  const [filmSearch, setFilmSearch] = useState(''),
        [isChecked, setChecked] = useState(false),
        [isEmptySearch, setEmptySearch] = useState(false);

  const savedSearchParams = localStorage.getItem('searchParams');

  function handleFilmSearch(evt) {
    setFilmSearch(evt.target.value);
  };

  function handleChecked() {
    // Save local check state
    const newCheckParametr = JSON.parse(savedSearchParams);
    newCheckParametr.checked = !isChecked;
    localStorage.setItem('searchParams', JSON.stringify(newCheckParametr));

    setChecked(!isChecked);
    setShortFilm(!isChecked);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    if (filmSearch.length === 0) {
      return setEmptySearch(true);
    }
    else {
      setEmptySearch(false);
    };

    handleMovieSubmit(
      evt.target['1'].value,
      evt.target['3'].checked
    );
  };

  useEffect(() => {
    if (isMovieSearched) {
      const searchParams = JSON.parse(savedSearchParams);

      if (searchParams) {
        setFilmSearch(searchParams.value);
        setChecked(searchParams.checked);
      };
    };
  }, []);



  return (
    <form
      className="search"
      onSubmit={ handleSubmit }
    >
      <fieldset
        className="search__form"
      >
        <input
          className="search__field"
          name="searchField"
          id="search-field"
          value={ filmSearch || '' }
          onChange={ handleFilmSearch }
          type="text"
          placeholder="Фильм"
        />

        <button
          className="search__submit"
          name="searchSubmitButton"
          id="search-submitbutton"
          type="submit"
        >
          Найти
        </button>
      </fieldset>

      <p className="search__error-text">{ isEmptySearch && "Нужно ввести ключевое слово" }</p>

      <div className="search__container">
        <label className="search__label">
          <input
            className="search__checkbox"
            name="searchCheckbox"
            id="search-checkbox"
            checked={ isChecked || '' }
            onChange={ handleChecked }
            type="checkbox"
          />
        </label>

        <p className="search__text">Короткометражки</p>
      </div>

    </form>
  )
};

export default SearchForm;
