import axios from "axios";
import { useEffect, useState } from "react";

function useLogin(){
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.get("https://ecomadminapi.azhadev.ir/api/auth/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setIsLoading(false)
                setIsLogin(res.status == 200 ? true : false)
            }).catch((err) => {
                localStorage.removeItem('token')
                setIsLoading(false)
                setIsLogin(false)
            })
        } else {
            setIsLoading(false)
            setIsLogin(false)
        }
    })

    return [isLoading ,isLogin]
}

export default useLogin ;