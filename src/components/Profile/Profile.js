import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Button from '../Button/Button';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import mainApi from '../../utils/MainApi';
import Header from '../Header/Header';
import Navigation from '../Movies/Navigation/Navigation';
import './Profile.css';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    resetForm({ name: currentUser.name, email: currentUser.email });
  }, [currentUser, resetForm]);

  useEffect(() => {
    setServerErrorMessage('');
  }, []);

  useEffect(() => {
    const condition1 =
      (values.name === currentUser.name) &&
      (values.email === currentUser.email);

    const condition2 = (
      (values.name !== currentUser.name) ||
      (values.email !== currentUser.email)
    ) && !isValid;

    setIsSubmitDisabled(condition1 || condition2);
  }, [values, currentUser, isValid]);

  // Ошибки ввода данных
  useEffect(() => {
    const msgName = errors.name ? `Имя: ${errors.name}` : '';
    const msgEmail = errors.email ? `Почта: ${errors.email}` : '';
    setErrorMessage(`${msgName} ${msgEmail}`);
  }, [errors]);

  // Сохранение изменений
  const handleSubmit = (event) => {
    event.preventDefault();
    setServerErrorMessage('Сохранение...');

    mainApi.patchUserProfile(values)
      .then((data) => {
        setServerErrorMessage('Информация о пользователе сохранена.');
        currentUser.name = data.name;
        currentUser.email = data.email;
        resetForm({ name: currentUser.name, email: currentUser.email });
        setTimeout(() => setServerErrorMessage(''), 2000);
      })
      .catch((err) => {
        switch (err) {
          case 400:
            setServerErrorMessage("Некорректное значение одного или нескольких полей");
            break;
          case 409:
            setServerErrorMessage(`Пользователь ${values.email} уже существует.`);
            break;
          default:
            setServerErrorMessage(`Невозможно сохранить данные на сервере. Ошибка ${err}.`);
        }
      });
  };
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <section className="profile">
        <form
          className="profile__form profile__box"
          onSubmit={handleSubmit}
        >
          <h2 className="profile__title profile__box">
            Привет, {currentUser.name}!
          </h2>

          <fieldset className="profile__fields profile__box">
            <label htmlFor="name" className="profile__label profile__text">
              Имя
            </label>

            <input type="text"
              id="name" name="name"
              className={`profile__item profile__text ${errors.name ? 'profile__text_error' : ''}`}
              placeholder="Имя"
              pattern="^[A-Za-z]([A-Za-z]| |-){1,28}[A-Za-z]$"
              onChange={handleChange}
              value={values.name || ''} required
            />

            <label htmlFor="email" className="profile__label profile__text">
              Почта
            </label>

            <input type="email"
              id="email" name="email"
              className={`profile__item profile__text ${errors.email ? 'profile__text_error' : ''}`}
              placeholder="Почта"
              pattern="^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$"
              onChange={handleChange}
              value={values.email || ''} required
            />
          </fieldset>

          <p className="profile__error profile__box profile__error_input">
            {errorMessage}
          </p>

          <fieldset className="profile__buttons profile__box">
            <p className="profile__error profile__box">
              {serverErrorMessage}
            </p>

            <Button type="submit" userClass="profile__btn" disabled={isSubmitDisabled}>
              Редактировать
            </Button>
            <Button userClass="profile__btn profile__btn_red" onClick={props.onLogout}>
              Выйти из аккаунта
            </Button>
          </fieldset>
        </form>
      </section>
    </>
  );
}

export default Profile;
