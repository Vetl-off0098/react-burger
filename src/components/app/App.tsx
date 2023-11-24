import React, {useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Main from "../main/Main";
import Feed from "../../pages/feed/feed";
import Login from "../../pages/login/Login";
import Registration from "../../pages/registration/Registration";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import {OnlyAuth} from "../../hoc/RequireAuth";
import Profile from "../../pages/profile/profile";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {isLoadingAction} from "../../services/actions/isLoadingActions";
import {fetchIngredients} from "../../services/async-actions/ingredients";
import IngredientInfo from "../../pages/ingredient-info/ingredient-info";
import Layout from "../layout/Layout";
import {useTypedSelector} from "../../hook/useTypedSelector";
import {useDispatch} from "../../hook/useTypedDispatch";
import FeedInfo from "../../pages/feed-info/feed-info";
import ProfileLayout from "../profile-layout/Profile-layout";
import OrdersProfile from "../../pages/orders-profile/orders-profile";
import FeedInfoDetails from "../feed-info-details/feed-info-details";
import {checkUser} from "../../services/actions/userActions";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const burger = useTypedSelector(state => state.burger.burger);
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(isLoadingAction(true))
    dispatch(fetchIngredients(burger));

    dispatch(checkUser());
  }, [dispatch]);

  const closeModal = () => {
    navigate(-1);
  }

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:number" element={<FeedInfo />} />
          <Route path="/login" element={<OnlyAuth onlyUnAuth={true} component={<Login />} />} />
          <Route path="/registration" element={<OnlyAuth onlyUnAuth={true} component={<Registration />} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route path="/profile/profile" element={<OnlyAuth component={<Profile />} />} />
            <Route path="/profile/orders" element={<OnlyAuth component={<OrdersProfile />} />} />
          </Route>
          <Route path="/profile/orders/:number" element={<OnlyAuth component={<FeedInfo />} />} />
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

          <Route path="/feed/:number" element={
            <Modal onClose={closeModal}>
              <FeedInfoDetails />
            </Modal>
          } />

          <Route path="/profile/orders/:number" element={
            <OnlyAuth component={
              <Modal onClose={closeModal}>
                <FeedInfoDetails />
              </Modal>
            } />
          } />
        </Routes>
      )}
    </>
  );
}

export default App;
