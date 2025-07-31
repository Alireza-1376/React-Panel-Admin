
import React, { useContext, useState } from 'react';
import Icon from '../../layouts/sidebar/Icons';
import ModalProduct from './ModalProduct';
import { ModalContext } from '../../contexts/ModalContext';
import Tabel from '../../components/Tabel';

const Products = () => {
  const { showModal, setShowModal } = useContext(ModalContext)
  const data = [
    {
      id: 1,
      category: "alireza",
      title: "aaa",
      price: "111",
    },
    {
      id: 2,
      category: "habibi",
      title: "bbb",
      price: "222",
    },
    {
      id: 3,
      category: "mahsa",
      title: "ccc",
      price: "333",
    },
    {
      id: 4,
      category: "sabeti",
      title: "ddd",
      price: "ddd",
    },
  ];

  const dataInfo = [
    { field: "id", value: "#" },
    { field: "category", value: "عنوان" },
    { field: "title", value: "وضعیت" },
    { field: "price", value: "قیمت" },
  ];
  const tabelActions = {
    title: "عملیات",
    icons: (id) => {
      return (
        <td className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
          <button onClick={() => { console.log(id) }} className="text-yellow-500">
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
      <h2 className="text-center text-2xl py-6">مدیریت محصولات</h2>

      <div id="products-table" className="m-4 overflow-x-auto">
        <Tabel numOfData={1} data={data} dataInfo={dataInfo} tabelActions={tabelActions} title="جستجو" placeholder="قسمتی از متن را وارد کنید"/>
      </div>


      {showModal && <ModalProduct />}
    </div>
  );
}

export default Products;
