import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";





const Sends = () => {
    const { showModal, setShowModal ,editModal, setEditModal } = useContext(ModalContext)
    const data = [
        {
            id: 1,
            category: "عنوان",
            cost: "25,000 تومان",
            sendTime: "10",
            timeUnite: "روز",
        }

    ];
    const dataInfo = [
        { field: "id", value: "#" },
        { field: "category", value: "عنوان" },
        { field: "cost", value: "هزینه" },
        { field: "sendTime", value: "زمان ارسال" },
        { field: "timeUnite", value: "واحد زمان" },
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
                <h2 className="text-center text-2xl py-6">مدیریت نحوه ارسال</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel numOfData={2} data={data} dataInfo={dataInfo} tabelActions={tabelActions} title="جستجو" placeholder="قسمتی از عنوان را وارد کنید" />
                </div>

                {/* {showModal && <ModalBasket />} */}
                {/* {editModal && <EditBasket />} */}

            </div>
        </div>
    );
}

export default Sends;
