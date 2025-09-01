import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import ModalBrands from "./ModalBrands";
import { Delete, get } from "../../services/httpRequest";
import { PulseLoader } from "react-spinners";
import EditBrands from "./EditBrands";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Tooltip from "@mui/material/Tooltip";



const Brands = () => {
    
    const { showModal, setShowModal, editModal, setEditModal } = useContext(ModalContext)
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState();
    const [update, setUpdate] = useState(0)
    const [showAddBtn , setShowAddBtn] =useState(true)
    async function getBrandsData() {
        setIsLoading(true)
        try {
            const token = JSON.parse(localStorage.getItem('token'));
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
            toast.error("شما به این صفحه دسترسی ندارید")
        }
    }
    useEffect(() => {
        getBrandsData();
    }, [update])

    const dataInfo = [
        { field: "id", value: "#" },
        { field: "original_name", value: "عنوان لاتین" },
        { field: "persian_name", value: "عنوان فارسی" },
        { field: "descriptions", value: "توضیحات" },
    ];

    function handleEdit(item) {
        setEditData(item)
    }
    async function handlDelete(item) {
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
                    const response = await Delete(`/admin/brands/${item.id}`, { Authorization: `Bearer ${token}` })
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
                    toast("خطا در حذف دسته بندی")
                }
            }
        });



    }
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
                        <Tooltip title="ویرایش" arrow>
                            <button onClick={() => { setEditModal(true); handleEdit(id) }} className="text-yellow-500 flex justify-center items-center">
                                <Icon name="pen" size={16} />
                            </button>
                        </Tooltip>
                        <Tooltip title="حذف" arrow>
                            <button onClick={() => { handlDelete(id) }} className="text-red-500 flex justify-center items-center">
                                <Icon name="xMark" size={16} />
                            </button>
                        </Tooltip>
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
                    <Tabel showAddBtn={showAddBtn} loading={isLoading} numOfData={8} data={data} dataInfo={dataInfo} addFields={addFields} title="جستجو" placeholder="قسمتی از نام عنوان را وارد کنید" />
                </div>

                {showModal && <ModalBrands setData={setData} />}
                {editModal && <EditBrands setUpdate={setUpdate} data={data} setData={setData} editData={editData} />}
            </div>
        </div>
    );
}

export default Brands;
