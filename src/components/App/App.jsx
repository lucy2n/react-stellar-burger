import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Home } from '../../pages/home/home';
import { Login } from '../../pages/login/login';
import { Registration } from '../../pages/registration/registration';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResettPassword } from '../../pages/reset-password/reset-password';
import { Profile } from '../../pages/profile/profile';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { AppHeader } from '../app-header/app-header';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserAuth } from '../../services/user/action';
import { ProfileOrders } from '../../pages/profile-orders/profile-orders';
import { ProfileData } from '../../pages/profile-data/profile-data';
import { RoutePathname } from '../../utils/constants';
import { FeedPage } from '../../pages/feed/feed';

export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  const handleModalClose = () => {
      navigate(-1);
  };

  return (
      <>
          <AppHeader />
          <Routes location={background || location}>
              <Route exact path={RoutePathname.homePage} element={<Home />} />
              <Route path={RoutePathname.ingredientDetailsPage} element={<IngredientDetails />} />

              <Route path={RoutePathname.loginPage} element={<OnlyUnAuth component={<Login />}/>} />
              <Route path={RoutePathname.registerPage} element={<OnlyUnAuth component={<Registration />}/>} />
              <Route path={RoutePathname.forgotPassPage} element={<OnlyUnAuth component={<ForgotPassword />} />} />
              <Route path={RoutePathname.resetPassPage} element={<OnlyUnAuth component={<ResettPassword />} />}/>
              <Route path={RoutePathname.feedPage} element={<FeedPage />}/>

              <Route path={RoutePathname.profilePage} element={<OnlyAuth component={<Profile />} />}>
                  <Route path={RoutePathname.profilePage} element={<OnlyAuth component={<ProfileData />} />}/>
                  <Route path={RoutePathname.ordersPage} element={<OnlyAuth component={<ProfileOrders />} />}/>
              </Route>
          </Routes>

          {background && (
              <Routes>
                  <Route
                  path={RoutePathname.ingredientDetailsPage}
                  element={
                      <Modal onClose={handleModalClose}>
                          <IngredientDetails />
                      </Modal>
                  }
                  />
              </Routes>
          )}
      </>
  );
};