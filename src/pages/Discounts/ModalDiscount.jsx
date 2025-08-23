import { ErrorMessage, FastField, Form, Formik } from "formik";
import { PulseLoader } from "react-spinners";
import { object } from "yup";
import Modal from "../../components/Modal";
import Icon from "../../layouts/sidebar/Icons";

const initialValues = {}
const onSubmit = (values) => {
    console.log(values)
}
const validationSchema = object({})

const ModalDiscount = ({setShowModal}) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {formik => {
                return <Modal
                    title=""
                    screen={false}
                >
                    <Form className="text-center space-y-8 mt-4 p-4">
                        <div className="flex flex-col justify-center">
                            <div className='flex'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-28 text-sm px-4">عنوان کد</button>
                                <input name="title" placeholder="کیبورد را در حالت فارسی قرار دهید" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className='flex'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-28 text-sm px-4">کد تخفیف</button>
                                <input name="title" placeholder="کیبورد را در حالت لاتین قرار دهید" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className='flex'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-28 text-sm px-4">درصد تخفیف</button>
                                <input name="title" placeholder="فقط عدد" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className='flex'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 text-sm w-28 px-4">تاریخ اعتبار</button>
                                <input name="title" placeholder="مثلا : 1400/12/04" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className='flex flex-1'>
                                <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 text-sm w-28 px-4">برای </button>
                                <input name="title" placeholder="قسمتی از نام محصول را وارد کنید" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400" />
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <span className="bg-green-200 items-center p-1 px-2 rounded-full inline-flex text-start">
                                <button className="text-red-500">
                                    <Icon name="xMark" />
                                </button>
                                <span>محصول 1</span>
                            </span>
                        </div>


                        <div className="flex gap-4 justify-center">
                            <button type='submit' className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>
                            <button className="text-white bg-gray-600 px-6 rounded-md py-2" type="button" onClick={()=>{setShowModal(false)}}>انصراف</button>
                        </div>
                    </Form>
                </Modal>
            }}
        </Formik>


    );
}

export default ModalDiscount;
