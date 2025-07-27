import { IoIosPeople } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import { FaShieldHalved } from "react-icons/fa6";
import { useContext } from "react";
import { SidebarContext } from "../../../contexts/sidebarContext";

const Users = () => {
    const {openSidebar} =useContext(SidebarContext)
    return (
        <div className={`space-y-1.5 px-4`}>
        <h2
          className={`${
            openSidebar == false ? "w-0 overflow-hidden opacity-0" : "w-full"
          } text-center text-blue-400 mt-2 text-nowrap transition-all duration-300`}
        >
         کاربران و همکاران
        </h2>
        
        <div>
          <a
            href=""
            className={`${
              openSidebar == false ? "justify-center" : ""
            } flex items-center gap-4 text-sm`}
          >
            <IoIosPeople  size={18} />
            <span className={`${openSidebar == false ?"w-0 overflow-hidden opacity-0" : "w-full"} text-nowrap transition-all duration-300`}>
              مشاهده کاربران
            </span>
          </a>
        </div>
        <div>
          <a
            href=""
            className={`${
              openSidebar == false ? "justify-center" : ""
            } flex items-center gap-4 text-sm`}
          >
            <IoIosPerson size={18} />
            <span className={`${openSidebar == false ? "w-0 overflow-hidden opacity-0" : "w-full"} text-nowrap transition-all duration-300`}>
              نقش ها 
            </span>
          </a>
        </div>
        <div>
          <a
            href=""
            className={`${
              openSidebar == false ? "justify-center" : ""
            } flex items-center gap-4 text-sm`}
          >
            <FaShieldHalved size={18} />
            <span className={`${openSidebar == false ? "w-0 overflow-hidden opacity-0" : "w-full"} text-nowrap transition-all duration-300`}> مجوزها </span>
          </a>
        </div>
      </div>
    );
}

export default Users;
