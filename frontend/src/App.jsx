import {BrowserRouter, Routes,Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes';


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
};

function RegisterAndLoggout(){
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAndLoggout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      </BrowserRouter>

    </>
  )
}

export default App
