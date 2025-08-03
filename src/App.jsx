import { Navigate, useLocation } from "react-router-dom";
import Admin from "./Auth/Admin";
import Login from "./Auth/Login";
import ModalProvider from "./contexts/ModalContext";
import AdminContext from "./contexts/SidebarContext";
import "./index.css";
import { Toaster } from "react-hot-toast";
import useLogin from "./hooks/useLogin";
const App = () => {
  const location =useLocation();
  const [isLoading ,isLogin] =useLogin()
  return (
    <ModalProvider>
    <AdminContext>
      <Toaster />
      {location.pathname.includes('/auth/login') ? <Login/> :<Admin />}
    </AdminContext>
    </ModalProvider>
  );
};

export default App;
