import { useContext } from "react";
import Icon from "./Icons";
import { SidebarContext } from "../../contexts/SidebarContext";
import { NavLink } from "react-router-dom";

const Item = ({ text, name, size ,target}) => {
  const { openSidebar } = useContext(SidebarContext);
  return (
    <div className="">
      <NavLink
      to={target}
        href=""
        className={`${
          openSidebar == false ? "justify-center" : ""
        } flex items-center gap-4 text-sm px-4 py-0.5 transition-all duration-200`}
      >
        <Icon name={name} size={size} />
        <span
          className={`${
            openSidebar == false
              ? "w-0 overflow-hidden text-nowrap opacity-0"
              : "w-full"
          } transition-all duration-300 text-nowrap`}
        >
          {text}
        </span>
      </NavLink>
    </div>
  );
};

export default Item;
