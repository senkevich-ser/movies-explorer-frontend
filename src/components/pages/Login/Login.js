import React from 'react';
import Form from '../../Form/Form';
import Logo from '../../Logo/Logo';
import Input from '../../Input/Input';
import SubmitGroup from '../../SubmitGroup/SubmitGroup';
import './Login.css';

function Login() {
  return (
    <div className="login">
      <header className="login__header">
        <Logo />
      </header>

      <Form name="form-login" title="Рады видеть!" >
        <Input
          type="email"
          id="email" name="email"
          placeholder="E-mail"
        >
          E-mail
        </Input>

        <Input
          type="password"
          userClass={`input__item_type_password`}
          id="password" name="password"
          maxLength="20" minLength="8"
          placeholder="Пароль"
        >
          Пароль
        </Input>

        <SubmitGroup
          submitName="Войти"
          linkName="Регистрация"
          linkDestination="/signup"
        >
          Ещё не зарегистрированы?
        </SubmitGroup>
      </Form>
    </div>
  );
}

export default Login;
