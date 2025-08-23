import { ErrorMessage, FastField, Form, Formik } from "formik";
import { PulseLoader } from "react-spinners";
import { object, string } from "yup";
import Modal from "../../components/Modal";
import Icon from "../../layouts/sidebar/Icons";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DatePicker from "react-multi-date-picker";
import { space } from "postcss/lib/list";
import SelectItems from "../Products/SelectItems";
import { useEffect, useState } from "react";
import { get } from "../../services/httpRequest";


const initialValues = {
    title: "",
    code: "",
    percent: "",
    expire_at: "",
    for_all: false,
    product_ids: ""
}
const onSubmit = (values) => {
    console.log(values)
}
const validationSchema = object({
    title: string().required("لطفا این قسمت را پر کنید").matches(/[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/, " لطفا فارسی تایپ کنید و از اعداد استفاده نکنید"),
    code: string().required("لطفا این قسمت را پر کنید").matches(/^[A-Za-z\s][A-Za-z0-9]/, "لطفا انگلیسی تایپ کنید"),
    percent: string().required("لطفا این قسمت را پر کنید").matches(/[0-9]/, "لطفا عدد وارد کنید"),
    expire_at: string().required("لطفا این قسمت را پر کنید"),
    product_ids: string().when("for_all", {
        is: true,
        then: () => {
            return string().required('لطفا این قسمت را پر کنید')
        }
    })
})

const ModalDiscount = ({ setShowModal }) => {
    const token =JSON.parse(localStorage.getItem('token'))
    const [product ,setProduct] =useState([])
    const [loading ,setLoading] =useState(false)

    async function getProducts(){
        setLoading(true)
        try {
            const response =await get("/admin/products/all_titles" , "" ,{Authorization : `Bearer ${token}`})
            if(response.status==200){
                setProduct(response.data.data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        getProducts()
    },[])

    
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {formik => {
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
                                        return <DatePicker onChange={(e) => { props.form.setFieldValue("expire_at", `${e.year}/${e.month < 10 ? "0" + e.month : e.month}/${e.day < 10 ? "0" + e.day : e.day}`) }} calendar={persian} locale={persian_fa} />
                                    }}
                                    {/* e.year  e.month.number  e.day*/}
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
                            <div className="flex w-full flex-col justify-center products">
                                {/* <div className='flex flex-1'>
                                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 text-sm w-28 px-4">برای </button>
                                    <FastField name="product_ids" placeholder="قسمتی از نام محصول را وارد کنید" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                                </div> */}
                                <SelectItems
                                    childeArray={product}
                                    loading={loading}
                                    form={formik.setFieldValue}
                                    title="برای"
                                    selectValue="محصول مورد نظر را انتخاب کنید"
                                    formValue="product_ids"
                                />
                                <ErrorMessage name="product_ids">
                                    {error => {
                                        return <span className="text-sm text-red-500">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>
                            : null}

                        {/* <div className="flex justify-start">
                            <span className="bg-green-200 items-center p-1 px-2 rounded-full inline-flex text-start">
                                <button className="text-red-500">
                                    <Icon name="xMark" />
                                </button>
                                <span>محصول 1</span>
                            </span>
                        </div> */}


                        <div className="flex gap-4 justify-center">
                            <button type='submit' className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>
                            <button className="text-white bg-gray-600 px-6 rounded-md py-2" type="button" onClick={() => { setShowModal(false) }}>انصراف</button>
                        </div>
                    </Form>
                </Modal>
            }}
        </Formik>


    );
}

export default ModalDiscount;
