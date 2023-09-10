import React, {useEffect, useState} from 'react';
import styles from './profile.module.css';
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogOut} from "../../services/async-actions/logOut";

function Profile () {
		const user = useSelector(state => state.user.user);

		useEffect(() => {
				setName(user.name);
				setEmail(user.email);
		}, [user]);

		const dispatch = useDispatch();

		const [email, setEmail] = useState('');
		const onChangeEmail = e => {
				setEmail(e.target.value)
		};

		const [password, setPassword] = useState('')
		const onChangePassword = e => {
				setPassword(e.target.value)
		};

		const [name, setName] = React.useState('');

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
														type={'text'}
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
