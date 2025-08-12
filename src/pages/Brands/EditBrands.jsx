import { ErrorMessage, FastField, Form, Formik } from 'formik';
import Modal from '../../components/Modal';
import { mixed, object, string } from 'yup';
import { post } from '../../services/httpRequest';
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
const initialValue = {
    original_name: "",
    persian_name: "",
    descriptions: "",
    logo: "",
}
const onSubmit = async (values, props, setData, editData, data,setUpdate) => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (values.logo) {
        const formData = new FormData();
        formData.append('original_name', values.original_name);
        formData.append('persian_name', values.persian_name);
        formData.append('descriptions', values.descriptions);
        formData.append('logo', values.logo);
        values = formData;
    }
    try {
        const response = await post(`/admin/brands/${editData.id}`, values, { Authorization: `Bearer ${token}` })
        if (response.status == 200) {
            let newData =[...data] ;
            let find = data.findIndex((item) => {
                return item.id == response.data.data.id;
            })
            newData[find]={...response.data.data , title :response.data.data.original_name};
            toast.success(response.data.message)
            // setUpdate((prev)=>{return prev+1})
            setData(newData)
        }
    } catch (error) {
        console.log(error)
    }
}
const validationSchema = object({
    original_name: string().required("لطفا عنوان لاتین برند را وارد کنید"),
    logo: mixed().test("size", "سایز عکس باید کمتر از 100 کیلوبایت باشد", (value) => {
        return !value ? true : value.size < 100 * 1024;
    })
})
const EditBrands = ({ setData, editData, data,setUpdate }) => {
    const [reInitialValue, setReInitialValue] = useState(null);
    useEffect(() => {
        if (editData) {
            setReInitialValue({
                original_name: editData.original_name,
                persian_name: editData.persian_name,
                descriptions: editData.descriptions,
                logo: "",
            })
        } else {
            setReInitialValue(null)
        }
    }, [])
    return (
        <Formik
            initialValues={reInitialValue || initialValue}
            onSubmit={(values, props) => onSubmit(values, props, setData, editData, data,setUpdate)}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {formik => {
                return <Modal
                    title="ویرایش برند"
                    screen={false}
                >
                    <Form className="text-center space-y-6 mt-4 p-4">
                        <div className="flex flex-col justify-center">
                            <div className='flex'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-48 px-4">عنوان لاتین برند</button>
                                <FastField name="original_name" placeholder="کیبورد را در حالت لاتین قرار دهید" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                            </div>
                            <ErrorMessage name='original_name'>
                                {(error) => {
                                    return <span className="text-sm text-red-500 block">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>
                        <div className="flex justify-center">
                            <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-48 px-4">عنوان فارسی برند</button>
                            <FastField name="persian_name" placeholder="کیبورد را در حالت فارسی قرار دهید" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                        </div>
                        <div className="flex justify-center">
                            <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-48 px-4">توضیحات برند</button>
                            <FastField name="descriptions" placeholder="متن کوتاه در مورد برند" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                        </div>
                        <div className='flex justify-center'>
                            <img width={80} src={editData.logo ? `https://ecomadminapi.azhadev.ir/${editData.logo}` : null} alt="" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className='flex'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 w-48 py-2 px-4">تصویر</button>
                                <FastField name="logo">
                                    {props => {
                                        return <input onChange={(e) => { props.form.setFieldValue("logo", e.target.files[0]) }} type="file" className=" file:bg-blue-300/50 file:border-0 file:py-[11px] focus:outline-none w-[90%] border border-gray-400" />
                                    }}
                                </FastField>
                            </div>
                            <ErrorMessage name='logo'>
                                {(error) => {
                                    return <span className="text-sm text-red-500 block">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>


                        <div>
                            {formik.isSubmitting ? <PulseLoader size={30} color="purple" /> : <button type='submit' className="bg-blue-600 text-white px-10 py-2 rounded-md">ویرایش</button>}
                        </div>
                    </Form>
                </Modal>
            }}
        </Formik>
    );
}

export default EditBrands;

