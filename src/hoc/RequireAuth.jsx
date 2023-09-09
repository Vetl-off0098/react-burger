import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const RequireAuth = ({onlyUnAuth = false, component}) => {
		const location = useLocation();
		const isAuthChecked = useSelector(state => state.user.isAuthChecked);
		const user = useSelector(state => state.user.user);

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
export const OnlyUnAuth = ({ component }) => (
		<RequireAuth onlyUnAuth={true} component={component} />
);
