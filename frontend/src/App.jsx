import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewPass from "./pages/NewPass";
import ForgotPass from "./pages/ForgotPass";
import ConfirmAccount from "./pages/ConfirmAccount";
import ProtectedRoute from "./layouts/ProtectedRoute"
import Projects from "./pages/Projects"
import CreateProject from "./pages/CreateProject";
import Project from "./pages/Project";

import { AuthProvider } from "./context/AuthProvider";
import { ProjectsProvider } from "./context/ProjectProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPass />} />
              <Route path="forgot-password/:token" element={<NewPass />} />
              <Route path="confirm-account/:token" element={<ConfirmAccount />} />
            </Route>

            <Route path="/projects" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<CreateProject />} />
              <Route path=":id" element={<Project />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
