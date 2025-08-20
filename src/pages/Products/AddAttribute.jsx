import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { get, post } from "../../services/httpRequest";
import { PulseLoader } from "react-spinners";
import { object, string } from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
const token = JSON.parse(localStorage.getItem("token"))
const onSubmit = async(values ,id) => {
    let data ={} ;
    for(let value in values){
        if(values[value]!= ""){
            data ={...data ,[value]:{value : values[value]}}
        }
    }
    try {
        const response =await post(`/admin/products/${id}/add_attr`,data ,{ Authorization: `Bearer ${token}` })
        toast.success(response.data.message)
    } catch (error) {
        console.log(error)
    }
}

const AddAttribute = () => {
    const [attrs, setAttrs] = useState([]);
    const [initialValue, setInitialValue] = useState(null);
    const [validationSchema, setValidationSchema] = useState();
    
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const categories = location.state.categories;

    function getAtrributes() {
        setLoading(true)
        let attrArray = [];
        let initial = {};
        let validate = {};

        Promise.all(
            categories.map(async (item) => {
                const response = await get(`/admin/categories/${item.id}/attributes`, "", { Authorization: `Bearer ${token}` })
                if (response.data.data.length > 0) {
                    attrArray = [...attrArray, { title: item.title, data: response.data.data }]
                    setLoading(false)
                    for (let d of response.data.data) {
                        initial = { ...initial, [d.id]: "" }
                        validate = { ...validate, [d.id]: string() }
                    }

                } else {
                    attrArray = []
                    setLoading(false)
                }
            })
        ).then(() => {
            setAttrs(attrArray)
            setInitialValue(Object.keys(initial).length > 0 ? initial : {})
            setValidationSchema(Object.keys(initial).length > 0 ? object(validate) : {})
        })

    }
    useEffect(() => {
        getAtrributes();
    }, [])


    return (
        <>
            {initialValue ?
                <Formik
                    initialValues={initialValue}
                    onSubmit={(values)=>onSubmit(values ,location.state.id)}
                    validationSchema={validationSchema}
                >
                    <div className="text-center space-y-4 mt-4 p-4">
                        <h2 className="text-center text-2xl pt-6 mt mb-4 mt-10">افزودن ویژگی محصول : <span className="text-blue-500 ">{location.state.title}</span></h2>
                        {attrs.length > 0 ?
                            <Form>
                                <div>{attrs.map((item, index) => {
                                    return (
                                        <div key={index + 1} className="">
                                            <h2 className="text-blue-500 mb-1 mt-6">گروه : {item.title}</h2>
                                            {item.data.map((attr) => {


                                                return (
                                                    <Fragment key={attr.id}>
                                                        <div className="flex justify-center mb-1">
                                                            <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-[18%] py-2 px-4">
                                                                {attr.title}
                                                            </span>
                                                            <div className=" w-3/4 flex md:w-1/2 border border-gray-400">
                                                                <Field name={attr.id} type="text" className="focus:outline-none appearance-none flex-1 px-2" />
                                                                <span className="bg-blue-300/50 border w-28 p-2 px-4">{attr.unit}</span>
                                                            </div>
                                                        </div>
                                                        <ErrorMessage name={attr.id}>
                                                            {error => {
                                                                return <span className="text-sm text-red-500">{error}</span>
                                                            }}
                                                        </ErrorMessage>
                                                    </Fragment>
                                                )
                                            })}
                                        </div>
                                    )
                                })}</div>
                                <div className="flex justify-center gap-4 items-center mt-10">
                                    <button type="submit" className="bg-blue-600 text-white px-10 py-2 rounded-md">
                                        ذخیره
                                    </button>
                                    <button type="button" onClick={() => { navigate(-1) }} className="text-white bg-gray-600 px-8 rounded-md py-2">بازگشت</button>
                                </div>
                            </Form>

                            : loading ? <PulseLoader size={20} color="purple" /> : <span>هیچ ویژگی برای گروه های این محصول انتخاب نشده است</span>}

                    </div>
                </Formik>
                : null}
        </>
    );
}

export default AddAttribute;
