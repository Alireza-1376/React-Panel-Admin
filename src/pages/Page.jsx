import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import Dashboard from "./Dashboard/Dashboard";

const Page = () => {
  const { setOpenSidebar } = useContext(SidebarContext);
  return (
    <div onClick={() => {setOpenSidebar(false) }} className="bg-[url('./public/images/background.avif')] bg-cover bg-yellow-100 w-full min-h-[92vh]">
      <Dashboard/>
    </div>
  );
};

export default Page;
