import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Main from "../main/Main";
import Login from "../../pages/login/Login";
import Registration from "../../pages/registration/Registration";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import {OnlyAuth} from "../../hoc/RequireAuth";
import Profile from "../../pages/profile/profile";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../services/async-actions/user";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {isLoadingAction} from "../../services/actions/isLoadingActions";
import {fetchIngredients} from "../../services/async-actions/ingredients";
import IngredientInfo from "../../pages/ingredient-info/ingredient-info";
import Layout from "../layout/Layout";
import {useTypedSelector} from "../../hook/useTypedSelector";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const burger = useTypedSelector(state => state.burger.burger);
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(isLoadingAction(true))
    dispatch(fetchIngredients(burger));
    dispatch(fetchUser());
  }, [dispatch]);

  const closeModal = () => {
    navigate(-1);
  }

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
          <Route path="/ingredients/:ingredientId" element={
            <IngredientInfo />
          } />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredients/:ingredientId" element={
            <Modal onClose={closeModal}>
              <IngredientDetails />
            </Modal>
          } />
        </Routes>
      )}
    </>
  );
}

export default App;
