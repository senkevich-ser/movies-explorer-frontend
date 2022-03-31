import React from 'react';
/* import SectionHeader from '../SectionHeader/SectionHeader'; */

import './AboutProject.css';

function AboutProject() {
  return (
    <section className="AboutProject">

      <h3 className='aboutProject__title'>О проекте</h3>

      <ul className="table">
        <li className="table__column">
          <h4 className="table__title">
            Дипломный проект включал 5 этапов
          </h4>
          <p className="table__text">
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className="table__column">
          <h4 className="table__title">
            На выполнение диплома ушло 5 недель
          </h4>
          <p className="table__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </li>
      </ul>

      <div className="plan">
        <p className="plan__text plan__chart plan__chart_black">
          1 неделя
        </p>
        <p className="plan__text plan__chart plan__chart_gray">
          4 недели
        </p>
        <p className="plan__text plan__item">
          Back-end
        </p>
        <p className="plan__text plan__item">
          Front-end
        </p>
      </div>

    </section >
  )
};

export default AboutProject;
