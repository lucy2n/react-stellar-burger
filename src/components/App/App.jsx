import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage/HomePage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import { ResettPasswordPage } from '../../pages/ResetPasswordPage/ResetPasswordPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import AppHeader from '../AppHeader/AppHeader';

function App() {
  const location = useLocation(); // текущий url
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
      navigate(-1);
  };

  return (
    <>
    <AppHeader />
      <Routes location={background || location}>
        <Route exact path="/" element={<HomePage />} />
        <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResettPasswordPage />}/>
        <Route path="/profile" element={<ProfilePage />}/>
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

export default App;