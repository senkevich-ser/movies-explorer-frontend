import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = (props) => (
  <label className="switch">
    <input
      type="checkbox"
      className="switch__input"
      checked={props.isChecked}
      onChange={props.onChange}
      disabled={props.isDisabled}
    />

    <span className="switch__slider" />
  </label>
);

export default FilterCheckbox;
