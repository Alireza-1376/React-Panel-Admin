import { useContext, useEffect, useState } from "react";
import Icon from "../../layouts/sidebar/Icons";
import ModalCategory from "./ModalCategory";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";
import AddProperty from "./AddProperty";
import EditCategory from "./EditCategory";
import { Delete, get } from "../../services/httpRequest";
import Tooltip from "@mui/material/Tooltip";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import CategoriesChildren from "./CategoriesChildren";
import PrevPage from "../../components/PrevPage";
import moment from "moment-jalaali";
import { PulseLoader } from "react-spinners";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Category = () => {
  const [editId, setEditId] = useState();
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { showModal, setShowModal, editModal, setEditModal, addProperty, setAddProperty } = useContext(ModalContext);
  const [data, setData] = useState([])
  const token = JSON.parse(localStorage.getItem("token"))

  async function getCategories() {
    setLoading(true)
    try {
      const response = await get("/admin/categories", params ? params.id : "", { Authorization: `Bearer ${token}` })
      if (response.status == 200) {
        setData(response.data.data)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    getCategories()
  }, [params])


  async function getParents() {
    try {
      const response = await get("/admin/categories", "", { Authorization: `Bearer ${token}` })
      setParents(response.data.data.map((item) => {
        return { id: item.id, value: item.title }
      }))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getParents()
  }, [])
  const dataInfo = [
    { field: "id", value: "#" },
    { field: "title", value: "عنوان محصول" },
    { field: "parent_id", value: "والد" },
  ];

  function handleDeleteCategory(id, title) {
    Swal.fire({
      title: "حذف کردن",
      text: `آیا از حذف ${title} مطمئن هستید ؟`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "بله",
      cancelButtonText: "خیر"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          Delete(`/admin/categories/${id}`, { Authorization: `Bearer ${token}` })
          const filteredData =data.filter((item)=>{
            return item.id!=id ;
          })
          setData(filteredData)
          Swal.fire({
            text: "با موفقیت حذف شد",
            icon: "success"
          });
        } catch (error) {
          toast("خطا در حذف دسته بندی")
        }
      }
    });

  }

  function icons(item) {

    return (
      <div className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
        {!item.parent_id ? <Tooltip title="زیر مجموعه" arrow><button onClick={() => { navigate(`/categories/${item.id}`, { state: item.title }) }} className="text-blue-500">
          <Icon name="share" size={16} />
        </button></Tooltip> : null}
        <Tooltip title="ویرایش" arrow>
          <button onClick={() => {
            setEditModal(true)
            setEditId(item.id)
          }} className="text-yellow-500">
            <Icon name="pen" size={16} />
          </button>
        </Tooltip>
        <button onClick={() => { setAddProperty(true) }} className="text-green-500">
          <Icon name="plus" size={16} />
        </button>
        <Tooltip title="حذف" arrow>
          <button type="submit" onClick={() => { handleDeleteCategory(item.id, item.title) }} className="text-red-500">
            <Icon name="xMark" size={16} />
          </button>
        </Tooltip>
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
      title: "تاریخ",
      elements: (item) => moment(item.created_at).format('jYYYY/jM/jD')
    },
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
      <div className="px-4 flex justify-between">
        <Outlet />
        <PrevPage />
      </div>
      <div className="p-4">
        <Tabel loading={loading} numOfData={5} data={data} dataInfo={dataInfo} addFields={addFields} title="جستجو" placeholder="لطفا قسمتی از عنوان را وارد کنید" />
      </div>

      {showModal && <ModalCategory parents={parents} setParents={setParents} />}
      {editModal && <EditCategory editId={editId} parents={parents} />}
      {addProperty && <AddProperty />}
    </div>
  );
};

export default Category;
