import { useContext } from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import Dashboard from "./dashboard/Dashboard";
import Shop from "./shop/Shop";
import Orders from "./orders/Orders";
import Users from "./users/Users";
import { SidebarContext } from "../../contexts/SidebarContext";
import Communications from "./communications/Communications";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
  const state =useSelector(state =>state.user.user);
  return (
    <div className={`${openSidebar == true ? "md:w-80 w-64" : "md:w-20 w-0 overflow-hidden"} md:mt-[8vh] h-[92vh] gap-1 transition-all duration-300 flex flex-col bg-gray-800 text-white md:relative fixed bottom-0 z-20`}>
      <div onClick={() => {setOpenSidebar(!openSidebar)}} className=" absolute top-2 left-1 hidden md:flex border rounded-full cursor-pointer">
        <HiArrowSmallLeft size={24} className={`${openSidebar == true ? "rotate-180" : ""} transition-all duration-300 `}/>
      </div>
      <div className=" rounded-full mt-12 w-full flex items-center flex-col">
        <img className="rounded-full w-14 h-14 border p-0.5 border-white" src="/images/alireza.jpg" alt=""/>
        <p className={`text-xs pt-1 transition-all duration-300 text-nowrap${openSidebar == false ? "w-0 overflow-hidden opacity-0" : "w-full"}`}>{`${state.first_name} ${state.last_name}` || state.user_name}</p>
      </div>

      <Dashboard openSidebar={openSidebar} />

      <Shop openSidebar={openSidebar} />

      <Orders openSidebar={openSidebar} />

      <Users openSidebar={openSidebar} />
      
      <Communications openSidebar={openSidebar}/>
    </div>
  );
};

export default Sidebar;
