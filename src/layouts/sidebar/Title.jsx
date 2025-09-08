import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { usePermissions } from "../../hooks/usePermissions";

const Title = ({ title ,pTitle}) => {
  const { openSidebar } = useContext(SidebarContext);
  const permission =usePermissions(pTitle)
  return (
    <div>
      {permission && <h2
        className={`${
          openSidebar == false ? "w-0 overflow-hidden opacity-0" : "w-full"
        } text-center text-blue-400 mt-1.5 text-nowrap transition-all duration-300`}
      >
        {title}
      </h2>}
    </div>
  );
};

export default Title;
