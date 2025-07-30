
import React, { useState } from 'react';
import Icon from '../../layouts/sidebar/Icons';
import ModalProduct from './ModalProduct';

const Products = () => {
    const [productModal ,setProductModal] =useState(false)
    return (
        <div className="mt-[72.5px] overflow-hidden">
      <h2 className="text-center text-2xl py-6">مدیریت محصولات</h2>

      <div className="flex justify-between p-4">
        <div className="w-1/2 flex items-center">
          <button className="bg-blue-300/50 border border-gray-400 py-2 px-4">جستجو</button>
          <input placeholder="قسمتی از عنوان را وارد کنید" type="text" className="focus:outline-none p-2 w-4/5 md:w-1/2 border border-gray-400"/>
        </div>
        <div onClick={()=>{setProductModal(true)}} className="bg-green-700 text-white p-3 rounded-md cursor-pointer">
          <Icon name="plus" size={18} />
        </div>
      </div>

      <div id="products-table" className="m-4 overflow-x-auto">
        <table className="w-full min-w-[640px] bg-white shadow-md border border-gray-300">
          <thead className="border border-gray-300 bg-gray-200 w-full">
            <tr className=''>
              <th className="border border-gray-300 text-center p-2">#</th>
              <th className="border border-gray-300 text-center p-2">دسته</th>
              <th className="border border-gray-300 text-center p-2">عنوان</th>
              <th className="border border-gray-300 text-center p-2">قیمت</th>
              <th className="border border-gray-300 text-center p-2">موجودی</th>
              <th className="border border-gray-300 text-center p-2">تعداد لایک</th>
              <th className="border border-gray-300 text-center p-2">وضعیت</th>
              <th className="border border-gray-300 text-center p-2">عملیات</th>
            </tr>
          </thead>
          <tbody className='w-full'>
            <tr className="border hover:bg-gray-100 border-gray-300">
              <td className="border border-gray-300 text-center p-2">1</td>
              <td className="border border-gray-300 text-center p-2">دسته شماره فلان</td>
              <td className="border border-gray-300 text-center p-2">محصول شماره 1</td>
              <td className="border border-gray-300 text-center p-2">20.000 تومان</td>
              <td className="border border-gray-300 text-center p-2">10</td>
              <td className="border border-gray-300 text-center p-2">
                <span className='text-green-500'>30</span>
                <span className='text-red-500'>10</span>
              </td>
              <td className="border border-gray-300 text-center p-2">فعال</td>


              <td className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
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
            </tr>
            
          </tbody>
        </table>
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
      {productModal && <ModalProduct setProductModal={setProductModal}/>}
    </div>
    );
}

export default Products;
