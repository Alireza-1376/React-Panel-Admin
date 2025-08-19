import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { get } from "../../services/httpRequest";
import { PulseLoader } from "react-spinners";

const AddAttribute = () => {
    const [attrs, setAttrs] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"))
    const [loading ,setLoading]=useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const categories = location.state.categories;
    function getAtrributes() {
        setLoading(true)
        Promise.all(
            categories.map(async (item) => {
                const response = await get(`/admin/categories/${item.id}/attributes`, "", { Authorization: `Bearer ${token}` })
                if (response.data.data.length > 0) {
                    setAttrs((prev) => {
                        return [...prev, { title: item.title, data: response.data.data }]
                    })
                    setLoading(false)
                } else {
                    setAttrs([])
                    setLoading(false)
                }
            })
        )
    }
    useEffect(() => {
        getAtrributes();
    }, [])

    return (
        <div className="text-center space-y-4 mt-4 p-4">
            <h2 className="text-center text-2xl pt-6 mt mb-4 mt-10">افزودن ویژگی محصول : <span className="text-blue-500 ">{location.state.title}</span></h2>
            {attrs.length > 0 ?
                <form>
                    <div>{attrs.map((item) => {
                        return (
                            <div className="">
                                <h2 className="text-blue-500 mb-1 mt-6">گروه : {item.title}</h2>
                                {item.data.map((attr) => {
                                    return (
                                        <div className="flex justify-center mb-2">
                                            <span className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-[18%] py-2 px-4">
                                                {attr.title}
                                            </span>
                                            <div className=" w-3/4 flex md:w-1/2 border border-gray-400">
                                                <input type="text" className="focus:outline-none appearance-none flex-1 px-2" />
                                                <span className="bg-blue-300/50 border w-28 p-2 px-4">{attr.unit}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}</div>
                </form>

                :loading ?<PulseLoader size={20} color="purple" /> :  <span>هیچ ویژگی برای گروه های این محصول انتخاب نشده است</span>}
            <div className="flex justify-center gap-4 items-center mt-10">
                <button type="submit" className="bg-blue-600 text-white px-10 py-2 rounded-md">
                    ذخیره
                </button>
                <button type="button" onClick={() => { navigate(-1) }} className="text-white bg-gray-600 px-8 rounded-md py-2">بازگشت</button>
            </div>
        </div>
    );
}

export default AddAttribute;
