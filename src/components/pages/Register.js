import React, { useEffect, useState } from 'react';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import Input from '../Input/Input';
import SubmitGroup from '../SubmitGroup/SubmitGroup';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import './Login/Login.css';

function Register(props) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    props.resetMessage();
  }, [values]);

  useEffect(() => {
    setErrorMessage(props.errorMessage);
  }, [props.errorMessage]);

  const emptyForm = () => {
    resetForm({ name: '', email: '', password: '' });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onRegister(values.email, values.password, values.name, emptyForm);
  };
  return (
    <div className="login">
      <header className="login__header">
        <Logo />
      </header>

      <Form name="form-register" title="Добро пожаловать!"
        onSubmit={handleSubmit}>
        <Input type="text"
          autoComplete="off"
          id="name" name="name"
          maxLength="30" minLength="2"
          placeholder="Имя" required
          pattern="^[A-Za-z]([A-Za-z]| |-){1,28}[A-Za-z]$"
          errorId="name-error"
          isError={errors.name} errorText={errors.name}
          onChange={handleChange}
          value={values.name || ''}
        >
          Имя
        </Input>

        <Input type="email"
          autoComplete="off"
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
          autoComplete="off"
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
          submitName="Зарегистрироваться"
          linkName="Войти"
          linkDestination="/signin"
          submitDisabled={!isValid}
          errorMessage={errorMessage}
        >
          Уже зарегистрированы?
        </SubmitGroup>
      </Form>
    </div>
  );
}

export default Register;
