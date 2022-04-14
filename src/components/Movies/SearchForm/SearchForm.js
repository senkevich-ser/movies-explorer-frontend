import React, { useEffect, useState } from 'react';
import FilterCheckbox from '../../FilterCheckbox/FilterCheckbox';
import Button from '../../Button/Button';
import { KEY_WORD_ERROR } from '../../../utils/Const';
import './SearchForm.css';

function SearchForm(props) {
  const [searchString, setSearchString] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
  }, [searchString]);

  const handleSwitchChange = () => {
    props.onSwitchChange();
  };

  const handleStringChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchString && !props.savedFilms) {
      setErrorMessage(KEY_WORD_ERROR);
      return;
    }
    props.onSubmit(searchString);
  };
  return (
    <div className="search">

      <form name='search-form'
        className='search__form search__box'
        onSubmit={handleSubmit}
      >
        <fieldset className="search__input-box search__box">
          <input
            type="text"
            id="search-input" name="search-input"
            className="search__input search__box"
            placeholder="Фильм"
            value={searchString} onChange={handleStringChange}
            required
          />
          <Button type="submit" userClass="search__button" />
        </fieldset>
        <fieldset className="search__switch-box search__box">
          <div className="search__line search__box" />
          <FilterCheckbox
            isChecked={props.isSwitchOn || false}
            onChange={handleSwitchChange}
            isDisabled={props.isSwitchDisabled}
          />
          <p className="search__switch-name search__box">
            Короткометражки
          </p>
        </fieldset>
      </form>
      <p className="search__input_error search__box">
        {errorMessage}
      </p>
    </div>
  );
}

export default SearchForm;
