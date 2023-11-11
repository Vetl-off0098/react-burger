import React, {useState} from 'react';
import styles from './reset-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {fetchResetPassword} from "../../services/async-actions/resetPassword";
import {useDispatch} from "../../hook/useTypedDispatch";
import {resetPasswordApi} from "../../utils/burger-api";

function ResetPassword () {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [password, setPassword] = useState('');
	const [kode, setKode] = React.useState('');
	const [error, setError] = useState<Error | null>(null);
	const inputRef = React.useRef(null);

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
			setPassword(e.target.value)
	};

	const saveNewPass = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		setError(null);
		resetPasswordApi({ password, kode })
			.then(() => {
				navigate("/login", {replace: true})
			})
			.catch((err) => setError(err));
		// dispatch(fetchResetPassword(password, kode, () => navigate('/login', {replace: true})));
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

export default ResetPassword;
