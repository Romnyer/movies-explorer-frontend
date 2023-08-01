import './SearchForm.css';

function SearchForm() {

  const handleSearch = function(evt) {
    evt.preventDefault();
  };



  return (
    <div className="search">
      <form className="search__form">
        <input
          className="search__field"
          name="searchField"
          id="search-field"
          type="text"
          placeholder="Фильм"
        />

        <button
          className="search__submit"
          name="searchSubmitButton"
          id="search-submitbutton"
          type="submit"
          onClick={ handleSearch }
        >
          Найти
        </button>
      </form>

      <div className="search__container">
        <label className="search__label">
          <input
            className="search__checkbox"
            name="searchCheckbox"
            id="search-checkbox"
            type="checkbox"
          />
        </label>

        <p className="search__text">Короткометражки</p>
      </div>

    </div>
  )
};

export default SearchForm;
