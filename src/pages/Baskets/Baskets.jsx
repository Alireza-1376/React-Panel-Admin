import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Icon from "../../layouts/sidebar/Icons";
import ModalBasket from "./ModalBasket";
import ProductTabel from "../../components/ProductTabel";
import { Delete, get } from "../../services/httpRequest";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";





const Baskets = () => {
    const { showModal, setShowModal, editModal, setEditModal } = useContext(ModalContext)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchChar, setSearchChar] = useState("");
    const [countInPage, setCountInPage] = useState(8)
    const [numOfPage, setNumOfPage] = useState()
    const navigate = useNavigate();

    async function getAllCarts(currentPage, searchChar, countInPage) {
        setLoading(true)
        const token = JSON.parse(localStorage.getItem('token'))
        const response = await get(`/admin/carts?page=${currentPage}&searchChar=${searchChar}&count=${countInPage}`, "", { Authorization: `Bearer ${token}` })

        if (response.status == 200) {
            setLoading(false)
            setData(response.data.data.data)
            setNumOfPage(response.data.data.last_page)
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllCarts(currentPage, searchChar, countInPage)
    }, [currentPage, searchChar])

    function handleSearchData(value) {
        setSearchChar(value)
    }

    function handleDelete(item) {
        Swal.fire({
            title: "حذف کردن",
            text: `آیا از حذف ${item.user.first_name} ${item.user.last_name} مطمئن هستید ؟`,
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
                    const response = await Delete(`/admin/carts/${item.id}`, { Authorization: `Bearer ${token}` })
                    getAllCarts(currentPage, searchChar, countInPage)
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

    const dataInfo = [
        { field: "id", value: "#" },
        { field: "user_id", value: "آی دی کاربر" },
        {
            field: null,
            value: " نام کاربری",
            elements: (item) => {
                return <span>{`${item.user.first_name} ${item.user.last_name}`}</span>
            }
        },
        {
            field: null,
            value: "موبایل کابر",
            elements: (item) => {
                return <span>{item.user.phone}</span>
            }
        },
        {
            field: null,
            value: "تعداد کالاها",
            elements: (item) => {
                return <span>{item.items.length}</span>
            }
        },
        {
            field: null,
            value: "عملیات",
            elements: (item) => {
                return (
                    <div className="flex justify-center gap-2">
                        <Tooltip title="ویرایش" arrow>
                            <button onClick={() => {navigate("/baskets/add" , {state:item})}} className="text-yellow-500 flex justify-center items-center">
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
                <h2 className="text-center text-2xl py-6">مدیریت سبد خرید</h2>

                <div id="products-table" className="m-4 overflow-x-auto">
                    <ProductTabel
                        data={data}
                        loading={loading}
                        dataInfo={dataInfo}
                        title="جستجو"
                        placeholder="قسمتی از شماره موبایل را وارد کنید"
                        pTitle="create_cart"
                        numOfPage={numOfPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        handleSearchData={handleSearchData}
                        setShowModal={setShowModal}
                        url="/baskets/add"
                    />
                </div>

                {showModal && <ModalBasket />}

            </div>
        </div>
    );
}

export default Baskets;
