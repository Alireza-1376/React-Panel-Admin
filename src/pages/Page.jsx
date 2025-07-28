import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";

const Page = () => {
  const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
  return (
    <div
      onClick={() => {
        setOpenSidebar(false);
      }}
      className="bg-yellow-100 w-full min-h-[92vh]"
    >
      lorem1000
    </div>
  );
};

export default Page;
