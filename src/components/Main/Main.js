import React, { useContext } from 'react';
import Header from '../Header/Header';
import NavTab from './NavTab/NavTab';
import Navigation from '../Movies/Navigation/Navigation';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Main.css';

function Main() {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="main">
      <Promo>{<Header>{currentUser.email ? <Navigation /> : <NavTab />}</Header>}</Promo>
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
    </div>
  );
};

export default Main;
