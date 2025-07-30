import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import Icon from "../layouts/sidebar/Icons";

const Modal = ({children , title}) => {
    const {setShowModal} = useContext(ModalContext)
    return (
        <div className="bg-gray-100 w-screen h-screen absolute overflow-x-hidden top-0 right-0 left-0 z-30 bottom-0">
            <div className="flex justify-between items-center border-b border-gray-300 p-4">
                <h2 className="text-2xl">{title}</h2>
                <button onClick={() => {setShowModal(false)}}>
                    <Icon name="xMark" size={30} />
                </button>
            </div>
            {children}
        </div>
    );
}

export default Modal;
