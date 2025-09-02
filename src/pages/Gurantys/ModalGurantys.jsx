import { ErrorMessage, FastField, Form, Formik } from 'formik';
import Modal from '../../components/Modal';
import { object, string } from 'yup';
import { post, put } from '../../services/httpRequest';
import { PulseLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
const initialValues = {
    title: "",
    descriptions: "",
    length: "",
    length_unit: ""
}
const onSubmit = async (values, props, setData, reInitialValue, data) => {
    
    if (reInitialValue) {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await put(`/admin/guarantees/${values.id}`, values, { Authorization: `Bearer ${token}` })
           
            if (response.status == 200) {
                toast.success(response.data.message)
                let newArr = [...data]
                const findItem = data.findIndex((item) => {
                    return item.id == response.data.data.id;
                })
                newArr[findItem] = response.data.data;
                setData(newArr)
            }
        } catch (error) {
           
        }
    } else {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await post("/admin/guarantees", values, { Authorization: `Bearer ${token}` })
            if (response.status == 201) {
                toast.success(response.data.message)
                props.setSubmitting(false)
                props.resetForm();
                setData((prev) => {
                    return [...prev, response.data.data]
                })
            }
        } catch (error) {
   
        }
    }
}
const validationSchema = object({
    title: string().required("لطفا عنوان گارانتی را وارد کنید")
})
const ModalGurantys = ({ setData, editData, setEditData, data }) => {
    const [reInitialValue, setReInitialValue] = useState();
    useEffect(() => {
        if (editData) {
            setReInitialValue(editData)
            // setEditData(null)
        }else{
            setEditData(null)
        }
    }, [])
    return (
        <Formik
            initialValues={reInitialValue || initialValues}
            onSubmit={(values, props) => onSubmit(values, props, setData, reInitialValue, data)}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {formik => {
                return <Modal
                    title={reInitialValue ? "ویرایش گارانتی" : "افزودن گارانتی"}
                    screen={false}
                >
                    <Form className="text-center space-y-6 mt-4 p-4">
                        <div className="flex flex-col justify-center">
                            <div className='flex'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-44 px-4">نام گارانتی</button>
                                <FastField placeholder="" name='title' type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                            </div>
                            <ErrorMessage name='title'>
                                {error => {
                                    return <span className='text-sm text-red-500'>{error}</span>
                                }}
                            </ErrorMessage>
                        </div>
                        <div className="flex justify-center">
                            <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-44 px-4">توضیحات گارانتی</button>
                            <FastField value={formik.values.descriptions ? formik.values.descriptions : ""} name="descriptions" placeholder="" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                        </div>
                        <div className="flex justify-center">
                            <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-44 px-4">مدت گارانتی</button>
                            <FastField value={formik.values.length ?  formik.values.length: ""} name="length" placeholder="فقط اعداد" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                        </div>
                        <div className="flex justify-center">
                            <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-44 px-4">واحد</button>
                            <FastField value={formik.values.length_unit ? formik.values.length_unit: ""} name="length_unit" placeholder="فقط حروف" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                        </div>

                        <div>
                            {formik.isSubmitting ? <PulseLoader size={30} color="purple" /> : <button type='submit' className="bg-blue-600 text-white px-10 py-2 rounded-md">{reInitialValue ? "ویرایش" : "ذخیره"}</button>}
                        </div>
                    </Form>
                </Modal>
            }}
        </Formik>
    );
}

export default ModalGurantys;
