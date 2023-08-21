import { useEffect , useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"



function LoginPage() {
   const navigate = useNavigate()
   const {user, handleUserLogin} = useAuth()
   const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if(user) {
            navigate('/')
}
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
    

  return (
    <div className="auth--container">
      <div className="form--wrapper">
      <form onSubmit={(e) => {handleUserLogin(e,credentials)}}>
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
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
        </div>

        <div className="field--wrapper">
          <button className="btn btn--lg btn--main" type="submit">Login</button>
        </div>
        <p>Dont have an account? Register  <Link to="/register"> here </Link> </p>
      </form>
      </div>
    </div>
  )
}

export default LoginPage