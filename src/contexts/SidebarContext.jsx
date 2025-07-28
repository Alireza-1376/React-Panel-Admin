import { createContext, useState } from "react";

export const SidebarContext =createContext();

const AdminContext =({children})=>{
    const [openSidebar, setOpenSidebar] = useState(false);
    return <SidebarContext.Provider value={{openSidebar,setOpenSidebar}}>{children}</SidebarContext.Provider>
}
export default AdminContext ;