import { useState, useEffect } from "react"
import { Link,useParams } from "react-router-dom"
import Alert from "../components/Alert"
import axiosClient from "../config/axiosClient"

const NewPass = () => {

  const params = useParams()
  const { token } = params
  const [valid, setValid] = useState(false)
  const [alert, setAlert] = useState([])
  const { msg } = alert
  const [password, setPassword] = useState('')
  const [passwordModified, setPasswordModified] = useState(false)

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/users/forgot-password/${token}`)
        setValid(true)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    }
    checkToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if(password.length < 6) {
      setAlert({
        msg: 'Not enough characters, please add more than 6 characters',
        error: true
      })
      return
    }

    try {
      const url = `/users/forgot-password/${token}`
      const { data } = await axiosClient.post(url, { password })
      setAlert({
        msg: data.msg,
        error: false
      })
      setPasswordModified(true)
      setPassword('')
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  return (
    <>
      <h1 className="text-violet-600 font-black text-6xl capitalize">Change your password & do not lose your {''}
        <span className="text-slate-600"> projects</span>
      </h1>

      {msg && <Alert alert={alert} />}

      { valid && (
         <form className="my-10 bg-white shadow rounded-lg py-5 px-10" onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="text-gray-600 block text-xl font-bold" 
                  htmlFor="password"
            >New password</label>
            <input 
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
              id="password"
              type="password" 
              placeholder="Insert your password"
              value={password}
              onChange={e => setPassword(e.target.value)}/>
          </div>

          <input 
            type="submit"
            value="Change password" 
            className="bg-violet-600 mb-5 w-full py-3 text-white font-bold rounded 
                      hover:cursor-pointer hover:bg-violet-700 transition-colors"
          />
        </form>
      )}

      {passwordModified && (
        <Link
          className="block text-center my-5 text-slate-800 text-sm" 
          to="/">
            Log in
        </Link>
      )}

    </>
  )
}

export default NewPass