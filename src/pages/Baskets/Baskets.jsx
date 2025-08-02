import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import ModalBasket from "./ModalBasket";
import EditBasket from "./EditBasket";




const Baskets = () => {
    const { showModal, setShowModal ,editModal, setEditModal } = useContext(ModalContext)
    const data = [
        {
            id: 1,
            category: "50",
            userName: "علیرضا حبیبی",
            date: "1400/10/12",
            basketPrice: "100 هزار تومان",
            status: "فعال"
        }

    ];
    const dataInfo = [
        { field: "id", value: "#" },
        { field: "category", value: "آی دی مشتری" },
        { field: "userName", value: "نام مشتری" },
        { field: "date", value: "تاریخ" },
        { field: "basketPrice", value: "مبلغ کل سبد" },
        { field: "status", value: "وضعیت" },
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
                <h2 className="text-center text-2xl py-6">مدیریت سبد خرید</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel numOfData={2} data={data} dataInfo={dataInfo} tabelActions={tabelActions} title="جستجو" placeholder="قسمتی از نام یا شماره سبد را وارد کنید" />
                </div>

                {showModal && <ModalBasket />}
                {editModal && <EditBasket />}

            </div>
        </div>
    );
}

export default Baskets;
