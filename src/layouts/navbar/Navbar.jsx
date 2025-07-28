import { FaGripVertical } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaBars } from "react-icons/fa6";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
const Navbar = () => {
  const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
  return (
    <nav
      onClick={() => {
        setOpenSidebar(false);
      }}
      className="bg-gray-800 flex justify-between items-center h-[8vh] px-4 fixed top-0 right-0 left-0"
    >
      <div className="flex items-center gap-3">
        <FaBars
          onClick={(e) => {
            setOpenSidebar(!openSidebar);
            e.stopPropagation();
          }}
          size={24}
          color="white"
          className="inline md:hidden cursor-pointer"
        />
        <img
          className="w-12 h-12 hidden md:inline rounded-full"
          src="./public/images/admin.jpg"
          alt=""
        />
      </div>
      <ul className="flex gap-4 items-center">
        <li>
          <HiMagnifyingGlass size={24} className="text-white cursor-pointer" />
        </li>
        <li className="relative">
          <FaRegBell size={24} className="text-white cursor-pointer" />
          <span className="absolute bg-orange-300 px-1 text-xs -top-1 left-4 rounded-full">
            4
          </span>
        </li>
        <li>
          <FaGripVertical size={24} className="text-white cursor-pointer" />
        </li>
        <li>
          <img
            className="w-12 h-12 inline md:hidden rounded-full"
            src="./public/images/admin.jpg"
            alt=""
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
