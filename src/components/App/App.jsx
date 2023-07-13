import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage/HomePage';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import { ResettPasswordPage } from '../../pages/ResetPasswordPage/ResetPasswordPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';

function App() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResettPasswordPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/ingredients/:id" />
        </Routes>
      </Router>
    )
}

export default App;