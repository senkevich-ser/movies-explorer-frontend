import React from 'react';
import './Input.css';

const Input = ({
  type, isError, errorText, errorId, children, ...rest
}) => (
  <div className="input input__box">
    <label className="input__label input__box">
      {children}
    </label>

    <input type={type}
      className="input__item input__box"
      {...rest}
    />

    <span
      className={`input__error input__box ${isError ? 'input__error_visible' : ''}`}
      id={errorId}
    >
      {errorText}
    </span>
  </div>
);

export default Input;
