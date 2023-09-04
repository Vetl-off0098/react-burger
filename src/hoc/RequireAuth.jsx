import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const RequireAuth = ({children}) => {
		const location = useLocation();
		const isAuthChecked = useSelector(state => state.user.isAuthChecked);
		const user = useSelector(state => state.user.user);

		if (!isAuthChecked) {
				return null;
		}

		if (!user) {
				return <Navigate to='/login' state={{from: location}} />
		}

		return children
}

export {RequireAuth}
