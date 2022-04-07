import React from 'react';
import './MoviesCard.css';

function MoviesCard({ movie, children }) {
  const getMovieDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const hoursStr = hours > 0 ? `${hours}ч` : '';
    const minutes = duration - hours * 60;
    const minutesStr = minutes > 0 ? `${minutes}м` : '';
    return hoursStr + minutesStr;
  };
  return (
    <li className="card">
      <div className="card__wrapper">
        <img
          className="card__image"
          src={`https://api.nomoreparties.co${movie.image.url}`}
          alt={movie.nameRU}
        />
      </div>

      <ul className="card__info">
        <li className="card__name">{movie.nameRU}</li>
        <li>
          {children}
        </li>
        <li className="card__duration">{getMovieDuration(movie.duration)}</li>
      </ul>
    </li>
  );
}

export default MoviesCard;
