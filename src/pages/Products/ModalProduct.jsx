import { useNavigate } from "react-router-dom";
import Icon from "../../layouts/sidebar/Icons";
import { FastField, Formik, Form, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useEffect, useState } from "react";
import { get } from "../../services/httpRequest";
import { PulseLoader } from "react-spinners";

const initialValues = {
  parent_ids: "",
  category_ids: "",
  title: "",
  price: "",
  weight: "",
  brand_id: "",
  color_ids: "",
  guarantee_ids: "",
  descriptions: "",
  short_descriptions: "",
  cart_descriptions: "",
  image: "",
  alt_image: "",
  keywords: "",
  stock: "",
  discount: ""
}
const onSubmit = (values) => {
  console.log(values)
}
const validationSchema = object({
  parent_ids: string().required("لطفا دسته ی والد را انتخاب کنبد"),
  category_ids: string().required("لطفا دسته ی محصول را انتخاب کنبد").matches(/^-?\d+\.?\d*$/, "آیدی محصول را وارد کنید"),
  title: string().required('لطفا عنوان محصول را وارد کنید'),
  price: string().required("لطفا قیمت محصول را وارد کنید").matches(/^-?\d+\.?\d*$/, "لطفا عدد وارد کنید"),
})



const ModalProduct = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'));
  const [categoryParents, setCategoryParents] = useState([]);
  const [categoryChildrens, setCategoryChildrens] = useState([]);
  const [loading ,setLoading] =useState(false)

  async function getCategoriesParents() {
    try {
      const response = await get("/admin/categories", "", { Authorization: `Bearer ${token}` })
      setCategoryParents(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategoriesParents()
  }, [])

  async function getCategoryChildrens(e) {
    setLoading(true)
    if (e.target.value == "") {
      setCategoryChildrens([])
      setLoading(false)
      return null;
    }
    try {
      setCategoryChildrens([])
      const response = await get("/admin/categories", e.target.value, { Authorization: `Bearer ${token}` })
      setCategoryChildrens(response.data.data);
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="text-center space-y-4 mt-4 p-4">
        <h2 className="text-center text-2xl pt-6 mt-10">افزودن محصول جدید</h2>

        <div className="flex flex-col justify-center">
          {categoryParents.length > 0 ?
            <div className="flex flex-1 justify-center">
              <span className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-28 px-4">
                دسته والد
              </span>
              <FastField name="parent_ids">
                {props => {
                  return (
                    <select onChange={(e) => getCategoryChildrens(e)} className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400">
                      <option value="">انتخاب دسته والد</option>
                      {categoryParents.map((item) => {
                        return <option key={item.id} value={item.id}>{item.title}</option>
                      })}
                    </select>
                  )
                }}
              </FastField>
            </div>
            : null}
          <ErrorMessage name="parent_ids">
            {error => {
              return <span className="text-sm text-red-500">{error}</span>
            }}
          </ErrorMessage>
        </div>

        <div className="flex flex-col gap-1">

          {categoryChildrens.length > 0 ? 
          <>
          <div className="flex flex-col justify-center">
            <div className="flex flex-1 justify-center">
              <span className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-28 px-4">
                دسته اصلی
              </span>
              <FastField name="category_ids" >
                {props => {
                  return (
                    <select className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400">
                      <option value="">دسته ی مورد نظر را انتخاب کنید</option>
                      {categoryChildrens.map((item) => {
                        return <option value={item.id}>{item.title}</option>
                      })}
                    </select>
                  )
                }}
              </FastField>
            </div>

            <ErrorMessage name="category_ids">
              {error => {
                return <span className="text-sm text-red-500">{error}</span>
              }}
            </ErrorMessage>
          </div>
          <div className="flex justify-center">
            <div className="flex justify-start gap-1 w-full md:w-5/6 lg:w-3/4 md:pr-[10%] lg:pr-[8.5%]">
              <span className="flex items-center bg-green-200 py-1 px-4 rounded-full">
                <Icon name="xMark" />
                <span>دسته فلان</span>
              </span>
              <span className="flex items-center bg-green-200 py-1 px-4 rounded-full">
                <Icon name="xMark" />
                <span>دسته فلان</span>
              </span>
            </div>
          </div>
          </>
          : loading ?  <div className="text-center"><PulseLoader size={20} color="purple" /></div>  : null}
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-28 py-2 px-4">
              عنوان
            </span>
            <FastField name="title"
              placeholder="عنوان محصول"
              type="text"
              className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
            />
          </div>
          <ErrorMessage name="title">
            {error => {
              return <span className="text-sm text-red-500">{error}</span>
            }}
          </ErrorMessage>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-28 py-2 px-4">
              قیمت
            </span>
            <FastField name="price"
              placeholder="قیمت محصول"
              type="text"
              className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
            />
          </div>
          <ErrorMessage name="price">
            {error => {
              return <span className="text-sm text-red-500">{error}</span>
            }}
          </ErrorMessage>
        </div>

        <div className="flex justify-center">
          <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-28 py-2 px-4">
            وزن
          </span>
          <FastField name="weight"
            placeholder="وزن محصول (کیلوگرم)"
            type="text"
            className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
          />
        </div>

        <div className="flex justify-center">
          <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-28 py-2 px-4">
            برند
          </span>
          <div className=" w-3/4 flex md:w-1/2 border border-gray-400 bg-white">
            <FastField name=" brand_id"
              placeholder="قسمتی از نام برند را انتخاب کنید"
              type="text"
              className="focus:outline-none flex-1 px-2"
            />
            <button className="bg-blue-300/50 border p-2 px-4">+</button>
          </div>
        </div>

        <div>
          <div className="flex justify-center">
            <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-28 py-2 px-4">
              رنگ
            </span>
            <FastField name="color_ids"
              placeholder="قسمتی از نام رنگ را انتخاب کنید"
              type="text"
              className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-center">
            <span className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-28 px-4">
              گارانتی
            </span>
            <FastField name="guarantee_ids"
              placeholder="قسمتی از نام گارانتی را وارد کنید"
              type="text"
              className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
            />
          </div>
          <div className="flex justify-center">
            <div className="flex justify-start gap-1 w-full md:w-5/6 lg:w-3/4 md:pr-[11.5%] lg:pr-[9%]">
              <span className="flex items-center bg-green-200 py-1 px-4 rounded-full">
                <Icon name="xMark" />
                <span>گارانتی فلان</span>
              </span>
              <span className="flex items-center bg-green-200 py-1 px-4 rounded-full">
                <Icon name="xMark" />
                <span>گارانتی فلان</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <span className="bg-blue-300/50 border flex justify-center items-center border-gray-400 w-1/4 md:w-28 py-2 px-4">
            توضیحات
          </span>
          <FastField name="descriptions"
            as="textarea"
            placeholder="توضیحات"
            rows={5}
            type="text"
            className="focus:outline-none w-3/4 md:w-1/2 border border-gray-400 p-2"
          ></FastField>
        </div>

        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-10 py-2 rounded-md">
            ذخیره
          </button>
          <button type="button" onClick={() => { navigate(-1) }} className="text-white bg-gray-600 px-8 rounded-md py-2">بازگشت</button>
        </div>
      </Form>
    </Formik>

  );
};

export default ModalProduct;
