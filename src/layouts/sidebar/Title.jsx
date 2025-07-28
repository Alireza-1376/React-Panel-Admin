import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";

const Title = ({ title }) => {
  const { openSidebar } = useContext(SidebarContext);
  return (
    <div>
      <h2
        className={`${
          openSidebar == false ? "w-0 overflow-hidden opacity-0" : "w-full"
        } text-center text-blue-400 mt-2 text-nowrap transition-all duration-300`}
      >
        {title}
      </h2>
    </div>
  );
};

export default Title;
