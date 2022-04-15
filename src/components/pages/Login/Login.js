import React, { useEffect, useState } from 'react';
import Form from '../../Form/Form';
import Logo from '../../Logo/Logo';
import Input from '../../Input/Input';
import SubmitGroup from '../../SubmitGroup/SubmitGroup';
import { useFormWithValidation } from '../../../hooks/useFormWithValidation';
import './Login.css';

function Login(props) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    props.resetMessage();
  }, [values, props]);

  useEffect(() => {
    setErrorMessage(props.errorMessage);
  }, [props.errorMessage]);

  const emptyForm = () => {
    resetForm({ email: '', password: '' });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(values.email, values.password, emptyForm);
  }
  return (
    <div className="login">
      <header className="login__header">
        <Logo />
      </header>

      <Form name="form-login" title="Рады видеть!"
        onSubmit={handleSubmit}>>
        <Input
          type="email"
          id="email" name="email"
          placeholder="E-mail" required
          pattern="^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$"
          errorId="email-error"
          isError={errors.email} errorText={errors.email}
          onChange={handleChange}
          value={values.email || ''}
        >
          E-mail
        </Input>

        <Input
          type="password"
          id="password" name="password"
          maxLength="20" minLength="8"
          placeholder="Пароль" required
          errorId="password-error"
          isError={errors.password} errorText={errors.password}
          onChange={handleChange}
          value={values.password || ''}
        >
          Пароль
        </Input>

        <SubmitGroup
          submitName="Войти"
          linkName="Регистрация"
          linkDestination="/signup"
          submitDisabled={!isValid}
          errorMessage={errorMessage}
        >
          Ещё не зарегистрированы?
        </SubmitGroup>
      </Form>
    </div>
  );
}

export default Login;
