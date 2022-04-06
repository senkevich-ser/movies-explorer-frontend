import React from 'react';
import './Form.css';

const Form = ({
  name, title, children, onSubmit,
}) => (
  <form className="form gradual-change" name={name} onSubmit={onSubmit}>
    <h2 className="form__title gradual-change">
      {title}
    </h2>
    {children}
  </form>
);

export default Form;
