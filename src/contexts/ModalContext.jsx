import { createContext, useState } from "react";

export const ModalContext = createContext();

function ModalProvider({ children }) {
    const [showModal, setShowModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [addProperty, setAddProperty] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [gripVertical, setGripVertical] = useState(false);
    return <ModalContext.Provider value={{ gripVertical, setGripVertical, showDetail, setShowDetail, showModal, setShowModal, editModal, setEditModal, addProperty, setAddProperty }}>{children}</ModalContext.Provider>
}
export default ModalProvider;