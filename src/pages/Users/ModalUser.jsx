import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import Modal from "../../components/Modal";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_fa from "react-date-object/locales/gregorian_fa";
import { useEffect, useState } from "react";
import { array, number, object, string } from "yup";
import { PulseLoader } from "react-spinners";
import { get, post, put } from "../../services/httpRequest";
import SelectItems from "../Products/SelectItems";
import DateObject from "react-date-object";
import toast from "react-hot-toast";
const token = JSON.parse(localStorage.getItem('token'))

const gender = [
    { id: 1, value: "مرد" },
    { id: 0, value: "زن" },
]
const initialValue = {
    user_name: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    birth_date: "",
    gender: 1,
    roles_id: []
}

const onSubmit = async (values, props, data ,setData, reInitialValue ,setSelectChildren ,setDateValue) => {
    if (reInitialValue != null) {
        try {
            const response =await put(`/admin/users/${values.id}` , values , {Authorization : `Bearer ${token}`})
            if(response.status==200){
                toast.success(response.data.message)
                let newData =[...data]
                const find = newData.findIndex((i)=>{
                    return i.id==response.data.data.id
                })
                newData[find]=response.data.data
                setData(newData)
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            const response = await post(`/admin/users`, values, { Authorization: `Bearer ${token}` })
            if (response.status == 201) {
                toast.success(response.data.message)
                setData((prev) => {
                    return [...prev, response.data.data]
                })
                setSelectChildren([])
                setDateValue(null)
                props.resetForm()
            }
            if (response.status == 202) {
                let key = Object.keys(response.data)[0]
                let value = response.data[key][0]
                toast.error(value)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const validationSchema = object({
    user_name: string().required("لطفا این قسمت را کامل کنید").matches(/^(?:(?=\p{Script=Latin})\p{L}|(?=\p{Script=Arabic})\p{L}|[-\s])+$/u, "فقط حروف فارسی و انگلیسی را وارد کنید"),
    first_name: string().required("لطفا این قسمت را کامل کنید").matches(/^(?:(?=\p{Script=Latin})\p{L}|(?=\p{Script=Arabic})\p{L}|[-\s])+$/u, "فقط حروف فارسی و انگلیسی را وارد کنید"),
    last_name: string().required("لطفا این قسمت را کامل کنید").matches(/^(?:(?=\p{Script=Latin})\p{L}|(?=\p{Script=Arabic})\p{L}|[-\s])+$/u, "فقط حروف فارسی و انگلیسی را وارد کنید"),
    phone: string().required("لطفا شماره موبایل خود را وارد کنید"),
    email: string().required("لطفا ایمیل خود را وارد کنید").email("ایمیل معتبر نیست"),
    password: string().when("idEditiRoleData", {
        is: true,
        then: () => {
            return string().nullable()
        },
        otherwise: () => {
            return string().required("لطفا رمز عبور خود را وارد کنید")
        }
    }),
    birth_date: string().required("لطفا تاریخ تولد خود را انتخاب کنید"),
    gender: number().required("لطفا یک گزینه را انتخاب کنید"),
    roles_id: array().min(1, "حداقل یک مورد را انتخاب کنید"),
})


const ModalUser = ({ setShowModal, data, setData, editRoleData, setEditRoleData }) => {
    const [reInitialValue, setReInitialValue] = useState(null)
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({ format: "MM/DD/YYYY" })
    const [selectChildren, setSelectChildren] = useState([]);
    const [dateValue, setDateValue] = useState(null);
    const convert = (date, format, formik) => {
        let object = { date, format }
        const milady = new DateObject(object).convert(gregorian, gregorian_fa).format().split("/")
        const year = milady[2];
        const month = milady[0];
        const day = milady[1];
        const newDate = `${year}-${month}-${day}`;
        function toEnDigit(s) {
            return s.replace(/[\u0660-\u0669\u06f0-\u06f9]/g,
                function (a) { return a.charCodeAt(0) & 0xf }
            )
        }
        formik.setFieldValue("birth_date", toEnDigit(newDate))
    }

    async function getAllRoles() {
        setLoading(true)
        try {
            const response = await get("/admin/roles", "", { Authorization: `Bearer ${token}` })
            setRoles(response.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllRoles()
    }, [])
    

    useEffect(() => {
        if (editRoleData != null) {
            const rolesId = editRoleData.roles.map((item) => {
                return item.id;
            })
            const date = new Date(editRoleData.birth_date).toLocaleString("fa-IR", {
                year :"numeric",
                month:"2-digit",
                day : "2-digit"
            })
            setReInitialValue({
                user_name: editRoleData.user_name || "",
                first_name: editRoleData.first_name || "",
                last_name: editRoleData.last_name || "",
                phone: editRoleData.phone || "",
                email: editRoleData.email || "",
                password: "",
                birth_date: editRoleData.birth_date?.split(" ")[0] || "",
                gender: editRoleData.gender || 1,
                roles_id: rolesId || [],
                idEditiRoleData: true ,
                birthDate :date ,
                id :editRoleData.id ,
                roles:editRoleData.roles 
            })
            setEditRoleData(null)
        } else {
            setReInitialValue(null)
        }
    }, [])

    return (
        <Formik
            initialValues={reInitialValue || initialValue}
            onSubmit={(values, props) => onSubmit(values, props,data, setData, reInitialValue ,setSelectChildren ,setDateValue)}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {formik => {
                return <Modal
                    title={reInitialValue != null ? "ویرایش کاربر" : "افزودن کاربر"}
                    screen={true}
                >
                    <Form className="text-center space-y-4 mt-4 p-4">

                        <div className="flex flex-col justify-center">
                            <div className='flex justify-center'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-[18%] text-sm px-4">نام کاربری</button>
                                <FastField name="user_name" placeholder="فقط از حروف فارسی و لاتین استفاده کنید" type="text" className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400" />
                            </div>
                            <ErrorMessage name="user_name">
                                {error => {
                                    return <span className="text-red-500 text-sm">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>


                        <div className="flex flex-col justify-center">
                            <div className='flex justify-center'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-[18%] text-sm px-4">نام</button>
                                <FastField name="first_name" placeholder="فقط از حروف فارسی و لاتین استفاده کنید" type="text" className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400" />
                            </div>
                            <ErrorMessage name="first_name">
                                {error => {
                                    return <span className="text-red-500 text-sm">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>


                        <div className="flex flex-col justify-center">
                            <div className='flex justify-center'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-[18%] text-sm px-4">نام خانوادگی</button>
                                <FastField name="last_name" placeholder="فقط از حروف فارسی و لاتین استفاده کنید" type="text" className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400" />
                            </div>
                            <ErrorMessage name="last_name">
                                {error => {
                                    return <span className="text-red-500 text-sm">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className='flex justify-center'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-[18%] text-sm px-4">شماره موبایل</button>
                                <FastField name="phone" placeholder="فقط از اعداد استفاده کنید" type="text" className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400" />
                            </div>
                            <ErrorMessage name="phone">
                                {error => {
                                    return <span className="text-red-500 text-sm">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className='flex justify-center'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-[18%] text-sm px-4">ایمیل</button>
                                <FastField name="email" placeholder="فقط فرمت (email@youhost.com)" type="text" className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400" />
                            </div>
                            <ErrorMessage name="email">
                                {error => {
                                    return <span className="text-red-500 text-sm">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className='flex justify-center'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-[18%] text-sm px-4">کلمه عبور</button>
                                <FastField name="password" placeholder="فقط از حروف فارسی و لاتین استفاده کنید" type="password" className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400" />
                            </div>
                            <ErrorMessage name="password">
                                {error => {
                                    return <span className="text-red-500 text-sm">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>


                        <div className="flex flex-col justify-center">
                            <div className='flex justify-center'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 text-sm w-1/4 md:w-[18%] px-4">تاریخ تولد</button>
                                <FastField name="birth_date" placeholder="مثلا : 1400/12/04" type="text" >
                                    {props => {
                                        return <div className="w-3/4 md:w-1/2">
                                            <DatePicker onChange={(e) => {
                                                convert(e, state.format, formik)
                                                setDateValue(e)
                                            }} value={reInitialValue ? reInitialValue.birthDate : dateValue} placeholder="جهت انتخاب تاریخ کلیک کنید" calendar={persian} locale={persian_fa} />
                                        </div>
                                    }}
                                </FastField>
                            </div>
                            <ErrorMessage name="birth_date">
                                {error => {
                                    return <span className="text-red-500 text-sm">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className='flex justify-center'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-[18%] text-sm px-4">جنسیت</button>
                                <Field name="gender" placeholder="فقط از حروف فارسی و لاتین استفاده کنید" type="text" >
                                    {props => {
                                        return (
                                            <select onChange={(e) => { formik.setFieldValue("gender", e.target.value) }} className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400 appearance-none">
                                                {gender.map((item) => {
                                                    return <option key={item.id} value={item.id}>{item.value}</option>
                                                })}
                                            </select>
                                        )
                                    }}
                                </Field>
                            </div>
                            <ErrorMessage name="gender">
                                {error => {
                                    return <span className="text-red-500 text-sm">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>


                        <div className="flex flex-col justify-center">
                            <SelectItems
                                childeArray={roles}
                                loading={loading}
                                form={formik}
                                title="نقش ها"
                                selectValue="لطفا نقش مورد نظر را انتخاب کنید"
                                formValue="roles_id"
                                editArray={reInitialValue!=null && reInitialValue.roles}
                                selectChildren ={selectChildren}
                                setSelectChildren={setSelectChildren}
                            />
                        </div>


                        <div className="flex gap-4 justify-center items-center">
                            {formik.isSubmitting ? <PulseLoader size={20} color="purple" /> : <button type='submit' className="bg-blue-600 text-white px-10 py-2 rounded-md">{reInitialValue == null ? "ذخیره" : "ویرایش"}</button>}
                            <button className="text-white bg-gray-600 px-6 rounded-md py-2" type="button" onClick={() => { setShowModal(false) }}>انصراف</button>
                        </div>


                    </Form>
                </Modal>

            }}
        </Formik>
    );
}

export default ModalUser;
