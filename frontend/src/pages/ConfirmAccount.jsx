import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alert"
import axiosClient from "../config/axiosClient"

const ConfirmAccount = () => {

  const [alert, setAlert] = useState({})
  const [confirmedAccount, setconfirmedAccount] = useState(false)
  const params = useParams()
  const { token } = params

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `/users/confirm/${token}`;
        const { data } = await axiosClient(url);
  
        setAlert({
          msg: data.msg,
          error: false,
        });

        setconfirmedAccount(true)

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
  
    confirmAccount();
  }, []);

  const { msg } = alert

  return (
    <>
      <h1 className="text-violet-600 font-black text-6xl capitalize">Confirm your account and start your {''}
        <span className="text-slate-600"> projects</span>
      </h1>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        { msg && <Alerta alert={alert} />}

        {confirmedAccount && (
          <Link
            className="block text-center my-5 text-slate-800 text-sm" 
            to="/">
             Log in
          </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount