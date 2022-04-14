import React, { useEffect, useState } from 'react';
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Header from '../Header/Header';
import Navigation from "../Movies/Navigation/Navigation";
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import { filterMovies } from '../../utils/MoviesSearch';
import {
  SAVED_FILMS_API_BLOCK, NOT_FOUND_ERR_BLOCK, SHORT_FILM_DURATION, DELETE_ERROR,
} from '../../utils/Const';

import "./SavedMovies.css";

function SavedMovies() {
  const [moviesList, setMoviesList] = useState([]);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [visibleMovies, setVisibleMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSwitchDisabled, setIsSwitchDisabled] = useState(true);
  const STORAGE_NAME = 'visibleMovies';

  useEffect(() => {
    setIsLoading(true);
    mainApi.getMovies()
      .then((data) => {
        setMoviesList(data);
        setVisibleMovies(data);
        localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
        setIsSwitchDisabled(data.length === 0);
      })
      .catch((err) => {
        setApiErrorMessage(SAVED_FILMS_API_BLOCK);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return (() => {
      localStorage.removeItem(STORAGE_NAME);
    });
  }, []);

  useEffect(() => {
    let visible = [];
    if (localStorage.getItem(STORAGE_NAME)) {
      visible = JSON.parse(localStorage.getItem(STORAGE_NAME));
    }

    if (isSwitchOn) {
      const foundFilter = visible.filter(item => item.duration <= SHORT_FILM_DURATION);
      setVisibleMovies(foundFilter);
      if (foundFilter.length === 0) {
        setApiErrorMessage(NOT_FOUND_ERR_BLOCK);
      }
    } else {
      setVisibleMovies(visible);
    }
  }, [isSwitchOn]);

  const handleCardClick = (movie) => {
    window.open(movie.trailer, '_blank');
  };

  const handleDeleteClick = (movie) => {
    mainApi.deleteMovie(movie._id)
      .then((deletedMovie) => {
        const newList = moviesList.filter(item => item.movieId !== deletedMovie.movieId);
        setMoviesList(newList);

        const newVisible = visibleMovies.filter(item => item.movieId !== deletedMovie.movieId);
        setVisibleMovies(newVisible);
        localStorage.setItem(JSON.stringify(newVisible));

        if (newVisible.length === 0) setApiErrorMessage(NOT_FOUND_ERR_BLOCK);
        setIsSwitchDisabled(newList.length === 0);
      })
      .catch((error) => {
        console.log(`${DELETE_ERROR} ${error}.`);
      });
  };

  const searchMain = async (searchString) => {
    let found = [];
    setIsLoading(true);
    setIsSwitchDisabled(true);
    setVisibleMovies([]);
    if (localStorage.getItem(STORAGE_NAME)) localStorage.removeItem(STORAGE_NAME);

    try {
      // Выполняем поиск
      found = await filterMovies(searchString.toLowerCase(), moviesList);
      setVisibleMovies(found);
      setIsSwitchDisabled(false);
    } catch (err) {
      setApiErrorMessage(err);
    } finally {
      setIsLoading(false);
      localStorage.setItem(STORAGE_NAME, JSON.stringify(found));
      setIsSwitchOn(false);
    };
  };

  // Параметр searchString получаем из компонента SearchForm
  const handleSearchSubmit = (searchString) => {
    const string = searchString || '';
    if (string.length === 0) {
      setIsSwitchOn(false);
      setVisibleMovies(moviesList);
      localStorage.setItem(STORAGE_NAME, JSON.stringify(moviesList));
    } else {
      searchMain(searchString);
    }
  };

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  return (
    <section className="saved-movies gradual-change">
      <Header>{<Navigation />}</Header>
      <SearchForm
        savedFilms={true}
        onSubmit={handleSearchSubmit}
        onSwitchChange={handleSwitchChange}
        isSwitchOn={isSwitchOn}
        isSwitchDisabled={isSwitchDisabled}
      />
      <MoviesCardList
        savedFilms={true}
        isLoading={isLoading}
        moviesList={visibleMovies}
        errorMessage={apiErrorMessage}
        onClick={handleCardClick}
        onDelete={handleDeleteClick}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;
