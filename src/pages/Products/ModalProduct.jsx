import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../../layouts/sidebar/Icons";
import { FastField, Formik, Form, ErrorMessage, Field } from "formik";
import { mixed, number, object, string } from "yup";
import { useEffect, useState } from "react";
import { get, post, put } from "../../services/httpRequest";
import { PulseLoader } from "react-spinners";
import SelectItems from "./SelectItems";
import toast from "react-hot-toast";
import CKeditor from "../../components/CKEditor";
const token = JSON.parse(localStorage.getItem('token'));
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
const onSubmit = async (values, location) => {

  if (location.state != null) {
    if (values.image == "") {
      delete values.image;
      try {
        const response = await put(`/admin/products/${values.id}`, values, { Authorization: `Bearer ${token}` })
        if (response.status == 200) {
          toast.success(response.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    } 

  } else {
    if (values.image) {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key])
      }
      const response = await post("/admin/products", formData, { Authorization: `Bearer ${token}` })
      if (response.status == 201) {
        toast.success(response.data.message)
      }
    } else {
      const response = await post("/admin/products", values, { Authorization: `Bearer ${token}` })
      console.log(response)
      if (response.status == 201) {
        toast.success(response.data.message)
      }
    }

  }
}

const validationSchema = object({
  parent_ids: string(),
  category_ids: string().required("لطفا دسته ی محصول را انتخاب کنبد"),
  title: string().required('لطفا عنوان محصول را وارد کنید'),
  price: number().required("لطفا قیمت محصول را وارد کنید"),
  image: mixed().test("size", "سایز عکس بادید کمتر از 100 کیلوبایت باشد", (value) => {
    return !value ? true : value.size < 100 * 1024;
  })
})

const ModalProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reInitialValue, setReInitialValue] = useState(null);
  const [categoryParents, setCategoryParents] = useState([]);
  const [categoryChildrens, setCategoryChildrens] = useState([]);
  const [colors, setColors] = useState([]);
  const [guarantee, setGuarantee] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false)
  const [editColors, setEditColors] = useState([]);
  const [editGuatantee, setEditGuarantie] = useState([]);
  const [editCategorieChildren, setEditCategoreChildren] = useState([]);

  async function getCategoriesParents() {
    try {
      const response = await get("/admin/categories", "", { Authorization: `Bearer ${token}` })
      setCategoryParents(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getAllColors() {
    try {
      const response = await get("/admin/colors", "", { Authorization: `Bearer ${token}` })
      setColors(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getAllGuarantee() {
    try {
      const response = await get("/admin/guarantees", "", { Authorization: `Bearer ${token}` })
      setGuarantee(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getAllBrands() {
    try {
      const response = await get("/admin/brands", "", { Authorization: `Bearer ${token}` })
      setBrands(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
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

  useEffect(() => {
    getCategoriesParents();
    getAllColors();
    getAllGuarantee();
    getAllBrands();
    if (location.state != null) {
      for (let key in location.state) {
        if (location.state[key] == null) {
          location.state[key] = ""
        }
      }
      setReInitialValue({
        ...location.state,
        category_ids: location.state.categories.map((item) => item.id).join("-"),
        color_ids: location.state.colors.map((item) => item.id).join("-"),
        guarantee_ids: location.state.guarantees.map((item) => item.id).join("-"),
        parent_ids: location.state.parent_ids = "",
        image: "",
      })
      setEditColors(location.state.colors)
      setEditGuarantie(location.state.guarantees)
      setEditCategoreChildren(location.state.categories)
    }
  }, [location.state])

  return (
    <Formik
      initialValues={reInitialValue || initialValues}
      onSubmit={(values) => onSubmit(values, location)}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {formik => {
        return <Form className="text-center space-y-4 mt-4 p-4">
          <h2 className="text-center text-2xl pt-6 mt-10">{location.state == null ? "افزودن محصول جدید" : "ویرایش محصول"}</h2>

          <div className="flex flex-col justify-center">
            <div className="flex flex-1 justify-center">
              <span className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-[18%] px-4">
                دسته والد
              </span>
              <Field name="parent_ids">
                {props => {
                  return (
                    <select onChange={(e) => { getCategoryChildrens(e); props.form.setFieldValue("parent_ids", e.target.value) }} className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400">
                      <option value="">انتخاب دسته والد</option>
                      {categoryParents.map((item) => {
                        return <option key={item.id} value={item.id}>{item.title}</option>
                      })}
                    </select>
                  )
                }}
              </Field>
            </div>

            <ErrorMessage name="parent_ids">
              {error => {
                return <span className="text-sm text-red-500">{error}</span>
              }}
            </ErrorMessage>
          </div>

          <div className="flex flex-col gap-1">
            <SelectItems
              childeArray={categoryChildrens}
              loading={loading}
              form={formik}
              title="دسته اصلی"
              selectValue="دسته ی مورد نظر را انتخاب کنید"
              formValue="category_ids"
              editArray={editCategorieChildren}
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex justify-center">
              <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-[18%] py-2 px-4">
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
              <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-[18%] py-2 px-4">
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
            <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-[18%] py-2 px-4">
              وزن
            </span>
            <FastField name="weight"
              placeholder="وزن محصول (کیلوگرم)"
              type="text"
              className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
            />
          </div>

          <div className="flex justify-center">
            {brands.length > 0 ?
              <>
                <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-[18%] py-2 px-4">
                  برند
                </span>
                <div className=" w-3/4 flex md:w-1/2 border border-gray-400 bg-white">
                  <FastField name="brand_id" >
                    {prop => {
                      return (
                        <select onChange={(e) => { prop.form.setFieldValue("brand_id", e.target.value) }} className="focus:outline-none appearance-none flex-1 px-2">
                          <option value="">برند مورد نظر را انتخاب کنید</option>
                          {brands.map((item) => {
                            return <option key={item.id} value={item.id}>{item.original_name}</option>
                          })}
                        </select>
                      )
                    }}
                  </FastField>
                  <button className="bg-blue-300/50 border p-2 px-4">+</button>
                </div>
              </>
              : null}
          </div>

          <div>
            <SelectItems
              childeArray={colors}
              loading={loading}
              form={formik}
              title="رنگ"
              selectValue="رنگ مورد نظر را انتخاب کنید"
              formValue="color_ids"
              editArray={editColors}
            />
          </div>

          <div className="flex flex-col gap-1">
            <SelectItems
              childeArray={guarantee}
              loading={loading}
              form={formik}
              title="گارانتی"
              selectValue="گارانتی مورد نظر را انتخاب کنید"
              formValue="guarantee_ids"
              editArray={editGuatantee}
            />
          </div>

          <div className="flex justify-center ">
            <div className="w-full md:w-[68.1%]">
              <CKeditor 
              name="descriptions"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <span className="bg-blue-300/50 border flex justify-center items-center border-gray-400 w-1/4 md:w-[18%] py-2 px-4">
              توضیحات کوتاه
            </span>
            <FastField name="short_descriptions"
              as="textarea"
              placeholder="توضیحات"
              rows={2}
              type="text"
              className="focus:outline-none w-3/4 md:w-1/2 border border-gray-400 p-2"
            ></FastField>
          </div>

          <div className="flex justify-center">
            <span className="bg-blue-300/50 border flex justify-center items-center border-gray-400 w-1/4 md:w-[18%] py-2 px-4">
              توضیحات سبد
            </span>
            <FastField name="cart_descriptions"
              as="textarea"
              placeholder="توضیحات"
              rows={2}
              type="text"
              className="focus:outline-none w-3/4 md:w-1/2 border border-gray-400 p-2"
            ></FastField>
          </div>


          <div className="flex flex-col justify-center items-center">
            <div className='flex  w-full justify-center'>
              <button type='button' className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-[18%] py-2 px-4">تصویر</button>
              <FastField name="image" >
                {props => {
                  return <input onChange={(e) => { props.form.setFieldValue("image", e.target.files[0]) }} type="file" className=" file:bg-blue-300/50    w-3/4 md:w-1/2 bg-white file:border-0  file:py-[11px] focus:outline-none border border-gray-400" />
                }}
              </FastField>
            </div>
            <ErrorMessage name='image'>
              {(error) => {
                return <span className="text-sm text-red-500 block">{error}</span>
              }}
            </ErrorMessage>
          </div>


          <div className="flex justify-center">
            <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-[18%] py-2 px-4">
              توضیح تصویر
            </span>
            <FastField name="alt_image"
              placeholder="توضیح"
              type="text"
              className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
            />
          </div>

          <div className="flex justify-center">
            <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-[18%] py-2 px-4">
              کلمات کلیدی
            </span>
            <FastField name="keywords"
              placeholder="مثلا : تست1- تست2"
              type="text"
              className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
            />
          </div>

          <div className="flex justify-center">
            <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-[18%] py-2 px-4">
              موجودی
            </span>
            <FastField name="stock"
              placeholder="عدد"
              type="text"
              className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
            />
          </div>

          <div className="flex justify-center">
            <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-[18%] py-2 px-4">
              درصد تخفیف
            </span>
            <FastField name="discount"
              placeholder="عدد"
              type="text"
              className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
            />
          </div>

          <div className="flex justify-center gap-4 items-center">
            {formik.isSubmitting ? <PulseLoader size={20} color="purple" /> : <button type="submit" className="bg-blue-600 text-white px-10 py-2 rounded-md">
              {location.state == null ? "ذخیره" : "ویرایش"}
            </button>}
            <button type="button" onClick={() => { navigate(-1) }} className="text-white bg-gray-600 px-8 rounded-md py-2">بازگشت</button>
          </div>
        </Form>

      }}
    </Formik>

  );
};

export default ModalProduct;
