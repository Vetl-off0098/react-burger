import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import AppHeader from "../../components/app-header/app-header";
import styles from './Login.module.css';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {fetchLogin} from "../../services/async-actions/login";
import {useDispatch} from "react-redux";

function Login () {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fromPage = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const onChangeEmail = e => {
    setEmail(e.target.value)
  };

  const [password, setPassword] = useState('')
  const onChangePassword = e => {
    setPassword(e.target.value)
  };

  const logIn = () => {
    dispatch(fetchLogin({email, password}, () => navigate(fromPage, {replace: true})))
  };

  const goToRegistration = () => {
    navigate('/registration', { replace: true });
  };

  const goToResetPass = () => {
    navigate('/forgot-password', { replace: true });
  };

  return (
    <>
      <AppHeader/>

      <main className={styles.login}>
        <section className={styles.container}>
          <div className={styles.formWrap}>
            <h1 className="text text_type_main-medium">
              Вход
            </h1>

            <EmailInput
              onChange={onChangeEmail}
              value={email}
              name={'email'}
              isIcon={false}
              extraClass="mt-6"
            />

            <PasswordInput
              onChange={onChangePassword}
              value={password}
              name={'password'}
              extraClass="mt-6"
            />

            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={logIn}
              extraClass="mt-6"
            >
              Войти
            </Button>
          </div>

          <div className="footer mt-20">
            <p className={`text text_type_main-default text_color_inactive ${styles.textCenter}`}>
              Вы - новый пользователь?
              <Button htmlType="button" type="secondary" size="medium" onClick={goToRegistration}>
                Зарегистрироваться
              </Button>
            </p>

            <p className={`text text_type_main-default text_color_inactive ${styles.textCenter}`}>
              Забыли пароль?
              <Button htmlType="button" type="secondary" size="medium" onClick={goToResetPass}>
                Восстановить пароль
              </Button>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Login;
