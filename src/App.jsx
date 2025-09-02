import { useLocation } from "react-router-dom";
import Admin from "./Auth/Admin";
import Login from "./Auth/Login";
import ModalProvider from "./contexts/ModalContext";
import AdminContext from "./contexts/SidebarContext";
import "./index.css";
import { Toaster } from "react-hot-toast";

import { Provider } from "react-redux";
import store from "./redux/store";
const App = () => {
  const location = useLocation();

  return (
    <Provider store={store}>
      <ModalProvider>
        <AdminContext>
          <Toaster />
          {location.pathname.includes('/auth/login') ? <Login /> : <Admin />}
        </AdminContext>
      </ModalProvider>
    </Provider>
  );
};

export default App;
