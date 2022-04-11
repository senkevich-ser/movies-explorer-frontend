import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Header from '../Header/Header';
import Navigation from "../Movies/Navigation/Navigation";
import Footer from '../Footer/Footer';

import "./SavedMovies.css";

function SavedMovies() {
  return (
    <section className="saved-movies gradual-change">
      <Header>{<Navigation />}</Header>
      <SearchForm savedFilms={true} />
      <MoviesCardList savedFilms={true} />
      <Footer />
    </section>
  );
}

export default SavedMovies;
