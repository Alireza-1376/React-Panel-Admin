import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import ModalDiscount from "./ModalDiscount";
import { Delete, get } from "../../services/httpRequest";
import moment from "moment-jalaali";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Tooltip from "@mui/material/Tooltip";





const Discounts = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    const { showModal, setShowModal } = useContext(ModalContext);
    const [data, setData] = useState([]);
    const[editData ,setEditData] =useState(null);
    const [loading, setLoading] = useState(false);
    const [showAddBtn , setShowAddBtn] =useState(true)

    async function handleDelete(item){
        Swal.fire({
            title: "حذف کردن",
            text: `آیا از حذف ${item.title} مطمئن هستید ؟`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "بله",
            cancelButtonText: "خیر"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await Delete(`/admin/discounts/${item.id}`, { Authorization: `Bearer ${token}` })
                    if (response.status == 200) {
                        toast.success(response.data.message)
                        let filteredData = data.filter((d) => {
                            return d.id != item.id
                        })
                        setData(filteredData)
                    }
                    Swal.fire({
                        text: "با موفقیت حذف شد",
                        icon: "success"
                    });

                } catch (error) {
                    toast.error("خطا در حذف کد تخفیف ")
                }
            }
        });
    }
    async function handleEdite(item){
        setShowModal(true)
        setEditData(item)
    }

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
                const split =date.split("/")
                const year =split[0]
                const month =split[1]
                const day =split[2]
                return (
                    <span>{`${year}/${month < 10 ? "0"+month : month}/${day < 10 ? "0"+day : day}`}</span>
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
            elements: (item) => {
                return (
                    <span>{item.for_all == 1 ? "همه" : "تعدادی از محصولات"}</span>
                )
            }
        },
        {
            field: null,
            value: "عملیات",
            elements: (item) => {
                return (
                    <div className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
                        <Tooltip title="ویرایش" arrow>
                            <button onClick={() => { handleEdite(item) }} className="text-yellow-500">
                                <Icon name="pen" size={16} />
                            </button>
                        </Tooltip>
                        <Tooltip title="حذف" arrow>
                            <button onClick={() => { handleDelete(item) }} className="text-red-500 flex justify-center items-center">
                                <Icon name="xMark" size={16} />
                            </button>
                        </Tooltip>
                    </div >
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
                        numOfData={8}
                        data={data}
                        loading={loading}
                        dataInfo={dataInfo}
                        title="جستجو"
                        placeholder="قسمتی از نام عنوان را وارد کنید" 
                        showAddBtn={showAddBtn}
                        />
                </div>

                {showModal && <ModalDiscount editData={editData} setEditData={setEditData} setData={setData} data={data} setShowModal={setShowModal} />}

            </div>
        </div>
    );
}

export default Discounts;
