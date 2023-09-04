import React, {useEffect, useState} from 'react';
import AppHeader from "../../components/app-header/app-header";
import styles from './profile.module.css';
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useNavigate} from "react-router-dom";
import {getCookie} from "../../utils/cookie";
import api from "../../utils/api";
import checkResponse from "../../utils/check-response";
import {useSelector} from "react-redux";

function Profile () {
		useEffect(() => {
				setName(user.name);
				setEmail(user.email);


				// const fetchData = async () => {
				// 		const data = await fetch(`${api}/auth/user`, {
				// 				method: 'GET',
				// 				mode: 'cors',
				// 				cache: 'no-cache',
				// 				credentials: 'same-origin',
				// 				headers: {
				// 						'Content-Type': 'application/json',
				// 						Authorization: 'Bearer ' + getCookie('token')
				// 				},
				// 				redirect: 'follow',
				// 				referrerPolicy: 'no-referrer',
				// 		});
				//
				// 		const json = await checkResponse(data);
				// 		console.log(json)
				//
				// 		setName(json.user.name);
				// 		setEmail(json.user.email);
				// }
				//
				// fetchData()
				// 		.catch(e => {
				// 				console.error(e)
				// 				navigate('/login', {replace: true})
				// 		});
		}, []);

		const user = useSelector(state => state.user.user);
		const navigate = useNavigate();

		const [email, setEmail] = useState('');
		const onChangeEmail = e => {
				setEmail(e.target.value)
		};

		const [password, setPassword] = useState('')
		const onChangePassword = e => {
				setPassword(e.target.value)
		};

		const [name, setName] = React.useState('');

		return (
				<>
						<AppHeader/>

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

														<NavLink to="/login">
																<p className={`text text_type_main-medium ${styles.buttonLink}`}>
																		Выход
																</p>
														</NavLink>
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
