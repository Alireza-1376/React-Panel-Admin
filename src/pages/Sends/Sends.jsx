import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import { Delete, get } from "../../services/httpRequest";
import Tooltip from "@mui/material/Tooltip";
import ModalDeliveries from "./ModalDeliveries";
import Swal from "sweetalert2";





const Sends = () => {
    const { showModal, setShowModal, editModal, setEditModal } = useContext(ModalContext)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddBtn, setShowAddBtn] = useState(true);
    const [editDeliveries, setEditDeliveries] = useState(null);

    async function getAllDeliveries() {
        setLoading(true)
        try {
            const token = JSON.parse(localStorage.getItem("token"))
            const response = await get("/admin/deliveries", "", { Authorization: `Bearer ${token}` })
            if (response.status == 200) {
                setData(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllDeliveries()
    }, [])

    function handleEdit(item) {
        setShowModal(true)
        setEditDeliveries(item)
    }

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
                    const token = JSON.parse(localStorage.getItem("token"))
                    const response = await Delete(`/admin/deliveries/${item.id}`, { Authorization: `Bearer ${token}` })
                    if (response.status == 200) {
                        const filterData = data.filter((i) => {
                            return i.id != item.id
                        })
                        setData(filterData)
                    }
                    Swal.fire({
                        text: "با موفقیت حذف شد",
                        icon: "success"
                    });

                } catch (error) {
                    toast.error("خطا در حذف روش ارسال")
                }
            }
        });
    }

    const dataInfo = [
        { field: "id", value: "#" },
        { field: "title", value: "عنوان" },
        { field: "amount", value: "هزینه" },
        {
            field: null,
            value: "مدت ارسال",
            elements: (item) => {
                return <span>{`${item.time} ${item.time_unit}`}</span>
            }
        },
        {
            field: null,
            value: "عملیات",
            elements: (item) => {
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Tooltip title="ویرایش" arrow>
                            <button onClick={() => { handleEdit(item) }} className="text-yellow-500">
                                <Icon name="pen" size={16} />
                            </button>
                        </Tooltip>
                        <Tooltip title="حذف" arrow>
                            <button onClick={() => { handleDelete(item) }} className="text-red-500 flex justify-center items-center">
                                <Icon name="xMark" size={16} />
                            </button>
                        </Tooltip>
                    </div>
                )
            }
        }
    ];


    return (
        <div>
            <div className="mt-[72.5px] overflow-hidden">
                <h2 className="text-center text-2xl py-6">مدیریت نحوه ارسال</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel loading={loading} showAddBtn={showAddBtn} numOfData={8} data={data} dataInfo={dataInfo} title="جستجو" placeholder="قسمتی از عنوان را وارد کنید" />
                </div>

                {showModal && <ModalDeliveries data={data} setData={setData} editDeliveries={editDeliveries} setEditDeliveries={setEditDeliveries} setShowModal={setShowModal} />}
            </div>
        </div>
    );
}

export default Sends;
