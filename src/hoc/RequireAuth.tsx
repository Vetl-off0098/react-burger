import {useLocation, Navigate} from "react-router-dom";
import {useTypedSelector} from "../hook/useTypedSelector";
import React, {ReactElement} from "react";
import Preloader from "../components/preloader/Preloader";

interface IRequireAuth {
	component: ReactElement,
	onlyUnAuth?: boolean
}

const RequireAuth: React.FC<IRequireAuth> = ({onlyUnAuth = false, component}) => {
	const location = useLocation();
	const isAuthChecked = useTypedSelector(state => state.userAuth.isAuthChecked);
	const user = useTypedSelector(state => state.userAuth.data);

	if (!isAuthChecked) {
		return <Preloader />;
	}

	if (onlyUnAuth && user) {
		const { from } = location.state || { from: { pathname: "/" } };
		return <Navigate to={from} />;
	}

	if (!onlyUnAuth && !user) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return component
}

export const OnlyAuth = RequireAuth;

export const OnlyUnAuth: React.FC<IRequireAuth> = ({ component }) => (
	<RequireAuth onlyUnAuth={true} component={component} />
);
