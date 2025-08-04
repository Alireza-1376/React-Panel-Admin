import { HiDevicePhoneMobile } from "react-icons/hi2";
import { BiLockAlt } from "react-icons/bi";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useEffect, useState } from "react";
import { PuffLoader, PulseLoader } from "react-spinners";
import { post } from "../services/httpRequest";



const initialValues = {
    phone: "",
    password: "",
    remember: 0,
}
const onSubmit = async (values, methods, navigate) => {
    try {
        const response = await post("/auth/login", values)
        if (response.status == 200) {
            toast.success("ورود با موفقیت انجام شد")
            localStorage.setItem('token', JSON.stringify(response.data.token))
            navigate("/")
            methods.setSubmitting(false)
        } else if (response.status == 202) {
            toast.error(response.data.phone)
            methods.setSubmitting(false)
        } else if (response.status == 203) {
            toast.error(response.data.message)
            methods.setSubmitting(false)
        }
    } catch (error) {
        toast.error("متاسفانه مشکلی از سمت سرور رخ داده است")
    }
    
}
const validationSchema = object({
    phone: string().required('لطفا شماره موبایل خود را وارد کنید'),
    password: string().required('لطفا رمز عبور خود را وارد کنید')
})
const Login = () => {
    const navigate = useNavigate();
    const [isLoading, isLogin] = useLogin();
    const [checkedLogin, setCheckedLogin] = useState("loading");
    useEffect(() => {
        if (isLogin == true) {
            setCheckedLogin("logedIn")
        } else {
            setCheckedLogin("notLogedIn")
        }
    }, [isLoading])
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><PuffLoader color="purple" size={100} /></div>;
    }
    if (checkedLogin == "loading") {
        return null;
    }
    if (checkedLogin == "logedIn") {
        return navigate('/')
    }
    if (checkedLogin == "notLogedIn") {
        return (
            <Formik
                initialValues={initialValues}
                onSubmit={(values, methods) => onSubmit(values, methods, navigate)}
                validationSchema={validationSchema}
            >
                {formik => {
                    return <div className="bg-[url('../public/images/background.jpg')] bg-cover w-screen h-screen flex items-center justify-center">
                        <div className="flex items-start justify-center bg-white/40 w-5/6 md:w-4/5 max-w-screen-lg h-4/5 rounded-lg shadow-md">
                            <div className="md:w-1/2 w-full">
                                <Form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 m-4">
                                    <h2 className="text-center text-3xl mt-16 mb-10 text-gray-600">ورود اعضا</h2>

                                    <div className="text-gray-700 relative  items-center ">
                                        <HiDevicePhoneMobile size={30} className="text-purple-700 absolute right-4 top-2" />
                                        <FastField name="phone" type="text" placeholder="شماره موبایل" className="border-0 transition-all duration-200 focus:shadow-md pr-14 focus:shadow-purple-300 rounded-3xl bg-white py-2 outline-none text-lg px-3 w-full" />
                                        <ErrorMessage name="phone">
                                            {(error) => {
                                                return <span className="text-sm text-red-500">{error}</span>
                                            }}
                                        </ErrorMessage>
                                    </div>

                                    <div className="text-gray-700 relative items-center ">
                                        <BiLockAlt size={30} className="text-purple-700 absolute right-4 top-2" />
                                        <FastField name="password" type="password" placeholder="رمز عبور" className="border-0 transition-all duration-200 focus:shadow-md pr-14 focus:shadow-purple-300 rounded-3xl bg-white py-2 outline-none text-lg px-3 w-full" />
                                        <ErrorMessage name="password">
                                            {(error) => {
                                                return <span className="text-sm text-red-500">{error}</span>
                                            }}
                                        </ErrorMessage>
                                    </div>

                                    <label className="inline-flex items-center cursor-pointer">
                                        <FastField name="remember">
                                            {(prop) => {
                                                return <input onChange={() => {
                                                    prop.form.values.remember == 0 ? prop.form.setFieldValue("remember", 1) : prop.form.setFieldValue("remember", 0)
                                                }} type="checkbox" value="" className="sr-only peer" />
                                            }}
                                        </FastField>
                                        <div className="relative w-11 h-6 bg-purple-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">من را به خاطر بسپار</span>
                                    </label>

                                    <div className="flex justify-center items-center">
                                        {formik.isSubmitting == false ? <button className="bg-purple-500 text-white w-full py-2 rounded-3xl text-lg mt-4 transition-all duration-200 hover:shadow-md hover:shadow-purple-300">ورود</button> : <PulseLoader className="mt-4
                                        " color="purple" />}
                                    </div>

                                </Form>
                            </div>
                            <div className="md:w-1/2 hidden md:flex md:h-full md:justify-center md:items-center">
                                <img src="../public/images/Login.png" alt="" />
                            </div>
                        </div>

                    </div>
                }}
            </Formik>
        );
    }

}

export default Login;
