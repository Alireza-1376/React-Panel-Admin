import { useContext, useEffect, useState } from "react";
import Icon from "../../layouts/sidebar/Icons";
import ModalCategory from "./ModalCategory";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import AddProperty from "./AddProperty";
import EditCategory from "./EditCategory";
import { get } from "../../services/httpRequest";
import { elements } from "chart.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location =useLocation();
  console.log(location)
  const { showModal, setShowModal, editModal, setEditModal, addProperty, setAddProperty } = useContext(ModalContext);
  const [data, setData] = useState([])
  const token = JSON.parse(localStorage.getItem("token"))
  async function getCategories() {
    try {
      const response = await get("/admin/categories", params ? params.id : "", { Authorization: `Bearer ${token}` })
      if (response.status == 200) {
        setData(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    getCategories()
  }, [params])
  const dataInfo = [
    { field: "id", value: "#" },
    { field: "title", value: "عنوان محصول" },
    { field: "parent_id", value: "والد" },
    { field: "created_at", value: "تاریخ" },
  ];
  function icons(item) {
    console.log(item)
    return (
      <div className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
        {!item.parent_id ? <button title="زیر مجموعه" onClick={() => { navigate(`/categories/${item.id}`,{state:item.title}) }} className="text-blue-500">
          <Icon name="share" size={16} />
        </button> : null}
        <button onClick={() => {
          setEditModal(true)
        }} className="text-yellow-500">
          <Icon name="pen" size={16} />
        </button>
        <button onClick={() => { setAddProperty(true) }} className="text-green-500">
          <Icon name="plus" size={16} />
        </button>
        <button className="text-red-500">
          <Icon name="xMark" size={16} />
        </button>
      </div>
    )
  }
  function showInMenu(item) {

    return <span className={`${item.show_in_menu == 1 ? "text-green-600" : "text-red-600"}`}>
      {item.show_in_menu == 1 ? "هست" : "نیست"}
    </span>
  }
  const addFields = [
    {
      title: "نمایش در منو",
      elements: (item) => showInMenu(item)
    },
    {
      title: "عملیات",
      elements: (item) => icons(item),
    }
  ]


  return (
    <div className="mt-[72.5px] overflow-hidden">
      <h2 className="text-center text-2xl py-6">مدیریت دسته بندی محصولات</h2>
      {params.id ?<h2 className="text-center">زیر گروه: {location.state}</h2> : null}
      <div className="p-4">
        <Tabel numOfData={2} data={data} dataInfo={dataInfo} addFields={addFields} title="جستجو" placeholder="لطفا قسمتی از عنوان را وارد کنید" />
      </div>

      {showModal && <ModalCategory />}
      {editModal && <EditCategory />}
      {addProperty && <AddProperty />}
    </div>
  );
};

export default Category;
