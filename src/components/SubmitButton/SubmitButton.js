import React from 'react';
import Button from '../Button/Button';
import './SubmitButton.css';

const SubmitButton = ({ submitDisabled, children }) => (
  <Button
    type="submit"
    userClass="submit-btn"
    disabled={submitDisabled}
  >
    {children}
  </Button>
);

export default SubmitButton;
