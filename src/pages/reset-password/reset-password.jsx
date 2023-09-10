import React, {useState} from 'react';
import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {getCookie} from "../../utils/cookie";

function ResetPassword () {
		const navigate = useNavigate();

		const [password, setPassword] = useState('')
		const onChangePassword = e => {
				setPassword(e.target.value)
		};

		const [kode, setKode] = React.useState('');
		const inputRef = React.useRef(null);

		const saveNewPass = async (e) => {
				e.preventDefault();

				await fetch(`${api}/password-reset/reset`, {
						method: 'POST',
						mode: 'cors',
						cache: 'no-cache',
						credentials: 'same-origin',
						headers: {
								'Content-Type': 'application/json'
						},
						redirect: 'follow',
						referrerPolicy: 'no-referrer',
						body: JSON.stringify({
								password: password,
								token: getCookie('refresh')
						})
				})
						.then(data => checkResponse(data))
						.then(data => {
								console.log(data)
								navigate('/login', {replace: true})
						})
						.catch(e => console.log(e))
		};

		const goToLogin = () => {
				navigate('/login', { replace: true });
		};

		return (
				<>
						<main className={styles.reset}>
								<section className={styles.container}>
										<div className={styles.formWrap}>
												<h1 className="text text_type_main-medium">
														Восстановление пароля
												</h1>

												<form onSubmit={saveNewPass} className={styles.formWrap}>
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

														<input type="submit" value={'Сохранить'} className="submitBtn mt-6" />
												</form>
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
