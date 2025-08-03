import { Toaster } from "react-hot-toast";
import Admin from "./Auth/Admin";
import ModalProvider from "./contexts/ModalContext";
import AdminContext from "./contexts/SidebarContext";
import "./index.css";
import { Navigate, useLocation } from "react-router-dom";
// import LogIn from "./Auth/Login";
import Login from "./pages/Login/Login";
import useLogin from "./hooks/useLogin";


const App = () => {
  const location =useLocation();
  const [isLogin ,isLoading] =useLogin()
  return (
    <ModalProvider>
      <AdminContext>
        <Toaster />
        {location.pathname.includes("/auth/login") ? (isLogin==true ? <Navigate to="/" /> : <Login/>)  : <Admin /> }
      </AdminContext>
    </ModalProvider>
  );
};

export default App;
