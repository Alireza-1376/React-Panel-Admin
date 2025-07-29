import { useState } from "react";
import Icon from "../../layouts/sidebar/Icons";
import ModalCategory from "./ModalCategory";

const Category = () => {
    const [categoryModal ,setCategoryModal] =useState(false)
  return (
    <div className="mt-[72.5px] overflow-hidden">
      <h2 className="text-center text-2xl py-6">مدیریت دسته بندی محصولات</h2>
      <div className="flex justify-between p-4">
        <div className="w-1/2 flex items-center">
          <button className="bg-blue-300/50 border border-gray-400 py-2 px-4">جستجو</button>
          <input placeholder="قسمتی از عنوان را وارد کنید" type="text" className="focus:outline-none p-2 w-4/5 md:w-1/2 border border-gray-400"/>
        </div>
        <div onClick={()=>{setCategoryModal(true)}} className="bg-green-700 text-white p-3 rounded-md cursor-pointer">
          <Icon name="plus" size={18} />
        </div>
      </div>
      <div className="p-4">
        <table className="w-full bg-white shadow-md border border-gray-300">
          <thead className="border border-gray-300 bg-gray-200">
            <tr>
              <th className="border border-gray-300 text-center p-2">#</th>
              <th className="border border-gray-300 text-center p-2">عنوان</th>
              <th className="border border-gray-300 text-center p-2">وضعیت</th>
              <th className="border border-gray-300 text-center p-2">عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-gray-300">
              <td className="border border-gray-300 text-center p-2">1</td>
              <td className="border border-gray-300 text-center p-2">دسته شماره فلان</td>
              <td className="border border-gray-300 text-center p-2">فعال</td>
              <td className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
                <button className="text-blue-500">
                    <Icon name="share" size={16}/>
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
            </tr>
            <tr className="border border-gray-300">
              <td className="border border-gray-300 text-center p-2">1</td>
              <td className="border border-gray-300 text-center p-2">دسته شماره فلان</td>
              <td className="border border-gray-300 text-center p-2">فعال</td>
              <td className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
                <button className="text-blue-500">
                    <Icon name="share" size={16}/>
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
            </tr>
             <tr className="border border-gray-300">
              <td className="border border-gray-300 text-center p-2">1</td>
              <td className="border border-gray-300 text-center p-2">دسته شماره فلان</td>
              <td className="border border-gray-300 text-center p-2">فعال</td>
              <td className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
                <button className="text-blue-500">
                    <Icon name="share" size={16}/>
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
            </tr>
             <tr className="border border-gray-300">
              <td className="border border-gray-300 text-center p-2">1</td>
              <td className="border border-gray-300 text-center p-2">دسته شماره فلان</td>
              <td className="border border-gray-300 text-center p-2">فعال</td>
              <td className=" border-gray-300 text-center py-3 flex justify-center gap-2 items-center">
                <button className="text-blue-500">
                    <Icon name="share" size={16}/>
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
      {categoryModal && <ModalCategory setCategoryModal={setCategoryModal}/>}
    </div>
  );
};

export default Category;
