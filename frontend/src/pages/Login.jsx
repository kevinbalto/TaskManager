import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Alert from "../components/Alert"
import axiosClient from "../config/axiosClient"
import useAuth from "../hooks/useAuth"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const { setAuth } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault(); 

    if([email, password].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true
      }); 
      return
    }

    try {
      const { data } = await axiosClient.post('/users/login', {email, password})
      setAlert({})
      localStorage.setItem('token', data.token)
      setAuth(data)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const {msg} = alert

  return (
    <>
      <h1 className="text-violet-600 font-black text-6xl capitalize">Login & start your own {''}
        <span className="text-slate-600"> projects</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg py-5 px-10" onSubmit={handleSubmit}>
        <div className="my-5">
          <label className="text-gray-600 block text-xl font-bold" 
                 htmlFor="email"
          >Email</label>
          <input 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
            id="email"
            type="email" 
            placeholder="Insert your email"
            value={email}
            onChange={ e => setEmail(e.target.value) }/>
        </div>

        <div className="my-5">
          <label className="text-gray-600 block text-xl font-bold" 
                 htmlFor="password"
          >Password</label>
          <input 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
            id="password"
            type="password" 
            placeholder="Insert your password"
            value={password}
            onChange={ e => setPassword(e.target.value) }/>
        </div>

        {msg && <Alert alert={alert}/>}

        <input 
          type="submit"
          value="Login" 
          className="bg-violet-600 mb-5 w-full py-3 text-white font-bold rounded 
                     hover:cursor-pointer hover:bg-violet-700 transition-colors"
        />
      </form>

      <nav>
        <Link
          className="block text-center my-5 text-slate-800 text-sm" 
          to="/register">
            Do not have an account? Sign up now!
        </Link>
        <Link
          className="block text-center my-5 text-slate-800 text-sm" 
          to="/forgot-password">
            Forgot password?
        </Link>
      </nav>
    </>
  )
}

export default Login