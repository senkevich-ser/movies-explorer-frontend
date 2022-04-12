import React from 'react';
import './RoundCheckBox.css';

function RoundCheckBox() {
  return (
    <label className="round-btn">
      <input
        className="round-btn__input"
        type="checkbox"
      />

      <span className="round-btn__checkmark" />
    </label>
  );
}

export default RoundCheckBox;
