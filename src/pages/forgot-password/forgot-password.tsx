import React, {useState, useRef} from 'react';
import styles from './forgot-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {forgotPasswordApi} from "../../utils/burger-api";

function ForgotPassword () {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [error, setError] = useState<Error | null>(null);
	const inputRef = useRef(null);

	const restore = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setError(null);
		forgotPasswordApi({email})
			.then(() => {
				navigate("/reset-password", {replace: true});
			})
			.catch((err) => setError(err));





		fetch(`${api}/password-reset`, {
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
				email: email
			})
		})
			.then(data => checkResponse(data))
			.then(() => {
				navigate('/reset-password', {replace: true})
			})
			.catch(e => console.log(e))
	};

	const goToLogin = () => {
		navigate('/login', { replace: true });
	};

	return (
		<>
			<main className={styles.forgot}>
				<section className={styles.container}>
					<div className={styles.formWrap}>
						<h1 className="text text_type_main-medium">
							Восстановление пароля
						</h1>

						<form onSubmit={restore} className={styles.formWrap}>
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

							<input type="submit" value={'Восстановить'} className="submitBtn mt-6" />

							{error && (
								<p className={`${styles.error} text text_type_main-default pb-6`}>
									{error.message}
								</p>
							)}
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

export default ForgotPassword;
