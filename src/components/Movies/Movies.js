import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Navigation from './Navigation/Navigation';
import Footer from '../Footer/Footer';
import './Movies.css';

import { readMovies, filterMovies, addSavedFlag } from '../../utils/MoviesSearch';
import mainApi from '../../utils/MainApi';

function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [showedMovies, setShowedMovies] = useState([]);
  const [findErrorMessage, setFindErrorMessage] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSwitchDisabled, setIsSwitchDisabled] = useState(true);
  useEffect(() => {
    let found, foundChecked;
    const fromStorage = localStorage.getItem('foundMovies');
    if (fromStorage) {
      found = JSON.parse(fromStorage);
      setFoundMovies(found);
      setIsSwitchDisabled(found.length === 0);
    }

    mainApi.getMovies()
      .then((data) => {
        setSavedMovies(data);
        foundChecked = addSavedFlag(found, data.slice());
        setFoundMovies(foundChecked);
      })
      .catch((err) => {
        console.log(`Нет доступа к сохраненным фильмам: ${err}`);
      });
  }, []);


  // Поиск фильмов

  const searchMain = async (searchString) => {
    setFoundMovies([]);
    setShowedMovies([]);
    setFindErrorMessage('');
    setIsSwitchOn(false);
    setIsSwitchDisabled(true);
    if (localStorage.getItem('foundMovies')) localStorage.removeItem('foundMovies');
    if (localStorage.getItem('searchString')) localStorage.removeItem('searchString');

    try {
      setIsLoading(true);

      // Читаем фильмы с сервиса beatfilm-movies
      const movies = await readMovies();

      // Выполняем поиск
      const found = await filterMovies(searchString.toLowerCase(), movies);

      // Добавить признак того, сохранена ли карточка
      const foundChecked = addSavedFlag(found, savedMovies.slice());
      setFoundMovies(foundChecked);

      localStorage.setItem('foundMovies', JSON.stringify(foundChecked));
      localStorage.setItem('searchString', JSON.stringify(searchString));
      setIsSwitchDisabled(false);

    } catch (err) {
      setFindErrorMessage(err);
    } finally {
      setIsLoading(false);
    };
  };
  return (
    <section className="movies">
      <Header>{<Navigation />}</Header>
      <SearchForm />
      <MoviesCardList
        savedFilms={false}
        cardList={showedMovies}
        isLoading={isLoading}
      />
      <Button userClass="movies__btn_type_more ">Ещё</Button>
      <Footer />
    </section>
  );
}

export default Movies;
