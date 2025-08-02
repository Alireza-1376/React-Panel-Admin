import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";





const Roles = () => {
    const { showModal, setShowModal, editModal, setEditModal } = useContext(ModalContext)
    const data = [
        {
            id: 1,
            category: "نقش شماره 1",
            desc: "توضیحات در مورد این نقش که چیست و کلیات آن کدام است",
        }

    ];
    const dataInfo = [
        { field: "id", value: "#" },
        { field: "category", value: "عنوان" },
        { field: "desc", value: "توضیحات" },
    ];
    const status = {
        status: "فعال",
        statusToggle: () => {
            return (
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">فعال</span>
                </label>
            )
        }
    }
    const tabelActions = {
        title: "عملیات",
        icons: (id) => {
            return (
                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => { setEditModal(true) }} className="text-yellow-500">
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
                <h2 className="text-center text-2xl py-6">مدیریت نقش ها</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel numOfData={2} data={data} dataInfo={dataInfo} status={status} tabelActions={tabelActions} title="جستجو" placeholder="قسمتی از نام نقش را وارد کنید" />
                </div>

                {/* {showModal && <ModalBasket />} */}
                {/* {editModal && <EditBasket />} */}

            </div>
        </div>
    );
}

export default Roles;
