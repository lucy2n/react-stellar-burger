import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import { HomePage } from '../../pages/HomePage/HomePage';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" />
          <Route path="/register" />
          <Route path="/forgot-password" />
          <Route path="/reset-password" />
          <Route path="/profile" />
          <Route path="/ingredients/:id" />
        </Routes>
      </BrowserRouter>
    )
}

export default App;