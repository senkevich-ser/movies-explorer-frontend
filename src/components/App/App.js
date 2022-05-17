import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/Auth';
import ProtectedRoute from '../../components/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../pages/Register';
import Login from '../pages/Login/Login';
import NotFound from '../NotFound/NotFound';
import './App.css';
import { Redirect } from 'react-router-dom';

function App() {
  if (!localStorage.getItem('isLocalLoggedIn')) {
    localStorage.setItem('isLocalLoggedIn', JSON.stringify({ loggedIn: false }));
  }
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ email: '', name: '' });
  const [resultMessage, setResultMessage] = useState('');
  let history = useHistory();

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({ name: res.name, email: res.email });
            setLoggedIn(true);
            localStorage.setItem('isLocalLoggedIn', JSON.stringify({ loggedIn: true }));

            if (history.location.pathname === '/') {
              history.push('/');
            }
            if (history.location.pathname === '/movies') {
              history.push('/movies');
            }
            if (history.location.pathname === '/saved-movies') {
              console.log(history.location.pathname)
              history.push('/saved-movies');
            }
            if (history.location.pathname === '/profile') {
              history.push('/profile');
            }

          }
        })
        .catch(err => {
          console.log('Переданный токен некорректен.');
          setLoggedIn(false);
          localStorage.setItem('isLocalLoggedIn', JSON.stringify({ loggedIn: false }));
        });
    }
  };


  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  // ---------------------------------------------------------------------
  // Авторизация

  const handleLogin = (userEmail, userPassword, resetLoginForm) => {
    let messageText = '';

    auth.authorize(userEmail, userPassword)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          resetLoginForm();
          setLoggedIn(true);
          localStorage.setItem('isLocalLoggedIn', JSON.stringify({ loggedIn: true }));
          setTimeout(() => { history.push('/movies') }, 300);
        }
      })
      .catch(err => {
        switch (err) {
          case 400:
            messageText = "Некорректное значение одного или нескольких полей";
            break;
          case 401:
            messageText = `Неверно указаны e-mail или пароль`;
            break;
          default:
            messageText = "Что-то пошло не так! Попробуйте ещё раз.";
        }
      })
      .finally(() => {
        setResultMessage(messageText);
      });
  };

  // ---------------------------------------------------------------------
  // Выход

  const handleLogout = () => {
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('jwt');
    localStorage.removeItem('isShortMovies');
    localStorage.removeItem('isShortSavedMovies');
    localStorage.removeItem('isLocalLoggedIn');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('searchString');
    setLoggedIn(false);
    setCurrentUser({ name: '', email: '' });
    history.push('/');
  };

  // ---------------------------------------------------------------------
  // Регистрация

  const handleRegister = (userEmail, userPassword, userName, resetRegisterForm) => {
    let messageText = '';
    auth.register(userEmail, userPassword, userName)
      .then((res) => {
        resetRegisterForm();
        history.push('/signin');
        //------------------------------------------------------
        auth.authorize(userEmail, userPassword)
          .then((data) => {
            if (data.token) {
              localStorage.setItem('jwt', data.token);
              setLoggedIn(true);
              localStorage.setItem('isLocalLoggedIn', JSON.stringify({ loggedIn: true }));
              setTimeout(() => { history.push('/movies') }, 300);
            }
          })
          .catch((err) => {
            console.log('Переданный токен некорректен.');
            setLoggedIn(false);
            localStorage.setItem('isLocalLoggedIn', JSON.stringify({ loggedIn: false }));
          });
        //------------------------------------------------------
      })
      .catch((err) => {
        switch (err) {
          case 400:
            messageText = "Некорректное значение одного или нескольких полей";
            break;
          case 409:
            messageText = `Пользователь ${userEmail} уже существует`;
            break;
          default:
            messageText = "Что-то пошло не так! Попробуйте ещё раз.";
        }
      })
      .finally(() => {
        setResultMessage(messageText);
      });
  };

  const resetResultMessage = () => {
    setResultMessage('');


  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute path="/movies"
            loggedIn={JSON.parse(localStorage.getItem('isLocalLoggedIn')).loggedIn}
            component={Movies}
          />
          <ProtectedRoute path="/saved-movies"
            loggedIn={JSON.parse(localStorage.getItem('isLocalLoggedIn')).loggedIn}
            component={SavedMovies}
          />
          <ProtectedRoute path="/profile"
            loggedIn={JSON.parse(localStorage.getItem('isLocalLoggedIn')).loggedIn}
            component={Profile}
            onLogout={handleLogout}
          />
          <Route path="/signup">
            {!loggedIn ? <Register
              onRegister={handleRegister}
              errorMessage={resultMessage}
              resetMessage={resetResultMessage}
              history={history}
            /> : <Redirect to='/' />}
          </Route>
          <Route path="/signin">
            {!loggedIn ? <Login
              onLogin={handleLogin}
              errorMessage={resultMessage}
              resetMessage={resetResultMessage}
              history={history}
            /> : <Redirect to='/' />}
          </Route>
          <Route path="*">
            <NotFound history={history} />
          </Route>
        </Switch>
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
