import { useContext } from "react";
import Icon from "../../layouts/sidebar/Icons";
import ModalCategory from "./ModalCategory";
import { ModalContext } from "../../contexts/ModalContext";
import Tabel from "../../components/Tabel";

const Category = () => {
  const { showModal, setShowModal } = useContext(ModalContext);
  const data = [
    {
      id: 1,
      category: "aaa",
      title: "aaa",
      price: "111",
    },
    {
      id: 2,
      category: "bbb",
      title: "bbb",
      price: "222",
    },
  ];

  const dataInfo = [
    { field: "id", value: "#" },
    { field: "category", value: "عنوان" },
    { field: "title", value: "وضعیت" },
  ];
  const tabelActions ={
    title :"عملیات" ,
    icons :()=>{
      return (
        <td className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
                <button className="text-blue-500">
                  <Icon name="share" size={16} />
                </button>
                <button className="text-yellow-500">
                  <Icon name="pen" size={16} />
                </button>
                <button className="text-green-500">
                  <Icon name="plus" size={16} />
                </button>
                <button className="text-red-500">
                  <Icon name="xMark" size={16} />
                </button>
              </td>
      )
    }
  }
  return (
    <div className="mt-[72.5px] overflow-hidden">
      <h2 className="text-center text-2xl py-6">مدیریت دسته بندی محصولات</h2>
      
      <div className="p-4">
        <Tabel numOfData={2} data={data} dataInfo={dataInfo} tabelActions={tabelActions} title="جستجو" placeholder="لطفا قسمتی از عنوان را وارد کنید"/>
      </div>
      
      {showModal && <ModalCategory />}
    </div>
  );
};

export default Category;
