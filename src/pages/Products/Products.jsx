import { useEffect, useState } from 'react';
import Icon from '../../layouts/sidebar/Icons';
import { Delete, get } from '../../services/httpRequest';
import ProductTabel from '../../components/ProductTabel';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import Tooltip from '@mui/material/Tooltip';
import {  useNavigate } from 'react-router-dom';

const Products = () => {
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countInPage, setCountInPage] = useState(8);
  const [numOfPage, setNumOfPage] = useState();



  async function getProductData(currentPage, countInPage, searchInput) {
    setLoading(true)
    try {
      const token = JSON.parse(localStorage.getItem('token'))
      const response = await get(`/admin/products?page=${currentPage}&count=${countInPage}&searchChar=${searchInput}`, "", { Authorization: `Bearer ${token}` })
      if (response.status == 200) {
        setData(response.data.data)
        setNumOfPage(response.data.last_page)
        setLoading(false)
      }
    } catch (error) {
      toast.error("شما به این صفحه دسترسی ندارید")
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData(currentPage, countInPage, searchInput)
  }, [currentPage])

  const handleSearchData = (value) => {
    getProductData(1, countInPage, value)
  }

  const handleDelete = (item) => {
    Swal.fire({
      title: "حذف کردن",
      text: `آیا از حذف ${item.title} مطمئن هستید ؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = JSON.parse(localStorage.getItem('token'))
          const response = await Delete(`/admin/products/${item.id}`, { Authorization: `Bearer ${token}` })
          toast.success(response.data.message)
          getProductData(currentPage, countInPage, searchInput)
          Swal.fire({
            text: "با موفقیت حذف شد",
            icon: "success"
          });

        } catch (error) {
          toast.error("خطا در حذف رنگ ")
        }
      }
    });
  }

  const dataInfo = [
    { field: "id", value: "#" },
    {
      field: null, value: "گروه محصول",
      elements: (item) => {
        return (
          <span
            key={item.id}
          >
            {item.categories[0].title}
          </span>
        )
      }
    },
    { field: "title", value: "عنوان" },
    { field: "price", value: "قیمت" },
    { field: "stock", value: "موجودی" },
    {
      field: null,
      value: "عملیات",
      elements: (item) => {
        return (
          <div className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">

            <Tooltip title="ویرایش " arrow>
              <button onClick={() => { navigation('/products/add-product', { state: item }) }} className="text-yellow-500">
                <Icon name="pen" size={16} />
              </button>
            </Tooltip>

            <Tooltip title="افزودن ویژگی" arrow>
              <button onClick={() => { navigation('/products/set-attribute', { state: item }) }} className="text-green-500">
                <Icon name="plus" size={16} />
              </button>
            </Tooltip>

            <Tooltip title="افزودن تصویر" arrow>
              <button onClick={() => { navigation('/products/gallery', { state: item }) }} className="text-purple-500">
                <Icon name="image" size={16} />
              </button>
            </Tooltip>

            <Tooltip title="حذف" arrow>
              <button onClick={() => handleDelete(item)} className="text-red-500">
                <Icon name="xMark" size={16} />
              </button>
            </Tooltip>
          </div>
        )
      }
    }
  ];

  return (
    <div className="mt-[72.5px] overflow-hidden w-full ">
      <h2 className="text-center text-2xl py-6">مدیریت محصولات</h2>
      <div id="products-table" className="m-4 ">
        <ProductTabel
          title="جستجو"
          placeholder="قسمتی از عنوان را وارد کنید"
          data={data}
          loading={loading}
          setSearchInput={setSearchInput}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          numOfPage={numOfPage}
          dataInfo={dataInfo}
          handleSearchData={handleSearchData}
          url="/products/add-product"
          pTitle="create_product"
        />
      </div>
    </div>
  );
}

export default Products;
