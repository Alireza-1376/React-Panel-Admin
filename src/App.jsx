import { useState } from "react";
import { SidebarContext } from "./contexts/sidebarContext";
import "./index.css";
import Navbar from "./layouts/navbar/Navbar";
import Sidebar from "./layouts/sidebar/Sidebar";
import Page from "./pages/Page";
const App = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
   <SidebarContext.Provider value={{openSidebar ,setOpenSidebar}}>
    <div>
    <Navbar/>
    <div className="flex">
      <Sidebar/>
      <Page/>
    </div>
   </div>
   </SidebarContext.Provider>
  );
};

export default App;
