import Room from './pages/Room'
import './index.css'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router,  Routes,Route } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import { AuthProvider } from './utils/AuthContext'
import  RegisterPage from './pages/RegisterPage'




function App() {
  

  return (
    <Router>
       <AuthProvider>
      <Routes>
         <Route path="/login" element={<LoginPage />} />
         <Route element={<PrivateRoutes />}> 
         <Route path="/" element={ <Room />} />
         </Route>
         <Route path="/register" element={ <RegisterPage />} />
      </Routes>
      </AuthProvider>
    </Router>
    
  )
}

export default App
