import { useEffect, useState } from "react";
import Modal from "../../components/Modal";

const ModalRoles = ({setShowModal ,editRoleItem ,setEditRoleItem}) => {
    const [reInitialValue , setReInitialValue] =useState(null)

    useEffect(()=>{
        if(editRoleItem){
            setReInitialValue(editRoleItem)
            setEditRoleItem(null)
        }else{
            setReInitialValue(null)
        }
    },[])

    return (
        <Modal
            title={reInitialValue!=null ? "ویرایش نقش" : "افزودن نقش کاربر"}
            screen={true}
        >
            <form className="text-center space-y-4 mt-4 p-4">
                <div className="flex justify-center text-sm md:text-base">
                    <button className="bg-blue-300/50 border border-gray-400 w-32 py-2 px-4">عنوان نقش</button>
                    <input placeholder="فقط از حروف فارسی و لاتین استفاده کنید" as="textarea" rows={5} type="text" className="focus:outline-none w-3/4 md:w-1/2 border border-gray-400 p-2" />
                </div>
                <div className="flex justify-center text-sm md:text-base">
                    <button className="bg-blue-300/50 border border-gray-400 w-32 py-2 px-4">توضیحات نقش</button>
                    <input placeholder="فقط از حروف فارسی و لاتین استفاده کنید" as="textarea" rows={5} type="text" className="focus:outline-none w-3/4 md:w-1/2 border border-gray-400 p-2" />
                </div>
                <div className="flex gap-4 justify-center items-center">
                    <button type="submit" className="bg-blue-600 text-white px-10 py-2 rounded-md">{reInitialValue!=null ? "ویرایش" : "ذخیره"}</button>
                    <button onClick={() => { setShowModal(false) }} type="button" className="text-white bg-gray-600 px-6 rounded-md py-2">انصراف</button>
                </div>
            </form>
        </Modal>
    );
}

export default ModalRoles;
