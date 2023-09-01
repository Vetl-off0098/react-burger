import React, {useState, useRef} from 'react';
import AppHeader from "../../components/app-header/app-header";
import styles from './forgot-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

function ForgotPassword () {
		const [email, setEmail] = useState('');
		const inputRef = useRef(null);

		const restore = () => {
				console.log('registration');
		};

		const goToLogin = () => {
				console.log('login')
		};

		return (
				<>
						<AppHeader/>

						<main className={styles.forgot}>
								<section className={styles.container}>
										<div className={styles.formWrap}>
												<h1 className="text text_type_main-medium">
														Восстановление пароля
												</h1>

												<Input
														type={'text'}
														placeholder={'Укажите e-mail'}
														onChange={e => setEmail(e.target.value)}
														value={email}
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
														onClick={restore}
														extraClass="mt-6"
												>
														Восстановить
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

export default ForgotPassword;
