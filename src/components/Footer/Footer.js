import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">

    <p className="footer__text footer__info">
      Учебный проект Яндекс.Практикум х BeatFilm.
    </p>

    <div className="footer__row">
      <p className="footer__copyright footer__info">&#169; {new Date().getFullYear()}</p>
      <nav>
        <ul className="footer__row-links">

          <li className="footer__row-link">
            <a className="footer__link footer__info"
              href="https://praktikum.yandex.ru"
              target="_blank" rel="noreferrer noopener"
            >
              Яндекс.Практикум
            </a>
          </li>

          <li className="footer__row-link">
            <a className="footer__link footer__info"
              href="https://github.com"
              target="_blank" rel="noreferrer noopener"
            >
              Github
            </a>
          </li>

          <li className="footer__row-link">
            <a className="footer__link footer__info"
              href="https://www.facebook.com"
              target="_blank" rel="noreferrer noopener"
            >
              Facebook
            </a>
          </li>

        </ul>
      </nav>
    </div>
  </footer>
);

export default Footer;
