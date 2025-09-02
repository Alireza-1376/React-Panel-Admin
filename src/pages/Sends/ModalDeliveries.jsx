import { ErrorMessage, FastField, Form, Formik } from "formik";
import Modal from "../../components/Modal";
import { PulseLoader } from "react-spinners";
import { number, object, string } from "yup";
import { useEffect, useState } from "react";
import { post, put } from "../../services/httpRequest";
import toast from "react-hot-toast";

const initialValues = {
    title: "",
    amount: "",
    time: 1,
    time_unit: ""
}

const onSubmit = async (values, props, reInitialValue, data, setData) => {
    if (reInitialValue != null) {
        const token = JSON.parse(localStorage.getItem("token"))
        const response =await put(`/admin/deliveries/${values.id}`,values , { Authorization: `Bearer ${token}` })
        if(response.status==200){
            toast.success(response.data.message)
            let newData =[...data];
            let findIndex = data.findIndex((item)=>{
                return item.id==response.data.data.id;
            })
            newData[findIndex]=response.data.data ;
            setData(newData);
        }
    } else {
        const token = JSON.parse(localStorage.getItem("token"))
        const response = await post("/admin/deliveries", values, { Authorization: `Bearer ${token}` })
        if (response.status == 201) {
            toast.success(response.data.message)
            setData(prev => { return [...prev, response.data.data] })
            props.resetForm()
        }
    }
}

const validationSchema = object({
    title: string().required("لطفا این قسمت را پر کنید").matches(/^[a-zA-Zآ-یءئإأا-ی\s]+$/, "فقط حروف فارسی و انگلیسی را وارد کنید"),
    amount: number().typeError("فقط اعداد را وارد کنید").required("لطفا این قسمت را پر کنید"),
    time: number().typeError("فقط اعداد را وارد کنید").required("لطفا این قسمت را پر کنید"),
    time_unit: string().required("لطفا این قسمت را پر کنید").matches(/^[a-zA-Zآ-یءئإأا-ی\s]+$/, "فقط حروف فارسی و انگلیسی را وارد کنید"),
})

const ModalDeliveries = ({ setShowModal, editDeliveries, setEditDeliveries, data, setData }) => {
    const [reInitialValue, setReInitialValue] = useState(null)

    useEffect(() => {
        if (editDeliveries != null) {
            setReInitialValue(editDeliveries)
            setEditDeliveries(null)
        } else {
            setReInitialValue(null)
        }
    }, [])


    return (
        <Formik
            initialValues={reInitialValue || initialValues}
            onSubmit={(values, props) => onSubmit(values, props, reInitialValue, data, setData)}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {formik => {
                return (
                    <Modal
                        title={reInitialValue ? "ویرایش روش ارسال" : "افزودن روش ارسال"}
                        screen={false}
                    >
                        <Form className="text-center space-y-4 mt-4 p-4">
                            <div className="flex flex-col justify-center">
                                <div className='flex'>
                                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-28 text-sm px-4">عنوان </button>
                                    <FastField name="title" placeholder="فقط از حروف فارسی و لاتین استفاده کنید" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                                </div>
                                <ErrorMessage name="title">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>

                            <div className="flex flex-col justify-center">
                                <div className='flex'>
                                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-28 text-sm px-4">مبلغ</button>
                                    <FastField name="amount" placeholder="فقط از اعداد استفاده کنید" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                                </div>
                                <ErrorMessage name="amount">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>

                            <div className="flex flex-col justify-center">
                                <div className='flex'>
                                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-28 text-sm px-4">مدت ارسال</button>
                                    <FastField name="time" placeholder="فقط از عداد استفاده کنید" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                                </div>
                                <ErrorMessage name="time">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>

                            <div className="flex flex-col justify-center">
                                <div className='flex'>
                                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-28 text-sm px-4">واحد مدت</button>
                                    <FastField name="time_unit" placeholder="واحد مدت " type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                                </div>
                                <ErrorMessage name="time_unit">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>

                            <div className="flex gap-4 justify-center items-center">
                                {formik.isSubmitting ? <PulseLoader size={20} color="purple" /> : <button type='submit' className="bg-blue-600 text-white px-10 py-2 rounded-md">{reInitialValue ? "ویرایش" : "ذخیره"}</button>}
                                <button className="text-white bg-gray-600 px-6 rounded-md py-2" type="button" onClick={() => { setShowModal(false) }}>انصراف</button>
                            </div>
                        </Form>
                    </Modal>
                )
            }}
        </Formik>
    );
}

export default ModalDeliveries;
