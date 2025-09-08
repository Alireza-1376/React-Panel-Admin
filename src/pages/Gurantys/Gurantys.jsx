import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import ModalGurantys from "./ModalGurantys";
import { Delete, get } from "../../services/httpRequest";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import ActionIcon from "../../components/ActionIcon";


const Guranty = () => {
    
    const { showModal, setShowModal } = useContext(ModalContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editData, setEditData] = useState(null);
    const [showAddBtn , setShowAddBtn] =useState(true)
    async function getGurantyData() {
        setLoading(true)
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await get("/admin/guarantees", "", { Authorization: `Bearer ${token}` })
            setData(response.data.data)
            setLoading(false)
        } catch (error) {
            toast.error("شما به این صفحه دسترسی ندارید")
            setLoading(false)
        }
    }
    useEffect(() => {
        getGurantyData();
    }, [])

    const dataInfo = [
        { field: "id", value: "#" },
        { field: "title", value: "عنوان گارانتی" },
        { field: "descriptions", value: "توضیحات" },
        { field: "length", value: "مدت گارانتی" },
        { field: "length_unit", value: "واحد" },
    ];

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
                    const token = JSON.parse(localStorage.getItem('token'));
                    const response = await Delete(`/admin/guarantees/${item.id}`, { Authorization: `Bearer ${token}` })
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
                    toast.error("خطا در حذف دسته بندی")
                }
            }
        });
    }


    function handleEdit(item) {
        return setEditData(item)
    }


    const addFields = [
        {
            title: "عملیات",
            elements: (item) => {
                return (
                    <div className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
                        <Tooltip title="ویرایش" arrow>
                            <ActionIcon pTitle="update_guarantee" name="pen" onClick={() => { setShowModal(true); handleEdit(item) }} className="text-yellow-500"/>
                        </Tooltip>
                        <Tooltip title="حذف" arrow>
                            <ActionIcon pTitle="delete_guarantee" name="xMark" onClick={() => { handleDelete(item) }} className="text-red-500"/>
                        </Tooltip>
                    </div>
                )
            },

        }]
    return (
        <div>
            <div className="mt-[72.5px] overflow-hidden">
                <h2 className="text-center text-2xl py-6">مدیریت گارانتی ها</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel pTitle="create_guarantee" showAddBtn={showAddBtn} loading={loading} numOfData={8} data={data} dataInfo={dataInfo} addFields={addFields} title="جستجو" placeholder="قسمتی از نام عنوان را وارد کنید" />
                </div>

                {showModal && <ModalGurantys data={data} setEditData={setEditData} editData={editData} setData={setData} />}

            </div>
        </div>
    );
}

export default Guranty;
