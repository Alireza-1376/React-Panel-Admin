import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import ModalOrders from "./ModalOrders";
import DetailOrders from "./DetailOrders";





const Orders = () => {
    const { showModal ,showDetail, setShowDetail } = useContext(ModalContext)
    const data = [
        {
            id: 1,
            category: "50",
            userName: "علیرضا حبیبی",
            status: "پرداخت شده",
            paymentDate: "1400/10/12",
            amountPaid: "100 هزار تومان",
        }

    ];
    const dataInfo = [
        { field: "id", value: "#" },
        { field: "category", value: "آی دی مشتری" },
        { field: "userName", value: "نام مشتری" },
        { field: "status", value: "وضعیت" },
        { field: "paymentDate", value: "تاریخ پرداخت" },
        { field: "amountPaid", value: "مبلغ پرداختی" },
    ];

    const tabelActions = {
        title: "عملیات",
        icons: (id) => {
            return (
                <div className="flex items-center justify-center gap-2">
                    <button onClick={()=>{setShowDetail(true)}} className="text-blue-500">
                        <Icon name="miniShopingCart" size={16} />
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
                <h2 className="text-center text-2xl py-6">مدیریت سفارشات</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel numOfData={2} data={data} dataInfo={dataInfo} tabelActions={tabelActions} title="جستجو" placeholder="قسمتی از نام یا شماره سفارش را وارد کنید" />
                </div>

                {showModal && <ModalOrders />}
                {showDetail && <DetailOrders />}

            </div>
        </div>
    );
}

export default Orders;
