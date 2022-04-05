import React from 'react';
import Header from '../Header/Header';
import NavTab from '../Main/NavTab/NavTab';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject'
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Footer from '../Footer/Footer';


import './Main.css';
const Main = () => (
   <div className="main">
      <Promo>{<Header>{<NavTab />}</Header>}</Promo>
      <AboutProject />
      <Techs />
      <AboutMe />
      <Footer />
   </div>
)

export default Main;
