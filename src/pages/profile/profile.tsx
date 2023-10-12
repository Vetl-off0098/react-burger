import React, {useEffect, useState} from 'react';
import styles from './profile.module.css';
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useTypedSelector} from "../../hook/useTypedSelector";

function Profile () {
	const user = useTypedSelector(state => state.user.user);

	useEffect(() => {
		if (user?.name) setName(user.name);
		if (user?.email) setEmail(user.email);
	}, [user]);

	const [email, setEmail] = useState<string>('');
	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	};

	const [password, setPassword] = useState<string>('')
	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	};

	const [name, setName] = useState<string>('');

	return (
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
	)
}

export default Profile;
