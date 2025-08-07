import { ErrorMessage, FastField, Form, Formik } from "formik";
import Modal from "../../components/Modal";
import { mixed, object, string } from "yup"
import { useEffect, useState } from "react";
import { get, post } from "../../services/httpRequest";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
const initialValue = {
    title: "",
    descriptions: "",
    parent_id: "",
    is_active: 0,
    show_in_menu: 0,
    image: "",
}
const onSubmit = async (values, props) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const formData = new FormData();
    formData.append("title", values.title)
    formData.append("descriptions", values.descriptions)
    formData.append("parent_id", values.parent_id)
    formData.append("is_active", values.is_active)
    formData.append("show_in_menu", values.show_in_menu)
    formData.append("image", values.image)
    values = formData;
    try {
        const response = await post("/admin/categories", values, { Authorization: `Bearer ${token}` })
        if (response.status == 201) {
            toast.success(response.data.message)
            props.resetForm()
        } if (response.status == 202) {
            toast.error(response.data.title)
        }
    } catch (error) {
        toast.error("متاسفانه مشکلی رخ داده است")
    }
}
const validationSchema = object({
    title: string().required("لطفا عنوان دسته را وارد کنید"),
    image: mixed().test("size", "حجم عکس باید کمتر از 100 کیلوبایت باشد", (value) => {
        return !value ? true : value.size < 100 * 1024;
    }),
})

const ModalCategory = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const [parents, setParents] = useState([]);
    async function getParents() {
        try {
            const response = await get("/admin/categories", "", { Authorization: `Bearer ${token}` })
            setParents(response.data.data.map((item) => {
                return { id: item.id, value: item.title }
            }))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getParents()
    }, [])
    return (
        <Formik
            initialValues={initialValue}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {formik => {
                return <Modal
                    title="افزودن دسته محصولات"
                    screen={true}
                >
                    <Form className="text-center space-y-4 mt-4 p-4">
                        {parents.length > 0 ? <div className="flex justify-center">
                            <button className="bg-blue-300/50 border border-gray-400 py-2 w-24 px-4">دسته والد</button>
                            <FastField as="select" name="select" className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400">
                                {parents.map((item) => {
                                    return <option key={item.id} value={item.id} className="bg-yellow-100">{item.value}</option>
                                })}
                            </FastField>
                        </div> : null}
                        <div className="flex flex-col">
                            <div>
                                <button className="bg-blue-300/50 border border-gray-400 w-24 py-2 px-4">عنوان</button>
                                <FastField name="title" placeholder="عنوان دسته" type="text" className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400" />
                            </div>
                            <ErrorMessage name="title" className="block">
                                {(error) => {
                                    return <span className="text-sm text-red-500 block">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-blue-300/50 border border-gray-400 w-24 py-2 px-4">توضیحات</button>
                            <FastField name="descriptions" placeholder="توضیحات" as="textarea" rows={5} type="text" className="focus:outline-none w-3/4 md:w-1/2 border border-gray-400 p-2" />
                        </div>
                        <div className="flex justify-center flex-col">
                            <div>
                                <button className="bg-blue-300/50 border border-gray-400 w-24 py-2 px-4">تصویر</button>
                                <FastField name="image" >
                                    {props => {
                                        return <input onChange={(e) => { props.form.setFieldValue("image", e.target.files[0]) }} type="file" className=" file:bg-blue-300/50 file:border-0 file:py-2 focus:outline-none w-3/4 md:w-1/2 border border-gray-400" />
                                    }}
                                </FastField>
                            </div>
                            <ErrorMessage name="image" className="block">
                                {(error) => {
                                    return <span className="text-sm text-red-500 block">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>
                        <div className="flex justify-center items-center gap-16">
                            <label className="inline-flex items-center mb-5 cursor-pointer">
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 pl-4">وضعیت فعال</span>
                                <FastField name="is_active" >
                                    {props => {
                                        return <input type="checkbox" onChange={() => { props.field.value == 0 ? props.form.setFieldValue("is_active", 1) : props.form.setFieldValue("is_active", 0) }} className="sr-only peer" />
                                    }}
                                </FastField>
                                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            </label>
                            <label className="inline-flex items-center mb-5 cursor-pointer">
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 pl-4">نمایش در منو</span>
                                <FastField name="show_in_menu" >
                                    {props => {
                                        return <input type="checkbox" onChange={() => { props.field.value == 0 ? props.form.setFieldValue("show_in_menu", 1) : props.form.setFieldValue("show_in_menu", 0) }} className="sr-only peer" />
                                    }}
                                </FastField>
                                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div>
                            {formik.isSubmitting ? <PulseLoader size={30} color="purple" /> : <button className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>}
                        </div>
                    </Form>
                </Modal>
            }}
        </Formik>

    );
}

export default ModalCategory;
