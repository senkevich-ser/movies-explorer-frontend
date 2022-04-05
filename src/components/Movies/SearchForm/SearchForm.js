import React from 'react';
import './SearchForm.css';

function SearchForm() {

  return (
    <div className="search">

      <form name='search-form'
        className='search__form search__box'
      >
        <fieldset className="search__input-box search__box">
          <input
            type="text"
            id="search-input" name="search-input"
            className="search__input search__box"
            placeholder="Фильм"
          />

        </fieldset>

        <fieldset className="search__switch-box search__box">
          <div className="search__line search__box" />

          <p className="search__switch-name search__box">
            Короткометражки
          </p>
        </fieldset>
      </form>

      <p className="search__input_error search__box">
      </p>
    </div>
  );
}

export default SearchForm;