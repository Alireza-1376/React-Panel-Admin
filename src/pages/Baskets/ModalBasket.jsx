import { ErrorMessage, FastField, Field, Form, Formik } from "formik";
import Modal from "../../components/Modal";
import Icon from "../../layouts/sidebar/Icons";
import { number, object, string } from "yup";
import { useEffect, useState } from "react";
import { get, post, put } from "../../services/httpRequest";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const initialValue = {
    user_id: "",
    product_id: "",
    color_id: "",
    guarantee_id: "",
    count: ""
}

const onSubmit = (values, props, setSelectedProducts, setSelectedProductInfo, products) => {
    const randomNumber = Math.random();
    setSelectedProducts((prev) => {
        const newValue = { ...values, id: randomNumber }
        return [...prev, newValue]
    })
    setSelectedProductInfo((prev) => {
        return [...prev, {
            id: randomNumber,
            productName: products.filter((item) => { return item.id == values.product_id })[0].title,
            price: products.filter((item) => { return item.id == values.product_id })[0].price,
            guranty: products.filter((item) => { return item.id == values.product_id })[0].guarantees[0]?.title,
            count: values.count,
            color: products.filter((item) => { return item.id == values.product_id })[0].colors[0].code,
        }]
    })
    props.resetForm();
    props.setFieldValue("user_id", values.user_id)
}

const validationSchema = object({
    user_id: string().required("لطفا آیدی مشتری را وارد کنید"),
    product_id: string().required("محصول مورد نظر را انتخاب کنید"),
    color_id: number().typeError("رنگ محصول را انتخاب کنید"),
    guarantee_id: number().typeError("گارانتی محصول را انتخاب کنید"),
    count: number().typeError("فقط مجاز به وارد کردن اعداد هستید").required("تعداد محصول را وارد کنید")
})

