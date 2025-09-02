import { ErrorMessage, FastField, Form, Formik } from 'formik';
import Modal from '../../components/Modal';
import { object, string } from 'yup';
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { post, put } from '../../services/httpRequest';
import toast from 'react-hot-toast';
const initialValues = {
    title: "",
    code: "#000000"
}
const onSubmit = async (values, props, setData, reInitialValue, data) => {
   
    
    if (reInitialValue) {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response =await put(`/admin/colors/${reInitialValue.id}`,values,{ Authorization: `Bearer ${token}` })
            if(response.status==200){
                toast.success(response.data.message)
                let newArr =[...data]
                let findIndex =data.findIndex((i)=>{
                    return i.id==response.data.data.id
                })
                newArr[findIndex]=response.data.data ;
                setData(newArr)
            }
        } catch (error) {
            
        }
    } else {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await post("/admin/colors", values, { Authorization: `Bearer ${token}` })
            if (response.status == 201) {
                toast.success(response.data.message)
                setData((prev) => {
                    return [...prev, response.data.data]
                })
                props.resetForm();
                props.setSubmitting(false)
            }
        } catch (error) {
            
            props.setSubmitting(false)
        }
    }
}
const validationSchema = object({
    title: string().required("لطفا نام رنگ را انتخاب کنید")
})
const ModalColors = ({ data, setData, editData, setEditData }) => {
    const [reInitialValue, setReInitialValue] = useState(null);
    

    useState(() => {
        if (editData) {
            setReInitialValue(editData)
            
            setEditData(null)
        } else {
            setReInitialValue(null)
        }
    }, [])

    return (
        <Formik
            initialValues={reInitialValue || initialValues}
            onSubmit={(values, props) => onSubmit(values, props, setData, reInitialValue,data)}
            validationSchema={validationSchema}
        >
            {formik => {
                return <Modal
                    title={reInitialValue ? "ویرایش رنگ" : "افزودن رنگ جدید"}
                    screen={false}
                >
                    <Form className="text-center space-y-4 mt-4 p-4">
                        <div className="flex flex-col justify-center">
                            <div className='flex'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-24 px-4">نام رنگ</button>
                                <FastField name="title" placeholder="" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                            </div>
                            <ErrorMessage name='title'>
                                {error => {
                                    return <span className='text-sm text-red-500'>{error}</span>
                                }}
                            </ErrorMessage>
                        </div>
                        <div className="flex items-start flex-col w-[100%]">
                            <label className='pb-2'>انتخاب رنگ :</label>
                            <FastField name="code">
                                {props => {
                                    return <input value={editData?editData.code : props.field.value} onChange={(e) => { props.form.setFieldValue('code',e.target.value) }} type="color" className='w-10 h-10 border border-gray-400 p-0.5 rounded cursor-pointer' />
                                }}
                            </FastField>
                        </div>

                        <div>
                            {formik.isSubmitting ? <PulseLoader size={30} color="purple" /> : <button type='submit' className="bg-blue-600 text-white px-10 py-2 rounded-md">{editData ? "ویرایش" : "ذخیره"}</button>}
                        </div>
                    </Form>
                </Modal>
            }}
        </Formik>
    );
}

export default ModalColors;
