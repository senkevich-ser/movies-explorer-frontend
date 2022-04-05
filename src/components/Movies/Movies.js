import React from 'react';
import SearchForm from './SearchForm/SearchForm';
import Button from './Button/Button';
import Header from '../Header/Header';
import Navigation from './Navigation/Navigation';


import './Movies.css';

function Movies() {

  return (
    <section className="movies">
      <Header>{<Navigation />}</Header>
      <SearchForm />
      <Button />
    </section>
  );
}

export default Movies;
