import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import ModalGurantys from "./ModalGurantys";


const Guranty = () => {
    const { showModal, setShowModal } = useContext(ModalContext)
    const data = [
        {
            id: 1,
            title: "گارانتی 1",
            periodGuranty: "12 ماه",
            desc: "توضیحات اجمالی درباره این گارانتی",
        },
        {
            id: 2,
            title: "گارانتی 1",
            periodGuranty: "12 ماه",
            desc: "توضیحات اجمالی درباره این گارانتی",
        },
        {
            id: 3,
            title: "گارانتی 1",
            periodGuranty: "12 ماه",
            desc: "توضیحات اجمالی درباره این گارانتی",
        }
    ];
    const dataInfo = [
        { field: "id", value: "#" },
        { field: "title", value: "عنوان گارانتی" },
        { field: "periodGuranty", value: "مدت گارانتی" },
        { field: "desc", value: "توضیحات" },
    ];
    const tabelActions = {
        title: "عملیات",

        icons: (id) => {
            return (
                <div className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
                    <button className="text-red-500">
                        <Icon name="xMark" size={16} />
                    </button>
                </div>
            )
        },

    }
    return (
        <div>
            <div className="mt-[72.5px] overflow-hidden">
                <h2 className="text-center text-2xl py-6">مدیریت گارانتی ها</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel numOfData={2} data={data} dataInfo={dataInfo} tabelActions={tabelActions} title="جستجو" placeholder="قسمتی از نام عنوان را وارد کنید" />
                </div>

                {showModal && <ModalGurantys />}

            </div>
        </div>
    );
}

export default Guranty;
