import React, {useEffect, useState} from 'react';
import styles from './profile.module.css';
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogOut} from "../../services/async-actions/logOut";
import {useTypedSelector} from "../../hook/useTypedSelector";

function Profile () {
	const user = useTypedSelector(state => state.user.user);

	useEffect(() => {
		if (user?.name) setName(user.name);
		if (user?.email) setEmail(user.email);
	}, [user]);

	const dispatch = useDispatch();

	const [email, setEmail] = useState<string>('');
	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	};

	const [password, setPassword] = useState<string>('')
	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	};

	const [name, setName] = useState<string>('');

	const logOut = () => {
		dispatch(fetchLogOut())
	}

	return (
		<>
			<main className={`container`}>
				<section className={styles.content}>
					<article className={styles.leftPart}>
						<nav className={styles.navigation}>
							<NavLink to="/profile">
								<p className={`text text_type_main-medium ${styles.buttonLink}`}>
									Профиль
								</p>
							</NavLink>

							<NavLink to="/profile/orders">
								<p className={`text text_type_main-medium ${styles.buttonLink}`}>
									История заказов
								</p>
							</NavLink>

							<div onClick={logOut} className={styles.logoutBtn}>
								<p className={`text text_type_main-medium ${styles.buttonLink}`}>
									Выход
								</p>
							</div>
						</nav>

						<div className={styles.description}>
							<p className="text text_type_main-small text_color_inactive">
								В этом разделе вы можете изменить свои персональные данные
							</p>
						</div>
					</article>

					<article className={styles.rightPart}>
						<EmailInput
							onChange={e => setName(e.target.value)}
							value={name}
							name={'name'}
							placeholder="Имя"
							isIcon={true}
						/>

						<EmailInput
							onChange={onChangeEmail}
							value={email}
							name={'email'}
							placeholder="Логин"
							isIcon={true}
							extraClass="mt-6"
						/>

						<PasswordInput
							onChange={onChangePassword}
							value={password}
							name={'password'}
							extraClass="mt-6"
							icon="EditIcon"
						/>
					</article>
				</section>
			</main>
		</>
	)
}

export default Profile;
