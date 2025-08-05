import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { get } from "../../services/httpRequest";

const LogOut = () => {
    const [isLoading, setIsLoading] = useState(true);
    const token = JSON.parse(localStorage.getItem("token"));
    async function logout(id) {
        try {
            const response =await get("/auth/logout",id, {Authorization: `Bearer ${token}`})
            setIsLoading(false)
            if (response.status == 200) {
                toast.success(response.data.message)
                localStorage.removeItem('token')
            }
        } catch (error) {
            setIsLoading(false)
            toast.error("متاسفانه مشکلی از سمت سرور رخ داده است")
        }
    }
    useEffect(() => {
        logout()
    }, [])

    return (
        <div>
            {isLoading ?
                <div className="flex justify-center items-center h-screen">
                    <p className=" text-lg text-purple-500">لطفا صبر کنید </p>
                    <PulseLoader size={30} color="purple" />
                </div>
                :
                <Navigate to="/auth/login" />}
        </div>
    );
}

export default LogOut;
