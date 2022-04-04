import React from 'react';
import Portfolio from '../Portfolio/Portfolio';

import personPhoto from '../../../images/I_am.png';
import './AboutMe.css';
import '../AboutProject/AboutProject.css';
import '../Techs/Techs.css';

const AboutMe = () => (
  <section className="AboutMe">

    <h3 className='aboutProject__title'>Студент</h3>

    <article className="student">
      <div className="student__info">
        <h3 className='techs__title'>Сергей</h3>

        <p className="student__subtitle">
          Фронтенд-разработчик
        </p>

        <p className="student__text">
          Я родился и вырос в г.Саратов, закончил Поволжский институт управления имени П.А. Столыпина-филиал РАНХиГС
          по специальности "Государственное и муниципальное управление".
          В настоящее время живу в г.Саратов. Прошел курс
          Яндекс.Практикума по веб-разработке. Ищу работу front-end разработчика,
          чтобы применить полученные комплексные знания и опыт работы с продвинутыми инструментами, методологиями и стандартами.
        </p>

        <ul className="student__list">
          <li className="student__item">
            <a className="student__link"
              href="https://www.facebook.com"
              target="_blank" rel="noreferrer noopener"
            >
              Facebook
            </a>
          </li>
          <li className="student__item">
            <a className="student__link"
              href="https://github.com/senkevich-ser"
              target="_blank" rel="noreferrer noopener"
            >
              Github
            </a>
          </li>
        </ul>
      </div>

      <img
        className="student__photo"
        src={personPhoto}
        alt="Фотография студента"
      />
    </article>

    <Portfolio />
  </section>
);

export default AboutMe;
