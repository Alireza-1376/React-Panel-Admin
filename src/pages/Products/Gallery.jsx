import { useLocation } from "react-router-dom";
import PrevPage from "../../components/PrevPage";
import Tooltip from "@mui/material/Tooltip";
import Icon from "../../layouts/sidebar/Icons";
import { useEffect, useState } from "react";
import { Delete, get, post } from "../../services/httpRequest";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";



const Gallery = () => {
    const [gallery, setGallery] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const token = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        setGallery([...location.state.gallery])
    }, [])



    async function addImage(e) {
        setLoading(true)
        const data = e.target.files[0];
        
        if (data.size > 500 * 1024) {
            setLoading(false)
            return setError("سایز عکس باید کمتر از 500 کیلوبایت باشد")
        }
        if (data.type != "image/png" && data.type != "image/jpg" && data.type != "image/jpeg") {
            setLoading(false)
            return setError("فرمت عکس باید jpg یا jpeg یا png باشد")
        }
        const formData = new FormData()
        formData.append("image", data)
        try {
            const response = await post(`/admin/products/${location.state.id}/add_image`, formData, { Authorization: `Bearer ${token}` })
            if (response.status == 201) {
                toast.success(response.data.message)
                setGallery([...gallery, response.data.data])
                setLoading(false)
                setError("")
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    async function handleDeleteImage(id) {
        Swal.fire({
            title: "حذف کردن",
            text: `آیا از حذف کردن این تصویر مطمئن هستید؟`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "بله",
            cancelButtonText: "خیر"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await Delete(`/admin/products/gallery/${id}`, { Authorization: `Bearer ${token}` })
                    if (response.status == 200) {
                        toast.success(response.data.message)
                    }
                    const filterGallery = gallery.filter((item) => {
                        return item.id != id
                    })
                    setGallery(filterGallery)
                    Swal.fire({
                        text: "با موفقیت حذف شد",
                        icon: "success"
                    });

                } catch (error) {
                    toast.error("خطا در حذف تصویر ")
                }
            }
        });


    }

    async function handleMainImage(id){
        try {
            const response =await get(`/admin/products/gallery/set_main/${id}` , "" ,{ Authorization: `Bearer ${token}` })
            if(response.status==200){
                toast.success(response.data.message)
                let newArray =[...gallery]
                newArray.map((item)=>{
                    return item.is_main=0
                })
                const findItem =newArray.find((item)=>{
                    return item.id ==id
                })
                findItem.is_main=1
                setGallery(newArray)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="text-center space-y-4 mt-4 p-4">
            <h2 className="text-center text-2xl pt-6 mt mb-10 mt-10">مدیریت گالری تصاویر :<span className="text-blue-500 ">{location.state.title}</span></h2>
            <div className="text-end">
                <PrevPage />
            </div>
            {error != "" ? <p className="text-sm text-red-500">{error}</p> : null}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center gap-2">
                {gallery.map((item, index) => {
                    return (
                        <div key={index + 1} className={`${item.is_main ? "border-b-4 border-green-600" : ""} flex-1 relative min-w-56 h-56 rounded-md bg-white overflow-hidden`}>
                            <img className="w-56 mx-auto  h-56 object-cover" src={`https://ecomadminapi.azhadev.ir/${item.image}`} alt="" />
                            <div className="flex hover:bg-white/80 opacity-0 hover:opacity-100 transition-all duration-150 justify-center gap-4 absolute top-0 right-0 bottom-0 cursor-pointer left-0 w-full h-full">

                                {item.is_main == 1 ? null :
                                    <button title="انتخاب به عنوان تصویر اصلی" onClick={()=>{handleMainImage(item.id)}} className="text-green-500">
                                        <Icon name="checkCalender" size={25} />
                                    </button>
                                }

                                <button title="حذف تصویر" onClick={() => { handleDeleteImage(item.id) }} className="text-red-500">
                                    <Icon name="trash" size={25} />
                                </button>

                            </div>
                        </div>
                    )
                })}


                <div className="flex relative justify-center items-center bg-white flex-1 min-w-56 h-56 rounded-md shadow-md hover:ring hover:ring-gray-400  border-gray-600 ">
                    <Tooltip title="افزودن تصویر" arrow>
                        {loading ? <PulseLoader size={20} color="purple" /> : <button className="text-green-600 border-2 p-2 rounded-full">
                            <Icon name="plus" size={50} />
                        </button>}
                    </Tooltip>
                    <input onChange={(e) => { addImage(e) }} title="افزودن تصویر" type="file" className="bg-red-100 cursor-pointer absolute w-full h-full opacity-0" />
                </div>
            </div>

        </div>
    );
}

export default Gallery;
