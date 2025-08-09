import { FastField, Form, Formik } from "formik";
import Modal from "../../components/Modal";
import { mixed, object, string } from "yup";
import { get, put } from "../../services/httpRequest";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const initialValue = {
    title: "",
    descriptions: "",
    parent_id: "",
    is_active: 0,
    show_in_menu: 0,
    image: "",
}
const onSubmit = async (values, editId) => {
    const token = JSON.parse(localStorage.getItem('token'))
    try {
        const response = await put(`/admin/categories/${editId}`, values, { Authorization: `Bearer ${token}` })
        if(response.status==200){
            toast.success(response.data.message)
        }
    } catch (error) {
        console.log("خطا در ویرایش")
    }
}
const validationSchema = object({
    title: string().required("لطفا عنوان دسته را وارد کنید"),
    image: mixed().test("size", "حجم عکس باید کمتر از 100 کیلوبایت باشد", (value) => {
        return !value ? true : value.size < 100 * 1024;
    }),
})
const EditCategory = ({ editId, parents }) => {
    const token = JSON.parse(localStorage.getItem("token"))
    const [reInitialValue, setReInitialValue] = useState();
    async function getOneCategory() {
        try {
            const response = await get(`/admin/categories/${editId}`, "", { Authorization: `Bearer ${token}` })
            if (response.status == 200) {
                setReInitialValue({
                    title: response.data.data.title ? response.data.data.title :"",
                    descriptions: response.data.data.descriptions ?response.data.data.descriptions :"",
                    parent_id: response.data.data.parent_id ?response.data.data.parent_id :"",
                    show_in_menu: response.data.data.show_in_menu,
                    is_active: response.data.data.is_active,
                    image: response.data.data.image ?response.data.data.image :""
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getOneCategory()
    }, [])

    return (
        <Formik
            initialValues={reInitialValue || initialValue}
            onSubmit={(values) => onSubmit(values, editId)}
            validationSchema={validationSchema}
            enableReinitialize
        >
            <Modal
                title="ویرایش دسته محصولات"
                screen={true}
            >
                <Form className="text-center space-y-4 mt-4 p-4">
                    {parents.length > 0 ? <div className="flex justify-center">
                        <button className="bg-blue-300/50 border border-gray-400 py-2 w-24 px-4">دسته والد</button>
                        <FastField as="select" name="parent_id" className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400">
                            <option className="bg-yellow-100">دسته ی والد را انتخاب کنید</option>
                            {parents.map((item) => {
                                return <option key={item.id} value={item.id} className="bg-yellow-100">{item.value}</option>
                            })}
                        </FastField>
                    </div> : null}
                    <div className="flex justify-center">
                        <button className="bg-blue-300/50 border border-gray-400 w-24 py-2 px-4">عنوان</button>
                        <FastField name="title" placeholder="عنوان دسته" type="text" className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400" />
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-blue-300/50 border border-gray-400 w-24 py-2 px-4">توضیحات</button>
                        <FastField name="descriptions" as="textarea" placeholder="توضیحات" rows={5} type="text" className="focus:outline-none w-3/4 md:w-1/2 border border-gray-400 p-2"></FastField>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-blue-300/50 border border-gray-400 w-24 py-2 px-4">تصویر</button>
                        <FastField name="image" >
                            {props => {
                                return <input type="file" onChange={(e) => { props.form.setFieldValue('image', e.target.files[0]) }} className=" file:bg-blue-300/50 file:border-0 file:py-[11px] focus:outline-none w-3/4 md:w-1/2 border border-gray-400" />
                            }}
                        </FastField>
                    </div>
                    <div className="flex justify-center items-center gap-16">
                        <label className="inline-flex items-center mb-5 cursor-pointer">
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 pl-4">وضعیت فعال</span>
                            <FastField name="is_active">
                                {props => {
                                    return <input type="checkbox" checked={props.field.value == 1} value={props.field.value} onChange={() => { props.field.value == 0 ? props.form.setFieldValue("is_active", 1) : props.form.setFieldValue("is_active", 0) }} className="sr-only peer" />
                                }}
                            </FastField>
                            <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        </label>
                        <label className="inline-flex items-center mb-5 cursor-pointer">
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 pl-4">نمایش در منو</span>
                            <FastField name="show_in_menu" >
                                {props => {
                                    return <input type="checkbox" checked={props.field.value == 1} onChange={() => { props.field.value == 0 ? props.form.setFieldValue("show_in_menu", 1) : props.form.setFieldValue("show_in_menu", 0) }} className="sr-only peer" />
                                }}
                            </FastField>
                            <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>
                    </div>
                </Form>
            </Modal>
        </Formik>

    );
}

export default EditCategory;
