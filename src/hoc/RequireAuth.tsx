import {useLocation, Navigate} from "react-router-dom";
import {useTypedSelector} from "../hook/useTypedSelector";

const RequireAuth = ({onlyUnAuth = false, component}: any) => {
	const location = useLocation();
	const isAuthChecked = useTypedSelector(state => state.user.isAuthChecked);
	const user = useTypedSelector(state => state.user.user);

	if (!isAuthChecked) {
			return null;
	}

	if (onlyUnAuth && user) {
			console.log('was called 10')
			console.log(location.state)
			const { from } = location.state || { from: { pathname: "/" } };
			return <Navigate to={from} />;
	}

	if (!onlyUnAuth && !user) {
			return <Navigate to="/login" state={{ from: location }} />;
	}

	return component
}

export const OnlyAuth = RequireAuth;
export const OnlyUnAuth: any = ({ component }: any) => (
		<RequireAuth onlyUnAuth={true} component={component} />
);
