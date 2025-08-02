import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";
import Icon from "../layouts/sidebar/Icons";

const Modal = ({ children, title ,screen}) => {
    const { setShowModal ,setEditModal ,setAddProperty ,setShowDetail } = useContext(ModalContext);
    return (
        <>
        {screen==false ? <div onClick={()=>{setShowModal(false)}} className="w-screen h-screen bg-slate-600/50 z-20 right-0 left-0 absolute top-0"></div> : null}
        <div className={`${screen==true ? "w-screen h-screen  top-0 right-0 left-0 bottom-0" : "w-[94%] max-w-screen-sm right-[50%] translate-x-[50%] top-[10%] rounded-md"} bg-gray-100 absolute overflow-x-hidden z-30`}>
            <div className="flex justify-between items-center border-b border-gray-300 p-4">
                <h2 className="text-2xl">{title}</h2>
                <button
                    onClick={() => {
                        setShowModal(false);
                        setEditModal(false);
                        setAddProperty(false);
                        setShowDetail(false)
                    }}
                >
                    <Icon name="xMark" size={30} />
                </button>
            </div>
            {children}
        </div>
        </>
    );
};

export default Modal;
