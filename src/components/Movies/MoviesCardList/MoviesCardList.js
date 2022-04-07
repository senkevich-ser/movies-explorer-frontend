import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import RoundCheckBox from '../RoundCheckBox/RoundCheckBox';
import initialArr from '../../../initialData';
import './MoviesCardList.css';

function MoviesCardList() {
  const getMoviesList = (cardArr) => {
    if (cardArr.length > 0) {
      return initialArr.map((moviesCard) => (
        <MoviesCard
          key={moviesCard.movieId} movie={moviesCard}
        >
          <RoundCheckBox
            movieId={moviesCard.movieId}
          />
        </MoviesCard>
      ));
    }
    return (
      <li className="list__no-result-box">
        Что то пошло не так
      </li>
    );
  };

  return (
    <ul className="list gradual-change">
      {getMoviesList(initialArr)}
    </ul>
  );
}

export default MoviesCardList;
