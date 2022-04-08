import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../Button/Button';
import PopupMenu from '../PopupMenu/PopupMenu';
import './Navigation.css';

function Navigation() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleClick = () => {
    setIsPopupVisible(true);
  };

  const handleClose = () => {
    setIsPopupVisible(false);
  };
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
      <Button userClass={'menu__button'} type='button' onClick={handleClick} />
      {isPopupVisible && <PopupMenu handleClose={handleClose} />}
    </nav>
  );
}

export default Navigation;
