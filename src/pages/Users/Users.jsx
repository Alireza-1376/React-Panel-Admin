import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Icon from "../../layouts/sidebar/Icons";
import ProductTabel from "../../components/ProductTabel";
import { Delete, get } from "../../services/httpRequest";
import ModalUser from "./ModalUser";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import toast from "react-hot-toast";


const Users = () => {
    const { showModal, setShowModal, editModal, setEditModal } = useContext(ModalContext)
    const token = JSON.parse(localStorage.getItem('token'))
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [countPerPage, setCountPerPage] = useState(8);
    const [searchChar, setSearchChar] = useState("")
    const [numOfPage, setNumOfPage] = useState();
    const [editRoleData , setEditRoleData] =useState(null);
    async function getUsersData(page, count, searchChar) {
        setLoading(true)
        try {
            const response = await get(`/admin/users?page=${page}&count=${count}&searchChar=${searchChar}`, "", { Authorization: `Bearer ${token}` })
            if (response.status == 200) {
                setData(response.data.data.data)
                setLoading(false)
                setNumOfPage(response.data.data.last_page)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsersData(currentPage, countPerPage, searchChar)
    }, [currentPage, searchChar])

    function handleSearchData(value) {
        setSearchChar(value)
    }

    function handleDelete(item) {
        Swal.fire({
            title: "حذف کردن",
            text: `آیا از حذف ${item.first_name} ${item.last_name} مطمئن هستید ؟`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "بله",
            cancelButtonText: "خیر"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await Delete(`/admin/users/${item.id}`, { Authorization: `Bearer ${token}` })
                    getUsersData(currentPage , countPerPage , searchChar)
                    Swal.fire({
                        text: "با موفقیت حذف شد",
                        icon: "success"
                    });

                } catch (error) {
                    toast.error("خطا در حذف کاربر  ")
                }
            }
        });
    }

    function handleEdit(item){
        setEditRoleData(item)
        setShowModal(true)
    }

    const dataInfo = [
        { field: "id", value: "#" },
        { field: "user_name", value: "نام کاربری" },
        {
            field: null,
            value: "نام و نام خانوادگی",
            elements: (item) => {
                return <span>{item.first_name} {item.last_name}</span>
            }
        },
        { field: "phone", value: "شماره تلفن" },
        { field: "email", value: "ایمیل" },
        {
            field: null,
            value: "جنسیت",
            elements: (item) => {
                return <span>{item.gender == 1 ? "مرد" : "زن"}</span>
            }
        },
        {
            field: null,
            value: "عملیات",
            elements: (item) => {
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Tooltip title="ویرایش" arrow>
                            <button onClick={()=>{handleEdit(item)}} className="text-yellow-500">
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
        },
    ];


    return (
        <div>
            <div className="mt-[72.5px] overflow-hidden">
                <h2 className="text-center text-2xl py-6">مدیریت کاربران</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <ProductTabel showModal={showModal} setShowModal={setShowModal} numOfPage={numOfPage} currentPage={currentPage} setCurrentPage={setCurrentPage} handleSearchData={handleSearchData} loading={loading} data={data} dataInfo={dataInfo} title="جستجو" placeholder="قسمتی از ایمیل را وارد کنید" />
                </div>

                {showModal && <ModalUser editRoleData={editRoleData} setEditRoleData={setEditRoleData} data={data} setData={setData} setShowModal={setShowModal} />}

            </div>
        </div>
    );
}

export default Users;
