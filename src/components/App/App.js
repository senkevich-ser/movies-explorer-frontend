import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Register from '../pages/Register';
import './App.css';

function App() {
  return (
    <div className="app">
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/movies">
        <Movies />
      </Route>
      <Route path="/signup">
        <Register />
      </Route>
    </div >
  );
}

export default App;
