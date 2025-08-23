import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import ModalDiscount from "./ModalDiscount";
import { get } from "../../services/httpRequest";
import moment from "moment-jalaali";
import { space } from "postcss/lib/list";




const Discounts = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    const { showModal, setShowModal } = useContext(ModalContext);
    const [data, setData] = useState([]);
    const [loading ,setLoading] =useState(false);

    async function getDiscountData() {
        setLoading(true)
        try {
            const response = await get("/admin/discounts", "", { Authorization: `Bearer ${token}` })
            if (response.status == 200) {
                setData(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getDiscountData()
    }, [])

    const dataInfo = [
        { field: "id", value: "#" },
        { field: "title", value: "عنوان" },
        { field: "code", value: "کد تخفیف" },
        { field: "percent", value: "درصد تخفیف" },
        {
            field: null,
            value: "تاریخ انقضا",
            elements: (item) => {
                const m = moment(item.expire_at)
                const date = m.format('jYYYY/jM/jD')
                return (
                    <span>{date}</span>
                )
            }
        },
        {
            field: null,
            value: "وضعیت",
            elements: (item) => {
                return (
                    <span>{item.is_active == 1 ? "فعال" : "غیرفعال"}</span>
                )
            }
        },
        {
            field: null,
            value: "مربوط به",
            elements:(item)=>{
                return (
                    <span>{item.for_all==1 ? "همه" : "تعدادی از محصولات"}</span>
                )
            }
        },
        {
            field: null,
            value: "عملیات",
            elements: (item) => {
                return (
                    <div className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
                        <button className="text-yellow-500">
                            <Icon name="pen" size={16} />
                        </button>
                        <button className="text-red-500 flex justify-center items-center">
                            <Icon name="xMark" size={16} />
                        </button>
                    </div>
                )
            },
        }
    ];


    return (
        <div>
            <div className="mt-[72.5px] overflow-hidden">
                <h2 className="text-center text-2xl py-6">مدیریت کد های تخفیف</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel
                        numOfData={2}
                        data={data}
                        loading={loading}
                        dataInfo={dataInfo}
                        title="جستجو"
                        placeholder="قسمتی از نام عنوان را وارد کنید" />
                </div>

                {showModal && <ModalDiscount setShowModal={setShowModal} />}

            </div>
        </div>
    );
}

export default Discounts;
