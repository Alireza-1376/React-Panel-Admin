import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import Dashboard from "./Dashboard/Dashboard";
import Category from "./Category/Category";

const Page = () => {
  const { setOpenSidebar } = useContext(SidebarContext);
  return (
    <div onClick={() => {setOpenSidebar(false) }} className="bg-[url('./public/images/background.avif')] h-[100vh] overflow-x-auto bg-cover bg-yellow-100 w-full">
      <Dashboard/>
      {/* <Category /> */}
    </div>
  );
};

export default Page;
