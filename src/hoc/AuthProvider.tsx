import {createContext} from "react";
import {fetchLogin} from "../services/async-actions/login";
import {useTypedSelector} from "../hook/useTypedSelector";
import {UserActionTypes} from "../services/types/user";
import {useDispatch} from "../hook/useTypedDispatch";

export const AuthContext: any = createContext(null);

export const AuthProvider = ({children}: any) => {
	const dispatch = useDispatch();
	const user = useTypedSelector(state => state.user.user);
	// const [user, setUser] = useState(null);

	interface INewUser {
		email: string,
		name: string,
		password?: string
	}

	const signIn = (newUser: INewUser, cb: () => void) => {
		// setUser(newUser);
		// dispatch(addUserAction(newUser));

		dispatch(fetchLogin(newUser))
		cb();
	};
	const signOut = (cb: () => void) => {

		// logout
		dispatch({type: UserActionTypes.ADD_USER, payload: {email: '', name: ''}})
		cb();
	};

	const value = {user, signIn, signOut};

	return <AuthContext.Provider value={value}>
		{children}
	</AuthContext.Provider>
}
