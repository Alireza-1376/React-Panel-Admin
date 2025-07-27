import { useContext } from "react";
import { FaBasketShopping } from "react-icons/fa6";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { IoIosCar } from "react-icons/io";
import { SidebarContext } from "../../../contexts/sidebarContext";
const Orders = () => {
    const {openSidebar} =useContext(SidebarContext)
    return (
        <div className={`space-y-1.5 px-4`}>
                <h2
                  className={`${
                    openSidebar == false ? "w-0 overflow-hidden text-nowrap opacity-0" : "w-full"
                  } text-center text-blue-400 mt-2`}
                >
                  سفارشات و سبد
                </h2>
                
                <div>
                  <a
                    href=""
                    className={`${
                      openSidebar == false ? "justify-center" : ""
                    }  flex items-center gap-4 text-sm`}
                  >
                    <FaBasketShopping  size={18} />
                    <span className={`${openSidebar == false ? "w-0 overflow-hidden text-nowrap opacity-0" : "w-full"} transition-all duration-300 text-nowrap`}>
                      مدیریت سبد ها
                    </span>
                  </a>
                </div>
                <div>
                  <a
                    href=""
                    className={`${
                      openSidebar == false ? "justify-center" : ""
                    }  flex items-center gap-4 text-sm`}
                  >
                    <HiMiniShoppingCart size={18} />
                    <span className={`${openSidebar == false ? "w-0 overflow-hidden text-nowrap opacity-0" : "w-full"} transition-all duration-300 text-nowrap`}>
                     مدیریت سفارشات 
                    </span>
                  </a>
                </div>
                <div>
                  <a
                    href=""
                    className={`${
                      openSidebar == false ? "justify-center" : ""
                    }  flex items-center gap-4 text-sm`}
                  >
                    <IoIosCar size={18} />
                    <span className={`${openSidebar == false ? "w-0 overflow-hidden text-nowrap opacity-0" : "w-full"} transition-all duration-300 text-nowrap `}>مدیریت نحوه ارسال</span>
                  </a>
                </div>
              </div>
    );
}

export default Orders;
