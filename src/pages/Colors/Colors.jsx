import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import ModalProduct from "../Products/ModalProduct";
import Icon from "../../layouts/sidebar/Icons";
import ModalColors from "./ModalColors";
import { elements } from "chart.js";
import { Delete, get } from "../../services/httpRequest";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";

const Colors = () => {
    
    const { showModal, setShowModal } = useContext(ModalContext)
    const [data, setData] = useState([]);
    const [loading ,setLoading] =useState(false)
    const [editData, setEditData] = useState(null);
    const [showAddBtn , setShowAddBtn] =useState(true)
    async function getColorsData() {
        setLoading(true)
        try {
            const token = JSON.parse(localStorage.getItem("token"))
            const response = await get("/admin/colors", "", { Authorization: `Bearer ${token}` })
            if (response.status == 200) {
                setData(response.data.data)
            }
            setLoading(false)
        } catch (error) {
            toast.error("شما به این صفحه دسترسی ندارید")
            setLoading(false)
        }
    }
    useEffect(() => {
        getColorsData()
    }, [])

    function handleDelete(item) {
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
                    const token = JSON.parse(localStorage.getItem('token'))
                    const response = await Delete(`/admin/colors/${item.id}`, { Authorization: `Bearer ${token}` })
                    toast.success(response.data.message)
                    const filteredData = data.filter((i) => {
                        return item.id != i.id
                    })
                    setData(filteredData)
                    Swal.fire({
                        text: "با موفقیت حذف شد",
                        icon: "success"
                    });

                } catch (error) {
                    toast.error("خطا در حذف رنگ ")
                }
            }
        });
    }

    function handleEdit(item) {
        setShowModal(true)
        setEditData(item)
    }

    const dataInfo = [
        { field: "id", value: "#" },
        { field: "title", value: "نام رنگ" },
        { field: "code", value: "کد رنگ" },
    ];

    const addFields = [
        {
            title: "رنگ",
            elements: (c) => {
                return (
                    <div style={{ backgroundColor: c.code }} className="w-[95%] h-6 mx-auto"></div>
                )
            }
        },
        {
            title: "عملیات",
            elements: (item) => {
                return (
                    <div className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
                        <Tooltip title="ویرایش" arrow>
                            <button onClick={() => handleEdit(item)} className="text-yellow-500">
                                <Icon name="pen" size={16} />
                            </button>
                        </Tooltip>
                        <Tooltip title="حذف" arrow>
                            <button onClick={() => { handleDelete(item) }} className="text-red-500">
                                <Icon name="xMark" size={16} />
                            </button>
                        </Tooltip>
                    </div>
                )
            },

        }

    ]

    return (
        <div>
            <div className="mt-[72.5px] overflow-hidden">
                <h2 className="text-center text-2xl py-6">مدیریت رنگ ها</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel showAddBtn={showAddBtn} loading={loading} numOfData={8} data={data} dataInfo={dataInfo} addFields={addFields} title="جستجو" placeholder="قسمتی از نام رنگ را وارد کنید" />
                </div>

                {showModal && <ModalColors editData={editData} setEditData={setEditData} data={data} setData={setData} />}

            </div>
        </div>
    );
}

export default Colors;
