import { useEffect, useState } from "react";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { Delete, get, post, put } from "../../services/httpRequest";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import { object, string } from "yup";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const initialValue = {
    title: "",
    unit: "",
    in_filter: 0,
}
const onSubmit = async (values,props, id, setData, editData, setEditData, data) => {
    if (!editData) {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await post(`/admin/categories/${id}/attributes`, values, { Authorization: `Bearer ${token}` })
            if (response.status == 201) {
                toast.success(response.data.message)
                setData((prev) => {
                    return [...prev, response.data.data]
                })
                props.resetForm();
            }
        } catch (error) {
            
        }
    } else {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await put(`/admin/categories/attributes/${editData.id}`, values, { Authorization: `Bearer ${token}` })
            const newData = [...data]
            const findIndex = data.findIndex((i) => {
                return i.id == response.data.data.id
            })
            newData[findIndex] = response.data.data;

            if (response.status == 200) {
                toast.success(response.data.message)
                setEditData(null)
                setData(newData)
            }
        } catch (error) {
            
        }
    }
}

const validationSchema = object({
    title: string().required("لطفا عنوان ویژگی را وارد کنید"),
    unit: string().required("لطفا واحد ویژگی را وارد کنید"),
})

const AddProperty = () => {
    const location = useLocation();
    const navigate =useNavigate();
    const [prev, setPrev] = useState(true);
    const [loading, setIsLoading] = useState();
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(null);
    async function getAttributes() {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
           
            const response = await get(`/admin${location.pathname}`, "", { Authorization: `Bearer ${token}` })
            setData(response.data.data)
        } catch (error) {
            navigate(-1)
            toast.error("شما به این صفحه دسترسی ندارید")
        }
    }
    useEffect(() => {
        getAttributes();
    }, [])
    function handleEdit(item) {
        setEditData(item)
    }
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
        }).then( async(result) => {
            if (result.isConfirmed) {
                try {
                    const token = JSON.parse(localStorage.getItem('token'))
                    const response =await Delete(`/admin/categories/attributes/${item.id}`, { Authorization: `Bearer ${token}` })
                    
                    if (response.status == 200) {
                        toast.success(response.data.message)
                        setData(data.filter((item) => {
                            return item.id != response.data.deletedId;
                        }))
                    }
                } catch (error) {
     
                }
            }
        });
    }

    const dataInfo = [
        { field: "id", value: "#" },
        { field: "title", value: "عنوان محصول" },
        { field: "unit", value: "والد" },
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
                            <button onClick={() => handleEdit(item)} className="text-yellow-500">
                                <Icon name="pen" size={16} />
                            </button>
                        </Tooltip>
                        <Tooltip title="حذف" arrow>
                            <button onClick={() => { handleDelete(item) }} type="submit" className="text-red-500">
                                <Icon name="xMark" size={16} />
                            </button>
                        </Tooltip>
                    </div>
                )
            }
        }
    ]
    return (
        <Formik
            initialValues={editData || initialValue}
            onSubmit={(values,props) => onSubmit(values,props, location.state.id, setData, editData, setEditData, data)}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {formik => {
                return (
                    <div className="mt-[72.5px] p-4">
                        <h2 className="text-center text-2xl pb-4">مدیریت ویژگی های دسته بندی</h2>
                        <h6 className="text-center text-lg pb-10 text-purple-900">ویژگی های :{location.state.title}</h6>
                        <Form className="grid grid-cols-2 sm:flex sm:items-center sm:justify-evenly gap-4 sm:gap-10 border-b pb-4">
                            <div className="flex flex-col sm:w-1/4">
                                <FastField name="title" type="text" placeholder="عنوان ویژگی جدید" className=" px-4 py-2 rounded shadow focus:outline-none" />
                                <ErrorMessage name="title">
                                    {error => <span className="text-sm text-red-500">{error}</span>}
                                </ErrorMessage>
                            </div>
                            <div className="flex flex-col sm:w-1/4">
                                <FastField name="unit" type="text" placeholder="واحد ویژگی جدید" className=" px-4 py-2 rounded shadow focus:outline-none" />
                                <ErrorMessage name="unit">
                                    {error => <span className="text-sm text-red-500">{error}</span>}
                                </ErrorMessage>
                            </div>
                            <label className="inline-flex flex-row-reverse items-center justify-center cursor-pointer gap-2">
                                <FastField name="in_filter" >
                                    {props => {
                                        return <input type="checkbox" checked={props.field.value == 1} onChange={() => { props.field.value == 0 ? props.form.setFieldValue("in_filter", 1) : props.form.setFieldValue("in_filter", 0) }} className="sr-only peer" />
                                    }}
                                </FastField>
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">نمایش در فیلتر</span>
                            </label>
                            <div className="flex justify-center">
                                <button className="bg-green-700 text-white p-2 rounded-full">
                                    <Icon name="check" size={18} />
                                </button>
                            </div>
                        </Form>
                        <div className="p-4">
                            <Tabel prev={prev} loading={loading} numOfData={5} data={data} dataInfo={dataInfo} addFields={addFields} title="جستجو" placeholder="لطفا قسمتی از عنوان را وارد کنید" />
                        </div>
                    </div>
                )
            }}
        </Formik>
    );
}

export default AddProperty;
