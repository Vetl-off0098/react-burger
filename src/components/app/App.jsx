import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import Main from "../main/Main";
import Login from "../../pages/login/Login";
import Registration from "../../pages/registration/Registration";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import {RequireAuth} from "../../hoc/RequireAuth";
import Profile from "../../pages/profile/profile";
import api from "../../utils/api";
import {getCookie} from "../../utils/cookie";
import checkResponse from "../../utils/check-response";
import {addUserAction, setAuthChecked} from "../../services/reducers/userReducer";
import {useDispatch} from "react-redux";
import {RefreshTokenFetch} from "../../utils/refreshTokenFetch";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${api}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      });

      const json = await checkResponse(data);
      console.log(json)

      dispatch(addUserAction(json.user));
      dispatch(setAuthChecked(true));
    }

    fetchData()
      .catch(e => {
        console.error(e)
        if (e.message === 'jwt expired') {
          RefreshTokenFetch((params) => dispatch(addUserAction(params)));
        } else {
          navigate('/login', {replace: true})
        }
      });
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>
      } />
    </Routes>
  );
}

export default App;
