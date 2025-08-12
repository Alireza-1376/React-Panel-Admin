import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import ModalBrands from "./ModalBrands";
import { get } from "../../services/httpRequest";
import { PulseLoader } from "react-spinners";



const Brands = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const { showModal, setShowModal } = useContext(ModalContext)
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    async function getBrandsData() {
        setIsLoading(true)
        try {
            const response = await get("/admin/brands", "", { Authorization: `Bearer ${token}` })
            let newData = [];
            response.data.data.map((item) => {
                item.title = item.original_name;
                newData.push(item)
            })
            setData(newData)
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getBrandsData();
    }, [])

    const dataInfo = [
        { field: "id", value: "#" },
        { field: "original_name", value: "عنوان لاتین" },
        { field: "persian_name", value: "عنوان فارسی" },
        { field: "descriptions", value: "توضیحات" },
    ];

    const addFields = [
        {
            title: "لوگو",
            elements: (c) => {
                const logo = c.logo ? `https://ecomadminapi.azhadev.ir/${c.logo}` : null;
                return (
                    <img className="mx-auto" width={40} src={logo} alt="" />
                )
            }
        },

        {
            title: "عملیات",
            elements: (id) => {
                return (
                    <div className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
                        <button className="text-yellow-500 flex justify-center items-center">
                            <Icon name="pen" size={16} />
                        </button>
                        <button className="text-red-500 flex justify-center items-center">
                            <Icon name="xMark" size={16} />
                        </button>
                    </div>
                )
            }
        }

    ]

    return (
        <div>
            <div className="mt-[72.5px] overflow-hidden">
                <h2 className="text-center text-2xl py-6">مدیریت برند ها</h2>
                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel loading={isLoading} numOfData={8} data={data} dataInfo={dataInfo} addFields={addFields} title="جستجو" placeholder="قسمتی از نام عنوان را وارد کنید" />
                </div>

                {showModal && <ModalBrands setData={setData} />}

            </div>
        </div>
    );
}

export default Brands;
