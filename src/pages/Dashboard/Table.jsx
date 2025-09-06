import Tooltip from "@mui/material/Tooltip";
import Icon from "../../layouts/sidebar/Icons";
import { use, useEffect, useState } from "react";
import { get } from "../../services/httpRequest";
import { space } from "postcss/lib/list";
import { PulseLoader } from "react-spinners";
const Table = () => {
  const [completeProduct, setCompleteProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCompleteProduct() {
    setLoading(true)
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await get(`/admin/products/fewer_products`, "", { Authorization: `Bearer ${token}` })
    if (response.data.data.length > 0) {
      setCompleteProduct(response.data.data)
      setLoading(false)
    } else {
      setCompleteProduct([])
      setLoading(false)
    }
  }

  async function handleHide(id){
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await get(`/admin/products/toggle_notification/${id}`,"",{ Authorization: `Bearer ${token}` })
    if(response.status==200){
      setCompleteProduct((prev)=>{
        return prev.filter((p)=>{return p.id!=id})
      })
    }
  }

  useEffect(() => {
    getCompleteProduct();
  }, [])

  return (
    <>
      {loading ? <div className="flex justify-center items-center"><PulseLoader size={20} color="purple" /></div> : completeProduct.length == 0 ? <div className="bg-inherit flex justify-center">محصول رو به اتمامی وجود ندارد</div> :
        <table className="w-full bg-white shadow-md border border-gray-300">
          <caption className="my-4">محصولات رو به اتمام</caption>

          <thead className="border border-gray-300 bg-gray-200">
            <tr>
              <th className="border border-gray-300 text-center p-2">#</th>
              <th className="border border-gray-300 text-center p-2">دسته</th>
              <th className="border border-gray-300 text-center p-2">
                عنوان
              </th>
              <th className="border border-gray-300 text-center p-2">
                وضعیت
              </th>
              <th className="border border-gray-300 text-center p-2">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {completeProduct.map((item) => {
              return (
                <tr className="border border-gray-300">
                  <td className="border border-gray-300 text-center p-2">{item.id}</td>
                  <td className="border border-gray-300 text-center p-2">
                    {item.categories[0].title}
                  </td>
                  <td className="border border-gray-300 text-center p-2">
                    {item.title}
                  </td>
                  <td className="border border-gray-300 text-center p-2">
                    {item.stock == 0 ? <span className="text-red-500">به اتمام رسیده</span> : `رو به اتمام : ${item.stock}`}
                  </td>
                  <td className="text-blue-500 flex justify-center p-3 items-center cursor-pointer">
                    <Tooltip arrow title="نادیده گرفتن">
                      <button onClick={()=>{handleHide(item.id)}} className="hover:text-blue-800 font-bold text-lg rounded-full">
                        <Icon name="eye" />
                      </button>
                    </Tooltip>
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table>
      }
    </>
  );
}

export default Table;
