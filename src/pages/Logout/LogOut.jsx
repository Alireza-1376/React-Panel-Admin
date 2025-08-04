import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const LogOut = () => {
    const [isLoading , setIsLoading] =useState(true);
    useEffect(()=>{
        const token=JSON.parse(localStorage.getItem("token"))
        axios.get("https://ecomadminapi.azhadev.ir/api/auth/logout",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            setIsLoading(false)
            if(res.status==200){
                toast.success(res.data.message)
                localStorage.removeItem('token')
            }
            
        }).catch((err)=>{
            setIsLoading(false)
            toast.error("متاسفانه مشکلی از سمت سرور رخ داده است")
        })
    },[])
    return (
        <div>
            {isLoading ?
            <div className="flex justify-center items-center h-screen">
                <p className=" text-lg text-purple-500">لطفا صبر کنید </p>
                <PulseLoader size={30} color="purple"/>
            </div> 
            : 
            <Navigate to="/auth/login"/>}
        </div>
    );
}

export default LogOut;
