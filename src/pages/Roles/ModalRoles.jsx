import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { array, object, string } from "yup";
import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import { post } from "../../services/httpRequest";
import toast from "react-hot-toast";
const token =JSON.parse(localStorage.getItem('token'))

const initialValue = {
    title: "",
    description: "",
    permissions_id: []
}

const onSubmit = async(values,props,setData) => {
    try {
        const response =await post("/admin/roles",values ,{Authorization : `Bearer ${token}`})
        if(response.status==201){
            toast.success(response.data.message)
            setData((prev)=>{
                return [...prev , response.data.data]
            })
            props.resetForm();
        }else{
            toast.error(response.data.title)
        }
    } catch (error) {
        console.log(error)
    }
}

const validationSchema = object({
    title: string().required("لطفا این قسمت را پر کنید").matches(/^[A-Za-z0-9\u0600-\u06FF _-]+$/u, "فقط حروف و اعداد را وارد کنید"),
    description: string().required("لطفا این قسمت را پر کنید").matches(/^[A-Za-z0-9\u0600-\u06FF _-]+$/u, "فقط حروف و اعداد را وارد کنید"),
    permissions_id: array().min(1, "حداقل یک مورد را انتخاب کنید")
})




const ModalRoles = ({ setShowModal, editRoleItem, setEditRoleItem, permissions ,setData}) => {
    const [reInitialValue, setReInitialValue] = useState(null)

    useEffect(() => {
        if (editRoleItem) {
            setReInitialValue(editRoleItem)
            setEditRoleItem(null)
        } else {
            setReInitialValue(null)
        }
    }, [])


    return (
        <Formik
            initialValues={reInitialValue || initialValue}
            onSubmit={(values,props)=>onSubmit(values,props ,setData)}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {formik => {
                // console.log(formik.values.permissions_id.includes(`${12}`))
                return (
                    <Modal
                        title={reInitialValue != null ? "ویرایش نقش" : "افزودن نقش کاربر"}
                        screen={true}
                    >
                        <Form className="text-center space-y-4 mt-4 p-4">
                            <div className="flex flex-col justify-center text-sm md:text-base">
                                <div className="flex justify-center">
                                    <button className="bg-blue-300/50 border border-gray-400 w-32 py-2 px-4">عنوان نقش</button>
                                    <FastField name="title" placeholder="فقط از حروف فارسی و لاتین استفاده کنید" type="text" className="focus:outline-none w-3/4 md:w-1/2 border border-gray-400 p-2" />
                                </div>
                                <ErrorMessage name="title">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>

                            <div className="flex flex-col justify-center text-sm md:text-base">
                                <div className="flex justify-center">
                                    <button className="bg-blue-300/50 border border-gray-400 w-32 py-2 px-4">توضیحات نقش</button>
                                    <FastField as="textarea" name="description" placeholder="فقط از حروف فارسی و لاتین استفاده کنید" className="focus:outline-none w-3/4 md:w-1/2 border border-gray-400 p-2" />
                                </div>
                                <ErrorMessage name="description">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>



                            <div className="flex flex-col justify-center text-sm md:text-base">
                                <div className="flex justify-center">
                                    <p className="text-start  w-32 py-2 px-4">دسترسی ها :</p>
                                    <div className=" w-3/4 md:w-1/2 border p-2 opacity-0" />
                                </div>

                                <div className="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-3/4 md:w-3/5 lg:pr-4 mx-auto">
                                    <Field name="permissions_id">
                                        {props => {
                                            return (
                                                <>
                                                    {
                                                        permissions.map((item) => {
                                                            return (
                                                                <div key={item.id} className="flex gap-1 justify-start">
                                                                    <input checked={props.field.value.includes(`${item.id}`)} id={item.id} {...props.field} value={item.id} type="checkbox" />
                                                                    <label htmlFor={item.id}>{item.description}</label>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </>
                                            )
                                        }}
                                    </Field>
                                    <ErrorMessage name="permissions_id">
                                        {error => {
                                            return <div className="text-red-500 text-sm col-start-1 -col-end-1">{error}</div>
                                        }}
                                    </ErrorMessage>
                                </div>

                            </div>







                            <div className="flex gap-4 justify-center items-center">
                                <button type="submit" className="bg-blue-600 text-white px-10 py-2 rounded-md">{reInitialValue != null ? "ویرایش" : "ذخیره"}</button>
                                <button onClick={() => { setShowModal(false) }} type="button" className="text-white bg-gray-600 px-6 rounded-md py-2">انصراف</button>
                            </div>
                        </Form>
                    </Modal>
                )
            }}

        </Formik>
    );
}

export default ModalRoles;
