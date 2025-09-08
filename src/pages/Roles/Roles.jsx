import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import { Delete, get } from "../../services/httpRequest";
import ModalRoles from "./ModalRoles";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ActionIcon from "../../components/ActionIcon";





const Roles = () => {
    const { showModal, setShowModal, editModal, setEditModal } = useContext(ModalContext)
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [showAddBtn, setShowAddBtn] = useState(true)
    const [editRoleItem, setEditRoleItem] = useState(null)
    const [permissions, setPermission] = useState();

    async function getRoleData() {
        setLoading(true)
        try {
            const token = JSON.parse(localStorage.getItem("token"))
            const response = await get("/admin/roles", "", { Authorization: `Bearer ${token}` })
            if (response.status == 200) {
                setLoading(false)
                setData(response.data.data)
            }
        } catch (error) {
            setLoading(false)
            toast.error("شما به این صفحه دسترسی ندارید")
        }
    }
    async function getAllPermission() {
        try {
            const token = JSON.parse(localStorage.getItem("token"))
            const response = await get("/admin/permissions", "", { Authorization: `Bearer ${token}` })
            setPermission(response.data.data)
        } catch (error) {
           
        }
    }
    useEffect(() => {
        getRoleData()
        getAllPermission()
    }, [])

    function editRole(item) {
        setEditRoleItem(item)
        setShowModal(true)
    }

    async function handleDeleteRole(item) {
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
                    const response = await Delete(`/admin/roles/${item.id}`, { Authorization: `Bearer ${token}` })
                    if(response.status==200){
                        const filterData = data.filter((i)=>{
                            return i.id!=item.id
                        })
                        setData(filterData)
                    }
                    Swal.fire({
                        text: "با موفقیت حذف شد",
                        icon: "success"
                    });

                } catch (error) {
                    toast.error("خطا در حذف نقش ")
                }
            }
        });

    }


    const dataInfo = [
        { field: "id", value: "#" },
        { field: "title", value: "عنوان" },
        { field: "description", value: "توضیحات" },
        {
            field: null,
            value: "عملیات",
            elements: (item) => {
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Tooltip title="ویرایش نقش" arrow>
                            <ActionIcon pTitle="update_role" name="pen" onClick={() => { editRole({ ...item, editPermission: false }) }} className="text-yellow-500"/>
                        </Tooltip>
                        <Tooltip title="ویرایش دسترسی ها" arrow>
                            <ActionIcon pTitle="update_role_permissions" name="fingerPrint" onClick={() => { editRole({ ...item, editPermission: true }) }} className="text-blue-500"/>
                        </Tooltip>
                        <Tooltip title="حذف" arrow>
                            <ActionIcon pTitle="update_role_permissions" name="xMark" onClick={() => handleDeleteRole(item)} className="text-red-500 flex justify-center items-center"/>
                        </Tooltip>
                    </div>
                )
            }
        }
    ];


    return (
        <div>
            <div className="mt-[72.5px] overflow-hidden">
                <h2 className="text-center text-2xl py-6">مدیریت نقش ها</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel pTitle="create_role" showAddBtn={showAddBtn} loading={loading} numOfData={8} data={data} dataInfo={dataInfo} title="جستجو" placeholder="قسمتی از نام نقش را وارد کنید" />
                </div>

                {showModal && <ModalRoles data={data} setData={setData} permissions={permissions} setEditRoleItem={setEditRoleItem} editRoleItem={editRoleItem} setShowModal={setShowModal} />}

            </div>
        </div>
    );
}

export default Roles;
