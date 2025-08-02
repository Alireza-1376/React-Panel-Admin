import { createContext, useState } from "react";

export const ModalContext =createContext();

function ModalProvider({children}){
    const [showModal , setShowModal] =useState(false)
    const [editModal , setEditModal] =useState(false)
    const [addProperty , setAddProperty] =useState(false)
    const [showDetail , setShowDetail] =useState(false)
    return <ModalContext.Provider value={{showDetail,setShowDetail,showModal , setShowModal ,editModal ,setEditModal,addProperty,setAddProperty}}>{children}</ModalContext.Provider>
}
export default ModalProvider ;