import {createContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUserAction} from "../services/reducers/userReducer";
import {fetchLogin} from "../services/async-actions/login";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
		const dispatch = useDispatch();
		const user = useSelector(state => state.user.user);
		// const [user, setUser] = useState(null);

		const signIn = (newUser, cb) => {
				// setUser(newUser);
				// dispatch(addUserAction(newUser));

				dispatch(fetchLogin(newUser))
				cb();
		};
		const signOut = (cb) => {

				// logout
				dispatch(addUserAction({email: '', name: ''}));
				cb();
		};

		const value = {user, signIn, signOut};

		return <AuthContext.Provider value={value}>
				{children}
		</AuthContext.Provider>
}
