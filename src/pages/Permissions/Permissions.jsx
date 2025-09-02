import { useEffect, useState } from "react";
import Tabel from "../../components/Tabel";

import { get } from "../../services/httpRequest";
import toast from "react-hot-toast";



const Permissions = () => {
    const [data ,setData] =useState([]) ;
    const [loading ,setLoading] =useState(false);
    const [showAddBtn , setShowAddBtn] =useState(false)
    async function getPermissionData(){
        setLoading(true)
        try {
            const token =JSON.parse(localStorage.getItem("token"))
            const response =await get("/admin/permissions" , "" ,{Authorization : `Bearer ${token}`})
            if(response.status==200){
                setLoading(false)
                setData(response.data.data)
            }
        } catch (error) {
            toast.error("شما به این صفحه دسترسی ندارید")
            setLoading(false) ;
        }
    }

    useEffect(()=>{
        getPermissionData()
    },[])

    const dataInfo = [
        { field: "id", value: "#" },
        { field: "title", value: "عنوان" },
        { field: "description", value: "توضیحات" },
        { field: "category", value: "عنوان دسته" },
    ];
   
   
    return (
        <div>
            <div className="mt-[72.5px] overflow-hidden">
                <h2 className="text-center text-2xl py-6">مدیریت مجوز های دسترسی</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <Tabel showAddBtn={showAddBtn} loading={loading} numOfData={8} data={data} dataInfo={dataInfo} title="جستجو" placeholder="قسمتی از نام مجوز را وارد کنید" />
                </div>

            </div>
        </div>
    );
}

export default Permissions;
