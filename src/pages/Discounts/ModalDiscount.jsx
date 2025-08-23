import { ErrorMessage, FastField, Form, Formik } from "formik";
import { PulseLoader } from "react-spinners";
import { boolean, object, string } from "yup";
import Modal from "../../components/Modal";
import Icon from "../../layouts/sidebar/Icons";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_fa from "react-date-object/locales/gregorian_fa";
import DatePicker from "react-multi-date-picker";
import SelectItems from "../Products/SelectItems";
import { useEffect, useState } from "react";
import { get, post } from "../../services/httpRequest";
import DateObject from "react-date-object";
import toast from "react-hot-toast";

const token = JSON.parse(localStorage.getItem('token'))

const initialValues = {
    title: "",
    code: "",
    percent: "",
    expire_at: "",
    for_all: false,
    product_ids: ""
}
const onSubmit = async (values ,props ,setData) => {
    try {
        const response = await post("/admin/discounts", values, { Authorization: `Bearer ${token}` })
        console.log(response)
        if(response.status==201){
            setData((prev)=>{
                return [...prev ,response.data.data]
            })
            toast.success(response.data.message)
        }
    } catch (error) {
        console.log(error)
    }
}
const validationSchema = object({
    title: string().required("لطفا این قسمت را پر کنید").matches(/[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/, " لطفا فارسی تایپ کنید و از اعداد استفاده نکنید"),
    code: string().required("لطفا این قسمت را پر کنید").matches(/^[A-Za-z\s][A-Za-z0-9]/, "لطفا انگلیسی تایپ کنید"),
    percent: string().required("لطفا این قسمت را پر کنید").matches(/[0-9]/, "لطفا عدد وارد کنید"),
    expire_at: string().required("لطفا این قسمت را پر کنید"),
    for_all: boolean(),
    product_ids: string().when("for_all", {
        is: false,
        then: () => {
            return string().required('لطفا این قسمت را پر کنید')
        }
    })
})

const ModalDiscount = ({ setShowModal ,setData }) => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({ format: "MM/DD/YYYY" })
    const convert = (date, format, props) => {
        let object = { date, format }
        setState({
            gregorian: new DateObject(object).convert(gregorian, gregorian_fa).format(),
            ...object
        })
        let oldFormat = new DateObject(object).convert(gregorian, gregorian_fa).format()
        const oldDate = oldFormat.split("/")
        const year = oldDate[2]
        const month = oldDate[0]
        const day = oldDate[1]
        let newFormat = year + "-" + month + "-" + day;

        function toEnDigit(s) {
            return s.replace(/[\u0660-\u0669\u06f0-\u06f9]/g,    
                function (a) { return a.charCodeAt(0) & 0xf }     
            )
        }

        props.form.setFieldValue("expire_at", toEnDigit(newFormat))
    }

    async function getProducts() {
        setLoading(true)
        try {
            const response = await get("/admin/products/all_titles", "", { Authorization: `Bearer ${token}` })
            if (response.status == 200) {
                setProduct(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getProducts()
    }, [])


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values,props)=>onSubmit(values,props ,setData)}
            validationSchema={validationSchema}
        >
            {formik => {
                console.log(formik.values)
                return <Modal
                    title=""
                    screen={false}
                >
                    <Form className="text-center space-y-4 mt-4 p-4">

                        <div className="flex flex-col justify-center">
                            <div className='flex'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-28 text-sm px-4">عنوان کد</button>
                                <FastField name="title" placeholder="کیبورد را در حالت فارسی قرار دهید" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                            </div>
                            <ErrorMessage name="title">
                                {error => {
                                    return <span className="text-red-500 text-sm">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>


                        <div className="flex flex-col justify-center">
                            <div className='flex'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-28 text-sm px-4">کد تخفیف</button>
                                <FastField name="code" placeholder="کیبورد را در حالت لاتین قرار دهید" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                            </div>
                            <ErrorMessage name="code">
                                {error => {
                                    return <span className="text-red-500 text-sm">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>


                        <div className="flex flex-col justify-center">
                            <div className='flex'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-28 text-sm px-4">درصد تخفیف</button>
                                <FastField name="percent" placeholder="فقط عدد" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                            </div>
                            <ErrorMessage name="percent">
                                {error => {
                                    return <span className="text-red-500 text-sm">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>


                        <div className="flex flex-col justify-center">
                            <div className='flex'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 text-sm w-28 px-4">تاریخ اعتبار</button>
                                <FastField name="expire_at" placeholder="مثلا : 1400/12/04" type="text" >
                                    {props => {
                                        return <DatePicker onChange={(e) => {
                                            convert(e, state.format, props);
                                            
                                        }} placeholder="جهت انتخاب تاریخ کلیک کنید" calendar={persian} locale={persian_fa} />
                                    }}
                                </FastField>
                            </div>
                            <ErrorMessage name="expire_at">
                                {error => {
                                    return <span className="text-red-500 text-sm">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>

                        <div className="flex justify-start">
                            <label className="inline-flex items-center mb-5 cursor-pointer">
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 pl-4">برای همه</span>
                                <FastField name="for_all" >
                                    {props => {
                                        return <input type="checkbox" onChange={() => { props.field.value == false ? props.form.setFieldValue("for_all", true) : props.form.setFieldValue("for_all", false) }} className="sr-only peer" />
                                    }}
                                </FastField>
                                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        {formik.values.for_all ?
                            null
                            : <div className="flex w-full flex-col justify-center products">
                                <SelectItems
                                    childeArray={product}
                                    loading={loading}
                                    form={formik}
                                    title="برای"
                                    selectValue="محصول مورد نظر را انتخاب کنید"
                                    formValue="product_ids"
                                />

                            </div>}




                        <div className="flex gap-4 justify-center items-center">
                            {formik.isSubmitting ? <PulseLoader size={20} color="purple" /> : <button type='submit' className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>}
                            <button className="text-white bg-gray-600 px-6 rounded-md py-2" type="button" onClick={() => { setShowModal(false) }}>انصراف</button>
                        </div>
                    </Form>
                </Modal>
            }}
        </Formik>


    );
}

export default ModalDiscount;
