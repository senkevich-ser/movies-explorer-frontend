import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Navigation from '../Movies/Navigation/Navigation';
import './Profile.css';

function Profile() {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <section className="profile">
        <form
          className="profile__form profile__box"
        >
          <h2 className="profile__title profile__box">
            Привет, Сергей!
          </h2>

          <fieldset className="profile__fields profile__box">
            <label htmlFor="name" className="profile__label profile__text">
              Имя
            </label>

            <input type="text"
              id="name" name="name"
              className={`profile__item profile__text`}
              placeholder="Имя"
            />

            <label htmlFor="email" className="profile__label profile__text">
              Почта
            </label>

            <input type="email"
              id="email" name="email"
              className={`profile__item profile__text`}
              placeholder="Почта"
            />
          </fieldset>

          <p className="profile__error profile__box profile__error_input">
          </p>

          <fieldset className="profile__buttons profile__box">
            <p className="profile__error profile__box">
            </p>

            <Button type="submit" userClass="profile__btn">
              Редактировать
            </Button>
            <Link to='/'>
              <Button userClass="profile__btn profile__btn_red" >
                Выйти из аккаунта
              </Button>
            </Link>
          </fieldset>
        </form>
      </section>
    </>
  );
}

export default Profile;
