import { FaGripVertical } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaBars } from "react-icons/fa6";
import { useContext, useState } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import Icon from "../sidebar/Icons";
import { ModalContext } from "../../contexts/ModalContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { openSidebar, setOpenSidebar} = useContext(SidebarContext);
  const {gripVertical , setGripVertical} = useContext(ModalContext)
  const state =useSelector(state =>state.user.user)

  return (
    <nav
      onClick={() => {
        setOpenSidebar(false);
      }}
      className="bg-gray-800 flex justify-between items-center py-3 px-4 h-[8vh] fixed z-30 top-0 right-0 left-0"
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
          src="../public/images/admin.jpg"
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
        <li onClick={(e)=>{setGripVertical(!gripVertical);e.stopPropagation()}} className=" relative">
          <FaGripVertical size={24} className="text-white cursor-pointer" />
          {gripVertical ? <div className="absolute bg-white w-40 left-0 top-[42px] rounded p-2 shadow-md">
            <p className="text-center mb-4">{`${state.first_name} ${state.last_name}` || state.user_name}</p>
            <div className="flex items-center gap-6 hover:bg-gray-200 cursor-pointer mb-3">
              <Icon name="dashboard" size={20} />
              <span>داشبورد</span>
            </div>
            <div className="flex items-center gap-6 hover:bg-gray-200 cursor-pointer mb-3">
              <Icon name="send" size={20} />
              <span>تیکت ها</span>
            </div>
            <div className="flex items-center gap-6 hover:bg-gray-200 cursor-pointer mb-2">
              <Icon name="message" size={20} />
              <span>پیام ها</span>
            </div>
            <hr />
            <Link to="/logout" className="flex items-center gap-6 hover:bg-gray-200 cursor-pointer mt-2">
              <Icon name="power" size={20} />
              <span>خروج</span>
            </Link>
          </div> : null}

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
