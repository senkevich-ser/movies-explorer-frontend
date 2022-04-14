import React from 'react';
import './MoviesCard.css';

function MoviesCard({ movie, children, onClick }) {
  const getMovieDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const hoursStr = hours > 0 ? `${hours}ч` : '';
    const minutes = duration - hours * 60;
    const minutesStr = minutes > 0 ? `${minutes}м` : '';
    return hoursStr + minutesStr;
  };
  const handleClick = () => {
    onClick(movie);
  };
  return (
    <li className="card">
      <div className="card__wrapper">
        <img
          className="card__image"
          src={movie.image}
          alt={movie.nameRU}
          onClick={handleClick}
        />
      </div>

      <ul className="card__info">
        <div className="card__name">
          <li className="card__name_title">{movie.nameRU}</li>

          {children}

        </div>
        <div className='card__duration'>
          <div className="card__line"></div>
          <li className="card__duration_time">{getMovieDuration(movie.duration)}</li>
        </div>
      </ul>
    </li>
  );
}

export default MoviesCard;
