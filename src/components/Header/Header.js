import React from 'react';
import Logo from '../Logo/Logo';
import NavTab from '../Main/NavTab/NavTab';
import './Header.css';

function Header() {
  return (
    <header className="Header">
      <Logo />
      <NavTab />
    </header >
  )
};

export default Header;