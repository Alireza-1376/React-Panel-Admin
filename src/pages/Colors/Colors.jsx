import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import ModalProduct from "../Products/ModalProduct";
import Icon from "../../layouts/sidebar/Icons";
import ModalColors from "./ModalColors";

const Colors = () => {
    const { showModal, setShowModal } = useContext(ModalContext)
    const data = [
        {
            id: 1,
            category: "مشکی",
            codeColor: "green",
            color: "black",
        },
        {
            id: 2,
            category: "قرمز",
            codeColor: "#f44336",
        },
        {
            id: 3,
            category: "قرمز",
            codeColor: "blue",
        },
    ];
    const dataInfo = [
        { field: "id", value: "#" },
        { field: "category", value: "نام رنگ" },
        { field: "codeColor", value: "کد رنگ" },
    ];
    const colors = {
        bgColor: "رنگ",
        colors: (c) => {
            return (
                <div style={{backgroundColor:c}} className="w-full h-6"></div>
            )
        }
    }

    const tabelActions = {
        title: "عملیات",

        icons: (id) => {
            return (
                <td className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
                    <button className="text-red-500">
                        <Icon name="xMark" size={16} />
                    </button>
                </td>
            )
        },

    }
    return (
        <div>
            <div className="mt-[72.5px] overflow-hidden">
                <h2 className="text-center text-2xl py-6">مدیریت رنگ ها</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel numOfData={2} data={data} dataInfo={dataInfo} colors={colors} tabelActions={tabelActions} title="جستجو" placeholder="قسمتی از نام رنگ را وارد کنید" />
                </div>

                {showModal && <ModalColors />}

            </div>
        </div>
    );
}

export default Colors;
