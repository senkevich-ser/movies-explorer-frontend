import React from 'react';

import './Portfolio.css';

const Portfolio = () => (
  <section className="portfolio portfolio__container">
    <h4 className="portfolio__container portfolio__title">Портфолио</h4>

    <ul className="portfolio__container projects__table">
      <li className="portfolio__container projects__element">
        <p className="portfolio__container projects__info">
          Статичный сайт
        </p>
        <a
          className="projects__link"
          href="https://github.com/senkevich-ser/how-to-learn"
          target="_blank" rel="noreferrer noopener"
        >
        </a>
      </li>

      <li className="portfolio__container projects__element">
        <p className="portfolio__container projects__info">
          Адаптивный сайт
        </p>
        <a
          className="projects__link"
          href="https://github.com/senkevich-ser/russian-travel"
          target="_blank" rel="noreferrer noopener"
        >
        </a>
      </li>

      <li className="portfolio__container projects__element">
        <p className="portfolio__container projects__info">
          Одностраничное приложение
        </p>
        <a
          className="projects__link"
          href="https://github.com/senkevich-ser/mesto"
          target="_blank" rel="noreferrer noopener"
        >
        </a>
      </li>
    </ul>
  </section>
);

export default Portfolio;

