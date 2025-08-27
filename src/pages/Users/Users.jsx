import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Icon from "../../layouts/sidebar/Icons";
import ProductTabel from "../../components/ProductTabel";
import { get } from "../../services/httpRequest";


const Users = () => {
    const { showModal, setShowModal, editModal, setEditModal } = useContext(ModalContext)
    const token = JSON.parse(localStorage.getItem('token'))
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [countPerPage, setCountPerPage] = useState(8);
    const [searchChar, setSearchChar] = useState("")
    const [numOfPage, setNumOfPage] = useState();
    async function getUsersData(page, count, searchChar) {
        setLoading(true)
        try {
            const response = await get(`/admin/users?page=${page}&count=${count}&searchChar=${searchChar}`, "", { Authorization: `Bearer ${token}` })
            console.log(response)
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
                        <button className="text-yellow-500">
                            <Icon name="pen" size={16} />
                        </button>
                        <button className="text-red-500 flex justify-center items-center">
                            <Icon name="xMark" size={16} />
                        </button>
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
                    <ProductTabel numOfPage={numOfPage} currentPage={currentPage} setCurrentPage={setCurrentPage} handleSearchData={handleSearchData} loading={loading} data={data} dataInfo={dataInfo} title="جستجو" placeholder="قسمتی از ایمیل را وارد کنید" />
                </div>

                {/* {showModal && <ModalBasket />} */}
                {/* {editModal && <EditBasket />} */}

            </div>
        </div>
    );
}

export default Users;
