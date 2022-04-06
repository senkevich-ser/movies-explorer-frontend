import React from 'react';
import { Link } from 'react-router-dom';
import SubmitButton from '../SubmitButton/SubmitButton';
import './SubmitGroup.css';

const SubmitGroup = (props) => (
  <fieldset className="submit-group">
    <p className="submit-group__error submit-group__box">
    </p>

    <SubmitButton >
      {props.submitName}
    </SubmitButton>

    <nav className="submit-group__row submit-group__box">
      <span className="submit-group__text submit-group__box submit-group__font">
        {props.children}
      </span>

      <Link
        to={props.linkDestination}
        className="submit-group__link submit-group__box submit-group__font"
      >
        {props.linkName}
      </Link>
    </nav>
  </fieldset>
);

export default SubmitGroup;
