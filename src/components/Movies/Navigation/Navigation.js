import React from 'react';
import { NavLink } from 'react-router-dom';
/* import Button from '../Button/Button'; */
import './Navigation.css';

function Navigation() {

  return (
    <nav className="menu">
      <NavLink to="/movies"
        className={`menu__link menu__link_film`}
      >
        Фильмы
      </NavLink>

      <NavLink to="/saved-movies"
        activeClassName="menu__link_active"
        className={`menu__link menu__link_film `}
      >
        Сохранённые фильмы
      </NavLink>

      <NavLink to="/profile"
        activeClassName="menu__link_active"
        className={`menu__link menu__link_profile`}
      >
        Аккаунт
      </NavLink>
    </nav>
  );
}

export default Navigation;