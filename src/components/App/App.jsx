import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage/HomePage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import { ResettPasswordPage } from '../../pages/ResetPasswordPage/ResetPasswordPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { Modal } from '../Modal/Modal';
import { AppHeader } from '../AppHeader/AppHeader';
import { OnlyAuth, OnlyUnAuth } from '../ProtectedRoute/ProtectedRoute';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserAuth } from '../../services/actions/user';
import { ProfileOrdersPage } from '../../pages/ProfileOrdersPage/ProfileOrdersPage';
import { ProfileDataPage } from '../../pages/ProfileDataPage/ProfileDataPage';

export const App = () => {
  const dispatch = useDispatch()
  const location = useLocation(); // текущий url
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [])

  const handleModalClose = () => {
      navigate(-1);
  };

  return (
    <>
    <AppHeader />
      <Routes location={background || location}>
        <Route exact path="/" element={<HomePage />} />
        <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />

        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />}/>} />
        <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />}/>} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResettPasswordPage />} />}/>

        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
          <Route path="/profile" element={<OnlyAuth component={<ProfileDataPage />} />}/>
          <Route path="orders" element={<OnlyAuth component={<ProfileOrdersPage />} />}/>
        </Route>
      </Routes>

      {background && (
        <Routes>
	        <Route
	          path='/ingredients/:ingredientId'
	          element={
	            <Modal onClose={handleModalClose}>
	              <IngredientDetails />
	            </Modal>
	          }
	        />
        </Routes>
      )}
    </>
  )
}