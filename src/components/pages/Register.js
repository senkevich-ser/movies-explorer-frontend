import React from 'react';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import Input from '../Input/Input';
import SubmitGroup from '../SubmitGroup/SubmitGroup';
import './Login/Login.css';

function Register() {
  return (
    <div className="login">
      <header className="login__header">
        <Logo />
      </header>

      <Form name="form-register" title="Добро пожаловать!" >
        <Input type="text"
          id="name" name="name"
          maxLength="30" minLength="2"
          placeholder="Имя" required
        >
          Имя
        </Input>

        <Input type="email"
          id="email" name="email"
          placeholder="E-mail" required
        >
          E-mail
        </Input>

        <Input
          type="password"
          id="password" name="password"
          maxLength="20" minLength="8"
          placeholder="Пароль" required
        >
          Пароль
        </Input>

        <SubmitGroup
          submitName="Зарегистрироваться"
          linkName="Войти"
          linkDestination="/signin"
        >
          Уже зарегистрированы?
        </SubmitGroup>
      </Form>
    </div>
  );
}

export default Register;
