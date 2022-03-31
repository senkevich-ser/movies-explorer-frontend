import React from 'react';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject'
import Techs from './Techs/Techs';
import Footer from '../Footer/Footer';



import './Main.css';
function Main() {

   return (
      <div className="Main">
         <Header />
         <Promo />
         <AboutProject />
         <Techs />
         <Footer />
      </div>
   );
}

export default Main;
