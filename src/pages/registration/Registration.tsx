import React, {useState} from 'react';
import styles from './Registration.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router-dom";
import {fetchRegistration} from "../../services/async-actions/registration";
import {useDispatch} from "../../hook/useTypedDispatch";

function Registration () {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	};

	const [password, setPassword] = useState('')
	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	};

	const [name, setName] = React.useState('');
	const inputRef = React.useRef(null);

	const registration = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(fetchRegistration({email, password, name}, () => navigate('/', {replace: true})));
	};

	const goToLogin = () => {
			navigate('/login', { replace: true });
	};

	return (
		<>
			<main className={styles.reg}>
				<section className={styles.container}>
					<div className={styles.formWrap}>
						<h1 className="text text_type_main-medium">
							Регистрация
						</h1>

						<form onSubmit={registration} className={styles.formWrap}>
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

							<input type="submit" value={'Зарегистрироваться'} className="submitBtn mt-6" />
						</form>
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
