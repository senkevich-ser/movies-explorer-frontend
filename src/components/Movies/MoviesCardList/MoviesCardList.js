import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import RoundCheckBox from '../RoundCheckBox/RoundCheckBox';
import Preloader from '../../Preloader/Preloader';
import Button from '../../Button/Button';
import './MoviesCardList.css';

function DeleteButton(props) {

  const handleDelete = () => {
    props.onDelete(props.movie);
  };

  return (
    <Button userClass="saved-movies__btn_delete" onClick={handleDelete} />
  );
}

function MoviesCardList(props) {

  const handleChange = (movieId) => {
    props.onSave(movieId);
  };

  const handleDelete = (movie) => {
    props.onDelete(movie);
  };

  const getMoviesList = (moviesList) => {
    if (moviesList.length > 0) {
      return moviesList.map((moviesCard) => (
        <MoviesCard
          key={moviesCard.movieId} movie={moviesCard}
          onClick={props.onClick}
        >
          {props.savedFilms ?
            <DeleteButton
              onDelete={handleDelete}
              movie={moviesCard}
            /> :
            <RoundCheckBox
              isChecked={moviesCard.saved}
              movieId={moviesCard.movieId}
              onChange={handleChange}
            />
          }
        </MoviesCard>
      ));
    }
    return (
      <li className="list__no-result-box">
        {props.errorMessage}
      </li>
    );
  };

  return (
    <ul className="list gradual-change">
      {props.isLoading ? <Preloader /> : getMoviesList(props.moviesList)}
    </ul>
  );
}

export default MoviesCardList;