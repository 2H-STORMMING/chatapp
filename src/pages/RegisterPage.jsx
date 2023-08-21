import { useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'


function RegisterPage() {
  const { handleUserRegister } = useAuth()
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password1: '',
    password2: ''
  })


  return (
    <div className="auth--container">
      <div className="form--wrapper">
      <form onSubmit={(e) => {handleUserRegister(e,credentials)}}>
      <div className="field--wrapper">
          <label>Username</label>
          <input 
          required
          type="text"
          name="name"
          placeholder="Username" 
          value={credentials.name}
          onChange={(e) => setCredentials({...credentials, name: e.target.value})}
          />
        </div>
        <div className="field--wrapper">
          <label>Email</label>
          <input 
          required
          type="email"
          name="email"
          placeholder="Enter Your email" 
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          />
        </div>
        <div className="field--wrapper">
          <label>Password</label>
          <input 
          required
          type="password"
          name="password"
          placeholder="Enter password" 
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password1: e.target.value})}
          />
        </div>
        <div className="field--wrapper">
          <label>Confirm Password</label>
          <input 
          required
          type="password"
          name="password"
          placeholder="Enter password" 
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password2: e.target.value})}
          />
        </div>

        <div className="field--wrapper">
          <button className="btn btn--lg btn--main" type="submit">Register</button>
        </div>
      </form>
      <p>Do you Already have an account? Login  <Link to="/login"> here </Link> </p>
      </div>
    </div>
  )
}

export default RegisterPage