import React, {useState} from 'react';
import AppHeader from "../../components/app-header/app-header";
import styles from './Registration.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

function Registration () {
		const [email, setEmail] = useState('');
		const onChangeEmail = e => {
				setEmail(e.target.value)
		};

		const [password, setPassword] = useState('')
		const onChangePassword = e => {
				setPassword(e.target.value)
		};

		const [name, setName] = React.useState('');
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

						<main className={styles.reg}>
								<section className={styles.container}>
										<div className={styles.formWrap}>
												<h1 className="text text_type_main-medium">
														Регистрация
												</h1>

												<Input
														type={'text'}
														placeholder={'Имя'}
														onChange={e => setName(e.target.value)}
														value={name}
														name={'name'}
														error={false}
														ref={inputRef}
														errorText={'Ошибка'}
														size={'default'}
														extraClass="mt-6"
												/>

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
														onClick={registration}
														extraClass="mt-6"
												>
														Зарегистрироваться
												</Button>
										</div>

										<div className="footer mt-20">
												<p className={`text text_type_main-default text_color_inactive ${styles.textCenter}`}>
														Уже зарегистрированы?
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

export default Registration;