const ModalBasket = () => {
    const [reInitialValue, setReInitialValue] = useState(null);
    const [products, setProducts] = useState([]);
    const [colors, setColors] = useState([]);
    const [guranties, setGuranties] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedProductInfo, setSelectedProductInfo] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)
    const navigate = useNavigate()
    const location = useLocation();
    
    async function getAllProducts() {
        const token = JSON.parse(localStorage.getItem("token"))
        const response = await get("/admin/products", "", { Authorization: `Bearer ${token}` })
        if (response.status == 200) {
            setProducts(response.data.data)
        }
    }
    async function getOneProduct(id) {
        const token = JSON.parse(localStorage.getItem("token"))
        const response = await get(`/admin/products/${id}`, "", { Authorization: `Bearer ${token}` })
        if (response.status == 200) {
            setColors(response.data.data.colors)
            setGuranties(response.data.data.guarantees)
        }
    }

    async function getCartToEdit(id) {
        
        const token = JSON.parse(localStorage.getItem('token'))
        const response = await get(`/admin/carts/${id}`, "", { Authorization: `Bearer ${token}` })
      
        setReInitialValue({
            user_id: response.data.data.user_id,
            product_id: "",
            color_id: "",
            guarantee_id: "",
            count: ""
        })

        let selectProduct = []
        let selectProductInfo = [];
        response.data.data.items.map((item) => {
            selectProductInfo = [...selectProductInfo, {
                id: item.id,
                productName: item.product.title,
                price: item.product.price,
                guranty: item.guarantee?.title,
                count: item.count,
                color: item.color.code,
            }]
            selectProduct = [...selectProduct, {
                id: item.id, 
                user_id: response.data.data.user_id,
                product_id: item.product_id,
                color_id: item.color_id,
                guarantee_id: item.guarantee_id,
                count: item.count
            }]
        })
        setSelectedProductInfo(selectProductInfo)
        setSelectedProducts(selectProduct)
    }


    useEffect(() => {
        getAllProducts()
        if (location.state != null) {
            getCartToEdit(location.state.id)
        }
    }, [])

    async function handleAddCarts(selectedProducts, formik) {
        if (reInitialValue != null) {
            const data = {
                user_id: formik.values.user_id,
                products: selectedProducts,
            }
            const token = JSON.parse(localStorage.getItem("token"))
            const response =await put(`/admin/carts/${location.state.id}`,data , {Authorization : `Bearer ${token}`})
            
            if(response.status==200){
                toast.success(response.data.message)
            }
        } else {
            const data = {
                user_id: formik.values.user_id,
                products: selectedProducts,
            }
            const token = JSON.parse(localStorage.getItem("token"))
            const response = await post("/admin/carts", data, { Authorization: `Bearer ${token}` })
            if (response.status == 201) {
                toast.success(response.data.message)
                navigate(-1)
            }
        }
    }

    function handleDeleteProduct(id) {

        const filteredSelectedProductInfo = selectedProductInfo.filter((item) => {
            return item.id != id
        })
        setSelectedProductInfo(filteredSelectedProductInfo)
        const filteredSelectedProducts = selectedProducts.filter((item) => {
            return item.id != id;
        })
        setSelectedProducts(filteredSelectedProducts)
    }

    useEffect(() => {
        const totalPrice = selectedProductInfo?.reduce((acc, curr) => {
            return acc + (curr.price * curr.count)
        }, 0)
        setTotalPrice(totalPrice)
    }, [selectedProductInfo])


    return (
        <Formik
            initialValues={reInitialValue || initialValue}
            onSubmit={(values, props) => onSubmit(values, props, setSelectedProducts, setSelectedProductInfo, products)}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {formik => {
                return <Modal
                    title="جزئیات و افزودن سبد خرید"
                    screen={true}
                >
                    <Form className="mt-4 p-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 justify-around  xl:max-w-screen-xl xl:mx-auto sm:justify-evenly gap-4 border-b pb-4">

                            <div className="flex flex-col">
                                <Field name="user_id">
                                    {props => {
                                        return <input value={formik.values.user_id} onChange={(e) => { props.form.setFieldValue("user_id", e.target.value) }} type="text" placeholder="آیدی مشتری" className=" px-4 py-2 rounded shadow focus:outline-none" />
                                    }}
                                </Field>
                                <ErrorMessage name="user_id">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>

                            <div className="flex flex-col">
                                <Field name="product_id" type="text">
                                    {props => {
                                        return <select value={formik.values.product_id} onChange={(e) => { props.form.setFieldValue("product_id", e.target.value); getOneProduct(e.target.value) }} className=" px-4 py-2 rounded shadow focus:outline-none appearance-none">
                                            <option className="text-slate-300">محصول</option>
                                            {products.map((item, index) => {
                                                return <option key={index + 1} value={item.id}>{item.title}</option>
                                            })}
                                        </select>
                                    }}
                                </Field>

                                <ErrorMessage name="product_id">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>

                            <div className="flex flex-col">
                                <Field name="color_id" type="text">
                                    {props => {
                                        return <select value={formik.values.color_id} onChange={(e) => { props.form.setFieldValue("color_id", e.target.value) }} className=" px-4 py-2 rounded shadow focus:outline-none appearance-none">
                                            <option value="">رنگ</option>
                                            {colors.map((item, index) => {
                                                return <option key={index + 1} value={item.id}>{item.title}</option>
                                            })}
                                        </select>
                                    }}
                                </Field>
                                <ErrorMessage name="color_id">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>

                            <div className="flex flex-col">
                                <Field name="guarantee_id" type="text">
                                    {props => {
                                        return <select value={formik.values.guarantee_id} onChange={(e) => { props.form.setFieldValue("guarantee_id", e.target.value) }} className=" px-4 py-2 rounded shadow focus:outline-none appearance-none">
                                            <option value="">گارانتی</option>
                                            {guranties.map((item, index) => {
                                                return <option key={index + 1} value={item.id}>{item.title}</option>
                                            })}
                                        </select>
                                    }}
                                </Field>
                                <ErrorMessage name="guarantee_id">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>

                            <div className="flex flex-col">
                                <Field name="count" type="text" placeholder="تعداد" className=" px-4 py-2 rounded shadow focus:outline-none" />
                                <ErrorMessage name="count">
                                    {error => {
                                        return <span className="text-red-500 text-sm">{error}</span>
                                    }}
                                </ErrorMessage>
                            </div>

                            <div className="flex  items-center flex-col">
                                <button className="bg-green-700 text-white p-2 rounded-full">
                                    <Icon name="check" size={18} />
                                </button>
                            </div>

                        </div>
                    </Form>


                    {selectedProductInfo.map((item, index) => {
                        return (
                            <div key={index + 1} className="flex justify-center px-4 sm:px-0 mb-1">
                                <div className="flex flex-col sm:flex-row items-center bg-gray-200 w-full sm:w-[90%] lg:w-[70%] border border-gray-300">
                                    <div className="flex-1 gap-1 flex items-center ">
                                        <span onClick={() => { handleDeleteProduct(item.id) }} className="text-red-500 font-bold pr-2 cursor-pointer">
                                            <Icon name="xMark" size={16} />
                                        </span>
                                        <span>
                                            {item.productName} ( قیمت واحد :{item.price})
                                        </span>
                                        <span>
                                            (گارانتی :{item.guranty})
                                        </span>
                                        <span>
                                            <div style={{ backgroundColor: item.color }} className="w-4 h-4 rounded-full "></div>
                                        </span>
                                    </div>
                                    <div className="sm:w-28 w-full bg-white text-center sm:p-2">{item.count}</div>
                                    <div className="w-28 flex justify-center items-center">عدد</div>
                                </div>
                            </div>
                        )
                    })}




                    <div className="flex justify-center mt-8 gap-4">
                        <button type="button" onClick={() => { handleAddCarts(selectedProducts, formik) }} className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>
                        <div className="flex items-center bg-gray-200 rounded-md px-4 gap-2">
                            <span>جمع کل :</span>
                            <span>{totalPrice}</span>
                        </div>
                    </div>
                </Modal>
            }}
        </Formik>
    );
}

export default ModalBasket;
