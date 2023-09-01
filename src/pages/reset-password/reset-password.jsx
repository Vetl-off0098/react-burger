import React, {useState} from 'react';
import AppHeader from "../../components/app-header/app-header";
import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

function ResetPassword () {

		const [password, setPassword] = useState('')
		const onChangePassword = e => {
				setPassword(e.target.value)
		};

		const [kode, setKode] = React.useState('');
		const inputRef = React.useRef(null);

		const registration = () => {
				console.log('registration');
		};

		const goToLogin = () => {
				console.log('login')
		};

		return (
				<>
						<AppHeader/>

						<main className={styles.reset}>
								<section className={styles.container}>
										<div className={styles.formWrap}>
												<h1 className="text text_type_main-medium">
														Восстановление пароля
												</h1>

												<PasswordInput
														placeholder={'Введите новый пароль'}
														onChange={onChangePassword}
														value={password}
														name={'password'}
														extraClass="mt-6"
												/>

												<Input
														type={'text'}
														placeholder={'Укажите код из письма'}
														onChange={e => setKode(e.target.value)}
														value={kode}
														name={'name'}
														error={false}
														ref={inputRef}
														errorText={'Ошибка'}
														size={'default'}
														extraClass="mt-6"
												/>

												<Button
														htmlType="button"
														type="primary"
														size="large"
														onClick={registration}
														extraClass="mt-6"
												>
														Сохранить
												</Button>
										</div>

										<div className="footer mt-20">
												<p className={`text text_type_main-default text_color_inactive ${styles.textCenter}`}>
														Вспомнили пароль?
														<Button htmlType="button" type="secondary" size="medium" onClick={goToLogin}>
																Войти
														</Button>
												</p>
										</div>
								</section>
						</main>
				</>
		)
}

export default ResetPassword;
