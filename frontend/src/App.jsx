import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewPass from "./pages/NewPass";
import ForgotPass from "./pages/ForgotPass";
import ConfirmAccount from "./pages/ConfirmAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPass />} />
          <Route path="forgot-password/:token" element={<NewPass />} />
          <Route path="confirm-account/:id" element={<ConfirmAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
