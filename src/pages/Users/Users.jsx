import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";





const Users = () => {
    const { showModal, setShowModal ,editModal, setEditModal } = useContext(ModalContext)
    const data = [
        {
            id: 1,
            category: "علیرضا حبیبی",
            phoneNumber: "09303163279",
            email: "alireza@gmail.com",
            role: "کاربر",
            signup: "1404/10/08"
        }

    ];
    const dataInfo = [
        { field: "id", value: "#" },
        { field: "category", value: "نام و نام خانوادگی" },
        { field: "phoneNumber", value: "موبایل" },
        { field: "email", value: "ایمیل" },
        { field: "role", value: "نقش" },
        { field: "signup", value: "تاریخ ثبت نام" },
    ];

    const tabelActions = {
        title: "عملیات",
        icons: (id) => {
            return (
                <div className="flex items-center justify-center gap-2">
                    <button onClick={()=>{setEditModal(true)}} className="text-yellow-500">
                        <Icon name="pen" size={16} />
                    </button>
                    <button className="text-red-500 flex justify-center items-center">
                        <Icon name="xMark" size={16} />
                    </button>
                </div>
            )
        },

    }
    return (
        <div>
            <div className="mt-[72.5px] overflow-hidden">
                <h2 className="text-center text-2xl py-6">مدیریت کاربران</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel numOfData={2} data={data} dataInfo={dataInfo} tabelActions={tabelActions} title="جستجو" placeholder="قسمتی از نام یا نام خانوادگی را وارد کنید" />
                </div>

                {/* {showModal && <ModalBasket />} */}
                {/* {editModal && <EditBasket />} */}

            </div>
        </div>
    );
}

export default Users;
