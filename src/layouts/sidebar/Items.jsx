import { useContext } from "react";
import Icon from "./Icons";
import { SidebarContext } from "../../contexts/SidebarContext";

const Item = ({ text, name, size }) => {
  const { openSidebar } = useContext(SidebarContext);
  return (
    <div>
      <a
        href=""
        className={`${
          openSidebar == false ? "justify-center" : ""
        }  flex items-center gap-4 text-sm`}
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
      </a>
    </div>
  );
};

export default Item;
