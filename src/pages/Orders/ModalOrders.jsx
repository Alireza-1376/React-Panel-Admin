import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Icon from "../../layouts/sidebar/Icons";
import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import { number, object, string } from "yup";
import { get, post } from "../../services/httpRequest";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialValue = {
    cart_id: "",
    discount_id: "",
    delivery_id: "",
    address: "",
    phone: "",
    email: "",
    pay_at: "",
    pay_card_number: "",
    pay_bank: "",
    discount: "",
}
const onSubmit = async (values, props, navigate) => {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await post(`/admin/orders`, values, { Authorization: `Bearer ${token}` })
    if (response.status == 201) {
        toast.success(response.data.message)
        props.resetForm()
        navigate(-1)
    }
    if (response.status == 202) {
        toast.error(response.data.cart_id[0])
    }
}

const validationSchema = object({
    cart_id: number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
    discount_id: number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
    delivery_id: number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
    address: string().required("لطفا آدرس خود را وارد کنید"),
    phone: string().required("لطفا شماره موبایل خود را وارد کنید").matches(/(\+?98|098|0|0098)?(9\d{9})/, "شماره موبایل نا معتبر است"),
    email: string().required("لطفا ایمیل خود را وارد کنید").email("ایمیل وارد شده نامعتبر است"),
    pay_at: string().required("لطفا این قسمت را پر کنید"),
    pay_card_number: string().required("لطفا شماره کارت خود را وارد کنید").min(16, "باید 16 رقم باشد").max(16, "باید 16 رقم باشد"),
    pay_bank: string().required("لطفا این قسمت را پر کنید"),
    discount: string(),
})

