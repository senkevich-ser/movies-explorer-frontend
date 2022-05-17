import React from 'react';
import './RoundCheckBox.css';

function RoundCheckBox(props) {
  const handleChange = () => {
    props.onChange(props.movieId);
  };
  return (
    <label className="round-btn">
      <input
        className="round-btn__input"
        type="checkbox"
        checked={props.isChecked || false}
        onChange={handleChange}
      />

      <span className="round-btn__checkmark" />
    </label>
  );
}

export default RoundCheckBox;
