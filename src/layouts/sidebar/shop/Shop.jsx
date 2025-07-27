import { useContext } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaCopyright } from "react-icons/fa6";
import { FaCube } from "react-icons/fa6";
import { FaPagelines } from "react-icons/fa6";
import { FaPalette } from "react-icons/fa6";
import { FaPercent } from "react-icons/fa6";
import { SidebarContext } from "../../../contexts/sidebarContext";

const Shop = () => {
    const {openSidebar} =useContext(SidebarContext)
    return (
         <div className="space-y-1.5 px-4">
                <h2
                  className={`${
                    openSidebar == false ? "w-0 overflow-hidden opacity-0" : "w-full"
                  } text-center text-blue-400 text-nowrap transition-all duration-300 `}
                >
                  فروشگاه
                </h2>
                <div>
                  <a
                    href=""
                    className={`${
                      openSidebar == false ? "justify-center" : ""
                    }  flex items-center gap-4 text-sm`}
                  >
                    <FaBarsStaggered size={18} />
                    <span className={`${openSidebar == false ? "w-0 overflow-hidden opacity-0" : "w-32"} text-nowrap transition-all duration-300`}>
                      مدیریت گروه محصول
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
                    <FaCube size={18} />
                    <span className={`${openSidebar == false ? "w-0 overflow-hidden opacity-0" : "w-32"} text-nowrap transition-all duration-300`}>
                      مدیریت محصول
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
                    <FaCopyright size={18} />
                    <span className={`${openSidebar == false ? "w-0 overflow-hidden opacity-0" : "w-32"} text-nowrap transition-all duration-300`}>
                      مدیریت برندها
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
                    <FaPagelines size={18} />
                    <span className={`${openSidebar == false ? "w-0 overflow-hidden opacity-0" : "w-32"} text-nowrap transition-all duration-300`}>
                      مدیریت گارانتی ها
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
                    <FaPalette size={18} />
                    <span className={`${openSidebar == false ? "w-0 overflow-hidden opacity-0" : "w-32"} text-nowrap transition-all duration-300`}>
                      مدیریت رنگ ها{" "}
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
                    <FaPercent size={18} />
                    <span className={`${openSidebar == false ? "w-0 overflow-hidden opacity-0" : "w-32"} text-nowrap transition-all duration-300`}>مدیریت تخفیف ها</span>
                  </a>
                </div>
              </div>
    );
}

export default Shop;
