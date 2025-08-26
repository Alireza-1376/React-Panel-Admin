import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import { get } from "../../services/httpRequest";
import ModalRoles from "./ModalRoles";
import Tooltip from "@mui/material/Tooltip";





const Roles = () => {
    const { showModal, setShowModal, editModal, setEditModal } = useContext(ModalContext)
    const token = JSON.parse(localStorage.getItem("token"))
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [showAddBtn, setShowAddBtn] = useState(true)
    const [editRoleItem, setEditRoleItem] = useState(null)
    const [permissions ,setPermission] =useState();

    async function getRoleData() {
        setLoading(true)
        try {
            const response = await get("/admin/roles", "", { Authorization: `Bearer ${token}` })
            if (response.status == 200) {
                setLoading(false)
                setData(response.data.data)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    async function getAllPermission(){
        try {
            const response =await get("/admin/permissions","",{Authorization : `Bearer ${token}`})
            setPermission(response.data.data)
        } catch (error) {
            console.log(error)
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
                            <button onClick={() => {editRole({...item , editPermission:false})  }} className="text-yellow-500">
                                <Icon name="pen" size={16} />
                            </button>
                        </Tooltip>
                        <Tooltip title="ویرایش دسترسی ها" arrow>
                            <button onClick={() => { editRole({...item , editPermission:true}) }} className="text-blue-500">
                                <Icon name="fingerPrint" size={16} />
                            </button>
                        </Tooltip>
                        <Tooltip title="حذف" arrow>
                            <button className="text-red-500 flex justify-center items-center">
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
                <h2 className="text-center text-2xl py-6">مدیریت نقش ها</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel showAddBtn={showAddBtn} loading={loading} numOfData={8} data={data} dataInfo={dataInfo} title="جستجو" placeholder="قسمتی از نام نقش را وارد کنید" />
                </div>

                {showModal && <ModalRoles data={data} setData={setData} permissions={permissions} setEditRoleItem={setEditRoleItem} editRoleItem={editRoleItem} setShowModal={setShowModal} />}

            </div>
        </div>
    );
}

export default Roles;
