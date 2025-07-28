import AdminContext from "./contexts/SidebarContext";
import "./index.css";
import Navbar from "./layouts/navbar/Navbar";
import Sidebar from "./layouts/sidebar/Sidebar";
import Page from "./pages/Page";
const App = () => {
  return (
    <AdminContext>
      <div className="overflow-hidden">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <Page />
        </div>
      </div>
    </AdminContext>
  );
};

export default App;
