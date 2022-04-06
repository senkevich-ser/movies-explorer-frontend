import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="menu">
      <div className="menu">
        <NavLink to="/movies"
          className={`menu__link menu__link_film`}
        >
          Фильмы
        </NavLink>

        <NavLink to="/saved-movies"
          className={`menu__link menu__link_film `}
        >
          Сохранённые фильмы
        </NavLink>
      </div>
      <NavLink to="/profile"
        className={`menu__link menu__link_profile`}
      >
        Аккаунт
        <Button userClass={'accaunt__button'} type='button' />
      </NavLink>
      <Button userClass={'menu__button'} type='button' />
    </nav>
  );
}

export default Navigation;
