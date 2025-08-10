import { useEffect, useState } from "react";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import { useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { get } from "../../services/httpRequest";



const AddProperty = () => {
    const location = useLocation();
    const token = JSON.parse(localStorage.getItem('token'))
    const [prev, setPrev] = useState(true);
    const [loading, setIsLoading] = useState();
    const [data, setData] = useState([]);
    async function getAttributes() {
        try {
            const response = await get(`/admin${location.pathname}`, "", { Authorization: `Bearer ${token}` })
            setData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAttributes();
    }, [])

    const dataInfo = [
        { field: "id", value: "#" },
        { field: "title", value: "عنوان محصول" },
        { field: "parent", value: "والد" },
    ]
    const addFields = [
        {
            title: "نمایش در فیلتر",
            elements: (item) => {
                return (
                    <span className={`${item.in_filter == 1 ? "text-green-600" : "text-red-600"}`}>
                        {item.in_filter == 1 ? "هست" : "نیست"}
                    </span>
                )
            }
        },
        {
            title: "عملیات",
            elements: (item) => {
                return (
                    <div className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
                        <Tooltip title="ویرایش" arrow>
                            <button className="text-yellow-500">
                                <Icon name="pen" size={16} />
                            </button>
                        </Tooltip>
                        <Tooltip title="حذف" arrow>
                            <button type="submit" className="text-red-500">
                                <Icon name="xMark" size={16} />
                            </button>
                        </Tooltip>
                    </div>
                )
            }
        }
    ]
    return (
        <form className="mt-[72.5px] p-4">
            <h2 className="text-center text-2xl pb-4">مدیریت ویژگی های دسته بندی</h2>
            <h6 className="text-center text-lg pb-10 text-purple-900">ویژگی های :{location.state.title}</h6>
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-evenly gap-4 sm:gap-10 border-b pb-4">
                <input type="text" placeholder="عنوان ویژگی جدید" className="sm:w-1/4 px-4 py-2 rounded shadow focus:outline-none" />
                <input type="text" placeholder="واحد ویژگی جدید" className="sm:w-1/4 px-4 py-2 rounded shadow focus:outline-none" />
                <label className="inline-flex flex-row-reverse items-center justify-center cursor-pointer gap-2">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">نمایش در فیلتر</span>
                </label>
                <div className="flex justify-center">
                    <button className="bg-green-700 text-white p-2 rounded-full">
                        <Icon name="check" size={18} />
                    </button>
                </div>
            </div>
            <div className="p-4">
                <Tabel prev={prev} loading={loading} numOfData={5} data={data} dataInfo={dataInfo} addFields={addFields} title="جستجو" placeholder="لطفا قسمتی از عنوان را وارد کنید" />
            </div>
        </form>


    );
}

export default AddProperty;