const ModalOrders = () => {
    const [reInitialValue, setReinitialValue] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedProductInfo, setSelectedProductInfo] = useState([]);
    const [persianDate, setPersianDate] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [percentDiscount, setPercentDiscount] = useState(0)
    const [delivery, setDelivery] = useState([]);

    async function handleGetOneCart(id, formik) {
        const token = JSON.parse(localStorage.getItem('token'))
        const response = await get(`/admin/carts/${id}`, "", { Authorization: `Bearer ${token}` })
        if (response.data.data != null) {
            setSelectedProductInfo(response.data.data?.items)
            const persianDate = new Date(response.data.data?.created_at).toLocaleString("fa-IR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            })
            const miladyDate = new Date(response.data.data?.created_at).toLocaleString('en-US').split(",")[0].split("/")
            const newMiladyDate = `${miladyDate[2]}-${miladyDate[0] < 10 ? "0" + miladyDate[0] : miladyDate[0]}-${miladyDate[1] < 10 ? "0" + miladyDate[1] : miladyDate[1]}`
            setPersianDate(persianDate)
            formik.setFieldValue("pay_at", newMiladyDate)
        } else {
            setPersianDate(null)
            setSelectedProductInfo([])
            formik.setFieldValue("pay_at", "")
        }
    }

    async function getDiscount(id, formik) {
        const token = JSON.parse(localStorage.getItem('token'))
        const response = await get(`/admin/discounts/${id}`, "", { Authorization: `Bearer ${token}` })


        if (response.data.data != null) {
            setPercentDiscount(response.data.data.percent)
            formik.setFieldValue("discount", response.data.data.percent)
        } else {
            setPercentDiscount(0)
            formik.setFieldValue("discount", "")
        }
    }

    async function getDeliveries() {
        const token = JSON.parse(localStorage.getItem('token'))
        const response = await get("/admin/deliveries", "", { Authorization: `Bearer ${token}` })
        if (response.status == 200) {
            setDelivery(response.data.data)
        }
    }

    useEffect(() => {
        getDeliveries()
        if (location.state != null) {
            const token = JSON.parse(localStorage.getItem('token'))
            get(`/admin/orders/${location.state.id}`, "", { Authorization: `Bearer ${token}` }).then((response) => {
                const persianDate = new Date(response.data.data.pay_at).toLocaleString("fa-IR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                })
                setReinitialValue({
                    cart_id: response.data.data.cart_id,
                    discount_id: response.data.data.discount_id,
                    delivery_id: response.data.data.delivery_id,
                    address: response.data.data.address,
                    phone: response.data.data.phone,
                    email: response.data.data.email,
                    pay_at: persianDate,
                    pay_card_number: response.data.data.pay_card_number,
                    pay_bank: response.data.data.pay_bank,
                    discount: response.data.data.discount_price,
                    pay_amount: response.data.data.pay_amount
                })
                setSelectedProductInfo(response.data.data.cart.items)
            })
        }
    }, [])

    

    useEffect(() => {
        const totalPrice = selectedProductInfo?.reduce((acc, curr) => {
            return acc + (curr.product.price * curr.count)
        }, 0)
        setTotalPrice(totalPrice)
    }, [selectedProductInfo])

    return (
        <Formik
            initialValues={reInitialValue || initialValue}
            onSubmit={(values, props) => onSubmit(values, props, navigate)}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {formik => {
                return <Modal
                    title={location.state == null ? "افزودن سفارش" : "جزئیات سفارش"}
                    screen={true}
                >
                    <Form className="mt-4 p-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-around w-full xl:max-w-screen-xl xl:mx-auto sm:justify-evenly gap-4 border-b pb-4">
                            <div>
                                <Field name="cart_id">
                                    {props => {
                                        return <input value={formik.values.cart_id} onChange={(e)=>{formik.setFieldValue("cart_id" , e.target.value)}} onBlur={(e) => { handleGetOneCart(e.target.value, formik), props.form.setFieldValue("cart_id", e.target.value) }} type="text" placeholder="انتخاب سبد" className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                                    }}
                                </Field>
                                <ErrorMessage name="cart_id">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>
                            <div>
                                <FastField name="pay_at">
                                    {props => {
                                        return <input value={reInitialValue ? formik.values.pay_at : persianDate != null ? persianDate : "تاریخ پرداخت"} disabled name="pay_at" type="text" className="placeholder:text-gray-500 text-gray-500 bg-gray-200 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                                    }}
                                </FastField>
                            </div>
                            <div>

                                <Field name="pay">
                                    {props => {
                                        return <input name="pay" value={reInitialValue ? `پرداختی : ${formik.values.pay_amount}` : (totalPrice > 0 ? `پرداختی : ${totalPrice}` : "")} type="text" readOnly placeholder="مبلغ پرداختی" className="placeholder:text-gray-500 bg-gray-200 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />

                                    }}
                                </Field>
                            </div>
                            <div>
                                <FastField name="discount_id" >
                                    {props => {
                                        return <input value={formik.values.discount_id} onChange={(e)=>{formik.setFieldValue("discount_id", e.target.value)}} onBlur={(e) => { getDiscount(e.target.value, formik), props.form.setFieldValue("discount_id", e.target.value) }} type="text" placeholder="آیدی تخفیف" className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                                    }}
                                </FastField>
                                <ErrorMessage name="discount_id">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>
                            <div>
                                <FastField name="discount">
                                    {props => {
                                        return <input name="discount" value={reInitialValue ? `مقدار تخفیف : ${formik.values.discount}` : ` درصد تخفیف : ${percentDiscount}`} type="text" readOnly className="placeholder:text-gray-500 bg-gray-200 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />

                                    }}
                                </FastField>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 justify-around w-full xl:max-w-screen-xl xl:mx-auto sm:justify-evenly gap-1 border-b pb-4">
                            <FastField name="address" type="text" placeholder="آدرس " className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                            <ErrorMessage name="address">
                                {error => {
                                    return <span className="text-red-500 text-sm">{error}</span>
                                }}
                            </ErrorMessage>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-around w-full xl:max-w-screen-xl xl:mx-auto sm:justify-evenly gap-4 border-b pb-4">
                            <div>
                                <Field name="delivery_id" type="text">
                                    {props => {
                                        return <select value={formik.values.delivery_id} onChange={(e) => { props.form.setFieldValue("delivery_id", e.target.value) }} className=" px-4 py-2 rounded shadow focus:outline-none appearance-none w-full">
                                            <option className="text-slate-300">روش</option>
                                            {delivery.map((item, index) => {
                                                return <option key={index + 1} value={item.id}>{item.title}</option>
                                            })}
                                        </select>
                                    }}
                                </Field>

                                <ErrorMessage name="delivery_id">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>
                            <div>
                                <FastField name="phone" type="text" placeholder="تلفن" className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                                <ErrorMessage name="phone">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>
                            <div>
                                <FastField name="email" type="text" placeholder="ایمیل" className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                                <ErrorMessage name="email">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>
                            <div>
                                <FastField name="pay_card_number" type="text" placeholder="شماره کارت" className="placeholder:text-gray-500 -4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                                <ErrorMessage name="pay_card_number">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>
                            <div>
                                <FastField name="pay_bank" type="text" placeholder="نام بانک" className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                                <ErrorMessage name="pay_bank">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>
                        </div>

                        {selectedProductInfo?.map((item, index) => {
                            return (
                                <div key={index + 1} className="flex justify-center px-4 sm:px-0 mb-1">
                                    <div className="flex flex-col sm:flex-row items-center bg-gray-200 w-full sm:w-[90%] lg:w-[70%] border border-gray-300">
                                        <div className="flex-1 gap-1 flex items-center ">
                                            <span className="text-red-500 font-bold pr-2 cursor-pointer">
                                                <Icon name="xMark" size={16} />
                                            </span>
                                            <span>
                                                {item.product.title} ( قیمت واحد :{item.product.price})
                                            </span>
                                            <span>
                                                (گارانتی :{item.guarantee?.title})
                                            </span>
                                            <span>
                                                <div style={{ backgroundColor: item.color.code }} className="w-4 h-4 rounded-full "></div>
                                            </span>
                                        </div>
                                        <div className="sm:w-28 w-full bg-white text-center sm:p-2">{item.count}</div>
                                        <div className="w-28 flex justify-center items-center">عدد</div>
                                    </div>
                                </div>
                            )
                        })}

                        {location.state == null ?
                            <div className="flex justify-center mt-8">
                                <button type="submit" className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>
                            </div>
                            : null}
                    </Form>
                </Modal>
            }}


        </Formik>

    );
}

export default ModalOrders;
