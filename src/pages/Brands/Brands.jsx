import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import ModalBrands from "./ModalBrands";



const Brands = () => {
    const { showModal, setShowModal } = useContext(ModalContext)
    const data = [
        {
            id: 1,
            title: "brand 1",
            persianCategory: "برند شماره 1",
            desc: "توضیحات اجمالی درباره این برند",
            logo :"./public/images/admin.jpg"
        }
       
    ];
    const dataInfo = [
        { field: "id", value: "#" },
        { field: "title", value: "عنوان " },
        { field: "persianCategory", value: "عنوان فارسی" },
        { field: "desc", value: "توضیحات" },
    ];
    const logos = {
        name: "لوگو",
        logos: (c) => {
            return (
                <img className="mx-auto" width={40} src={c} alt="" />
            )
        }
    }
    const tabelActions = {
        title: "عملیات",

        icons: (id) => {
            return (
                <div className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
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
                <h2 className="text-center text-2xl py-6">مدیریت برند ها</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel numOfData={2} data={data} dataInfo={dataInfo} logos={logos} tabelActions={tabelActions} title="جستجو" placeholder="قسمتی از نام عنوان را وارد کنید" />
                </div>

                {showModal && <ModalBrands />}

            </div>
        </div>
    );
}

export default Brands;
