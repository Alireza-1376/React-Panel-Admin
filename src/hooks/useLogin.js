import axios from "axios";
import { useEffect, useState } from "react";
import { get } from "../services/httpRequest";

function useLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const token = JSON.parse(localStorage.getItem('token'))
    async function getLoginStatus() {
        if (token) {
            try {
                const getStatus =await get("/auth/user", { headers: { Authorization: `Bearer ${token}` } })
                setIsLoading(false)
                setIsLogin(getStatus.status == 200 ? true : false)
            } catch (error) {
                localStorage.removeItem('token')
                setIsLoading(false)
                setIsLogin(false)
            }
        } else {
            setIsLoading(false)
            setIsLogin(false)
        }
    }
    useEffect(() => {
        getLoginStatus()
    }, [])

    return [isLoading, isLogin]
}

export default useLogin;