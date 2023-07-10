import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert"
import axios from "axios"

const Register = () => {

  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[repeatPassword, setRepeatPassword] = useState('');
  const[alert, setAlert] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if([name, email, password, repeatPassword].includes('')) {
      setAlert({
        msg: 'Please fill all the required fields',
        error: true
      })
      return
    } 

    if(password !== repeatPassword) {
      setAlert({
        msg: 'The passwords are not the same',
        error: true
      })
      return
    }

    if(password < 6) {
      setAlert({
        msg: 'Not enough characters, please add more than 6 characters',
        error: true
      })
      return
    }

    setAlert({})

    try {
      const { data } = await axios.post('http://localhost:4000/api/users', 
      {name, email, password})

      setAlert({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  } 

  

  const {msg} = alert

  return (
    <>
      <h1 className="text-violet-600 font-black text-6xl capitalize">Create your account and start your {''}
        <span className="text-slate-600"> projects</span>
      </h1>

      <form 
        className="my-10 bg-white shadow rounded-lg py-5 px-10"
        onSubmit={handleSubmit}>

        <div className="my-5">
          <label className="text-gray-600 block text-xl font-bold" 
                 htmlFor="name"
          >Name</label>
          <input 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
            id="name"
            type="name" 
            placeholder="What is your name?"
            value={name}
            onChange={e => setName(e.target.value)}/>
        </div>

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
            onChange={e => setEmail(e.target.value)}/>
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
            onChange={e => setPassword(e.target.value)}/>
        </div>

        <div className="my-5">
          <label className="text-gray-600 block text-xl font-bold" 
                 htmlFor="vpassword"
          >Verify your password</label>
          <input 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
            id="vpassword"
            type="password" 
            placeholder="Repeat your password"
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}/>
        </div>

        { msg && <Alert alert={alert} /> }

        <input 
          type="submit"
          value="Sing up" 
          className="bg-violet-600 mb-5 w-full py-3 text-white font-bold rounded 
                     hover:cursor-pointer hover:bg-violet-700 transition-colors"
        />
      </form>

      <nav>
        <Link
          className="block text-center my-5 text-slate-800 text-sm" 
          to="/">
            Do you already have an account? Login
        </Link>
      </nav>
    </>
  )
}

export default Register