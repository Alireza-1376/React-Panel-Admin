import { useContext } from "react";
import { VscDashboard } from "react-icons/vsc";
import { SidebarContext } from "../../../contexts/sidebarContext";
const Dashboard = () => {
    const {openSidebar} =useContext(SidebarContext)
    return (
    <div className="text-center  mt-2">
        <a href=""  className={`${openSidebar == false ? "justify-center" : ""} px-4 flex items-center gap-4 text-sm`}>
          <VscDashboard size={22} />
          <span className={`${openSidebar == false ? "w-0 overflow-hidden" : "w-32"} text-nowrap text-start transition-all duration-300`}>داشبورد</span>
        </a>
    </div>
    );
}

export default Dashboard;
