import React from 'react';
import './Header.css';
import Logo from '../Logo/Logo';

function Header(props) {
  return (
    <header className="header">
      <Logo />
      {props.children}
    </header >
  );
}

export default Header;
