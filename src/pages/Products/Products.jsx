
import React, { useContext, useState } from 'react';
import Icon from '../../layouts/sidebar/Icons';
import ModalProduct from './ModalProduct';
import { ModalContext } from '../../contexts/ModalContext';
import Tabel from '../../components/Tabel';

const Products = () => {
  const {showModal ,setShowModal} = useContext(ModalContext)
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
    {
      id: 3,
      category: "ccc",
      title: "ccc",
      price: "333",
    },
  ];

  const dataInfo = [
    { field: "id", value: "#" },
    { field: "category", value: "عنوان" },
    { field: "title", value: "وضعیت" },
    { field: "price", value: "قیمت" },
  ];
  const tabelActions ={
    title :"عملیات" ,
    icons :(id)=>{
      return (
        <td className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
           <button onClick={()=>{console.log(id)}} className="text-yellow-500">
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

      <div className="flex justify-between p-4">
        <div className="w-1/2 flex items-center">
          <button className="bg-blue-300/50 border border-gray-400 py-2 px-4">جستجو</button>
          <input placeholder="قسمتی از عنوان را وارد کنید" type="text" className="focus:outline-none p-2 w-4/5 md:w-1/2 border border-gray-400"/>
        </div>
        <div onClick={()=>{setShowModal(true)}} className="bg-green-700 text-white p-3 rounded-md cursor-pointer">
          <Icon name="plus" size={18} />
        </div>
      </div>

      <div id="products-table" className="m-4 overflow-x-auto">
        <Tabel data={data} dataInfo={dataInfo} tabelActions={tabelActions}/>
      </div>

      <div className="p-4 flex justify-center">
        <ul className="flex items-center border border-slate-300 bg-white divide-x-2" dir="ltr">
            <li className="p-3 text-blue-500 font-bold cursor-pointer">
                <Icon name="chevronLeft" size={14}/>
            </li>
            <li className="p-2 px-4 text-blue-500 font-bold cursor-pointer">
                <a href="">1</a>
            </li>
            <li className="p-2 px-4 text-blue-500 font-bold cursor-pointer">
                <a href="">2</a>
            </li>
            <li className="p-2 px-4 text-blue-500 font-bold cursor-pointer">
                <a href="">3</a>
            </li>
            <li className="p-3 text-blue-500 font-bold cursor-pointer">
                <Icon name="chevronRight" size={14}/>
            </li>
        </ul>
      </div>
      {showModal && <ModalProduct />}
    </div>
    );
}

export default Products;
