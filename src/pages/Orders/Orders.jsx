import { useContext, useEffect, useState } from "react";
import Icon from "../../layouts/sidebar/Icons";
import ProductTabel from "../../components/ProductTabel";
import { get } from "../../services/httpRequest";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";





const Orders = () => {
    const navigate =useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [countInPage, setCountInPage] = useState(8);
    const [searchChar, setSearchChar] = useState("");
    const [numOfPage , setNumOfPage] = useState()

    async function getAllOrders(currentPage , countInPage , searchChar) {
        setLoading(true)
        const token = JSON.parse(localStorage.getItem("token"))
        const response = await get(`/admin/orders?page=${currentPage}&count=${countInPage}&searchChar=${searchChar}`, "", { Authorization: `Bearer ${token}` })
        if (response.status == 200) {
            setData(response.data.data.data)
            setLoading(false)
            setNumOfPage(response.data.data.last_page)
        }
    }

    useEffect(() => {
        getAllOrders(currentPage , countInPage , searchChar)
    }, [currentPage , searchChar])


    const dataInfo = [
        { field: "id", value: "#" },
        { field: "user_id", value: "آی دی کاربر" },
        { field: "user_fullname", value: "نام کاربر" },
        { field: "phone", value: "موبایل کاربر" },
        { field: "cart_id", value: "کد سبد" },
        {
            field: null,
            value: "تاریخ پرداخت",
            elements : (item)=>{
                const time =new Date(item.pay_at).toLocaleString("fa-IR" ,{
                    year:"numeric",
                    month:"2-digit",
                    day:"2-digit"
                })
                return (
                    <span>{time}</span>
                )
            }
        },
        { field: "pay_amount", value: "مبلغ پرداختی" },
        {
            field: null,
            value: "عملیات",
            elements: (item) => {
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Tooltip title="مشاهده سفارش" arrow>
                            <button onClick={()=>{navigate('/orders/add' , {state:item})}} className="text-blue-500">
                                <Icon name="miniShopingCart" size={16} />
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
        },
    ];

    function handleSearchData(value){
        setSearchChar(value)
    }
   

    return (
        <div>
            <div className="mt-[72.5px] overflow-hidden">
                <h2 className="text-center text-2xl py-6">مدیریت سفارشات</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <ProductTabel
                        data={data}
                        loading={loading}
                        dataInfo={dataInfo}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        handleSearchData = {handleSearchData}
                        numOfPage={numOfPage}
                        url="/orders/add"
                        title="جستجو"
                        placeholder="قسمتی از شماره موبایل را وارد کنید"
                    />
                </div>

            </div>
        </div>
    );
}

export default Orders;
