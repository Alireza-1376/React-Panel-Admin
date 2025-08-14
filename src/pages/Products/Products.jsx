import { Fragment, useContext, useEffect, useState } from 'react';
import Icon from '../../layouts/sidebar/Icons';
import ModalProduct from './ModalProduct';
import { ModalContext } from '../../contexts/ModalContext';
import Tabel from '../../components/Tabel';
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';
import { get } from '../../services/httpRequest';
import ProductTabel from '../../components/ProductTabel';
import { elements } from 'chart.js';

const Products = () => {
  const token = JSON.parse(localStorage.getItem('token'))
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countInPage, setCountInPage] = useState(5);
  const [numOfPage, setNumOfPage] = useState();

  const { showModal, setShowModal, editModal, setEditModal, addProperty, setAddProperty } = useContext(ModalContext)


  async function getProductData(currentPage, countInPage, searchInput) {
    setLoading(true)
    try {
      const response = await get(`/admin/products?page=${currentPage}&count=${countInPage}&searchChar=${searchInput}`, "", { Authorization: `Bearer ${token}` })
      if (response.status == 200) {
        setData(response.data.data)
        setNumOfPage(response.data.last_page)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  useEffect(() => {
    getProductData(currentPage, countInPage, searchInput)
  }, [currentPage ])

  const handleSearchData=(value)=>{
    getProductData(1, countInPage, value)
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
            <button className="text-yellow-500">
              <Icon name="pen" size={16} />
            </button>
            <button className="text-green-500">
              <Icon name="plus" size={16} />
            </button>
            <button className="text-red-500">
              <Icon name="xMark" size={16} />
            </button>
          </div>
        )
      }
    }
  ];

  return (
    <div className="mt-[72.5px] overflow-hidden">
      <h2 className="text-center text-2xl py-6">مدیریت محصولات</h2>

      <div id="products-table" className="m-4 overflow-x-auto">
        <ProductTabel
          title="جستجو"
          placeholder="قسمتی از عنوان را وارد کنید"
          data={data}
          loading={loading}
          setSearchInput={setSearchInput}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          numOfPage={numOfPage}
          setShowModal={setShowModal}
          dataInfo={dataInfo}
          handleSearchData={handleSearchData}
        />
      </div>

      {showModal && <ModalProduct />}
      {/* {editModal && <EditProduct />}
      {addProperty && <AddProduct />} */}
    </div>
  );
}

export default Products;
