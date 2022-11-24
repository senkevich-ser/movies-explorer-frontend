import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Navigation from './Navigation/Navigation';
import Footer from '../Footer/Footer';
import { useWindowDimensions } from '../../hooks/useDimensions';
import { getVisualProps } from '../../utils/VisualProps';
import './Movies.css';
import {
  NOT_FOUND_ERR_BLOCK, SAVE_FILM_ERR_TEXT, SHORT_FILM_DURATION
} from '../../utils/Const';
import { readMovies, filterMovies, addSavedFlag } from '../../utils/MoviesSearch';
import mainApi from '../../utils/MainApi';

function Movies() {
  //Переменная прцесса загрузки
  const [isLoading, setIsLoading] = useState(false);
  //Переменная состояния кнопки "Еше"
  const [isMoreVisible, setIsMoreVisible] = useState(false);
  //Переменная состояния переключателя поиска короткометражек
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSwitchDisabled, setIsSwitchDisabled] = useState(true);
  //Переменная состояния сохраненных фильмов
  const [savedMovies, setSavedMovies] = useState([]);
  //Переменная состояния сохраненных фильмов в локальном хранилище
  const [foundMovies, setFoundMovies] = useState([]);
  //Переменная состояния списка фильмов в блоке результатов поиска
  const [showedMovies, setShowedMovies] = useState([]);
  const [findErrorMessage, setFindErrorMessage] = useState('');

  const { width } = useWindowDimensions();
  const [visualProps, setVisualProps] = useState({ total: 12, add: 3 });
  const [visibleCardsNumber, setVisibleCardsNumber] = useState(0);


  useEffect(() => {
    if (!localStorage.getItem('isShortMovies')) {
      localStorage.setItem('isShortMovies', JSON.stringify({ checkbox: false }));
    }
    if (JSON.parse(localStorage.getItem('isShortMovies')).checkbox) {
      setTimeout(handleSwitchChange, 300)
    }
    let found, foundChecked;

    const fromStorage = localStorage.getItem('foundMovies');

    if (fromStorage) {
      found = JSON.parse(fromStorage);
      setFoundMovies(found);
      setIsSwitchDisabled(found.length === 0);
    } else{
      found=[]
    }
    readMovies().then((movies) => {
      localStorage.setItem('allMovies', JSON.stringify(movies));
    })
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

  useEffect(() => {
    setVisualProps(getVisualProps(width));
  }, [width]);




  useEffect(() => {
    if (foundMovies.length <= visualProps.total) {
      /* setVisibleCardsNumber(foundMovies.length); */
      setIsMoreVisible(false);
    }
    else if (visibleCardsNumber) {
      setVisibleCardsNumber(visibleCardsNumber)
      setIsMoreVisible(true);
    }
    else {
      setVisibleCardsNumber(visualProps.total)
      setIsMoreVisible(true);
    }
  }, [foundMovies, visualProps, visibleCardsNumber]);

  useEffect(() => {
    setShowedMovies(foundMovies.slice(0, visibleCardsNumber));
  }, [visibleCardsNumber, foundMovies]);

  useEffect(() => {
    const fromStorage = localStorage.getItem('foundMovies');
    if (!fromStorage) return;
    const found = JSON.parse(fromStorage);


    if (isSwitchOn) {
      const foundFilter = found.filter(item => item.duration <= SHORT_FILM_DURATION);
      setFoundMovies(foundFilter);
      localStorage.setItem('isShortMovies', JSON.stringify({ checkbox: true }));
      if (foundFilter.length === 0) {
        setFindErrorMessage(NOT_FOUND_ERR_BLOCK);
      }
    } else {
      setFoundMovies(found);
      localStorage.setItem('isShortMovies', JSON.stringify({ checkbox: false }));
      searchMain(JSON.parse(localStorage.getItem('searchString')));
    }
  }, [isSwitchOn]);

  // -------------------------------------------------------------------------------
  // Поиск фильмов

  const searchMain = async (searchString) => {
    setFoundMovies([]);
    setShowedMovies([]);
    setFindErrorMessage('');
    setIsSwitchOn(false);
    setIsSwitchDisabled(true);
    localStorage.setItem('isShortMovies', JSON.stringify({ checkbox: false }));
    if (localStorage.getItem('foundMovies')) localStorage.removeItem('foundMovies');
    if (localStorage.getItem('searchString')) localStorage.removeItem('searchString');

    try {
      setIsLoading(true);

      // Читаем фильмы с сервиса beatfilm-movies из localStorage
      const movies = JSON.parse(localStorage.getItem('allMovies'))
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

  // Параметр searchString получаем из компонента SearchForm
  const handleSearchSubmit = (searchString) => {
    searchMain(searchString);
  };

  useEffect(() => {
    if (visibleCardsNumber >= foundMovies.length)
      setIsMoreVisible(false);
  }, [visibleCardsNumber, foundMovies]);

  const handleMoreClick = () => {
    // Определяем количество отображаемых карточек
    let newValue = visibleCardsNumber + visualProps.add;
    setVisibleCardsNumber(newValue);
  };

  const handleSaveClick = async (movieId) => {
    try {
      // Находим сохраняемый/удаляем фильм
      const films = foundMovies.filter(currentMovie => currentMovie.movieId === movieId);
      if (films.length !== 1) throw new Error(SAVE_FILM_ERR_TEXT);
      let newFoundMovies = [];

      if (films[0].saved === 0) {
        delete films[0].saved;
        const result = await mainApi.postNewMovie(films[0]);

        const {
          movieId, country, director, duration, year,
          description, image, trailerLink, nameRU, nameEN,
          thumbnail, _id,
        } = result;

        const newFilm = {
          movieId, country, director, duration, year,
          description, image, trailerLink, nameRU, nameEN,
          thumbnail, saved: _id,
        };

        // Дополняем массивы foundMovies & savedMovies
        newFoundMovies = foundMovies.map((item) => (
          item.movieId === movieId ? newFilm : item
        ));

        setFoundMovies(newFoundMovies);

        const newSavedMovies = savedMovies.slice();
        newSavedMovies.push(result);
        setSavedMovies(newSavedMovies);

      } else {
        const result = await mainApi.deleteMovie(films[0].saved);
        const {
          movieId, country, director, duration, year,
          description, image, trailerLink, nameRU, nameEN,
          thumbnail,
        } = result;

        const newFilm = {
          movieId, country, director, duration, year,
          description, image, trailerLink, nameRU, nameEN,
          thumbnail, saved: 0,
        };

        // Дополняем массивы foundMovies & savedMovies
        newFoundMovies = foundMovies.map((item) => (
          item.movieId === movieId ? newFilm : item
        ));

        setFoundMovies(newFoundMovies);

        const newSavedMovies = savedMovies.filter((item) => (
          item.movieId !== movieId
        ));
        setSavedMovies(newSavedMovies);
      }

      if (localStorage.getItem('foundMovies')) localStorage.removeItem('foundMovies');
      localStorage.setItem('foundMovies', JSON.stringify(newFoundMovies));

    } catch (err) {
      console.log(err);
    }
  };

  const handleCardClick = (movie) => {
    window.open(movie.trailerLink, '_blank');
  };

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn);
  };


  return (
    <section className="movies">
      <Header>{<Navigation />}</Header>
      <SearchForm
        savedFilms={false}
        onSubmit={handleSearchSubmit}
        onSwitchChange={handleSwitchChange}
        isSwitchOn={isSwitchOn}
        isSwitchDisabled={isSwitchDisabled} />
      <MoviesCardList
        savedFilms={false}
        isLoading={isLoading}
        moviesList={showedMovies}
        errorMessage={findErrorMessage}
        onSave={handleSaveClick}
        onClick={handleCardClick}
      />
      {isMoreVisible ?
        <Button userClass="movies__btn_type_more" onClick={handleMoreClick}>
          Ещё
        </Button> :
        <React.Fragment />
      }
      <Footer />
    </section>
  );
}

export default Movies;
