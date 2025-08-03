import axios from "axios";
import { useEffect, useState } from "react";

function useLogin(){
    const [isLogin, setIsLogin] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"))
        if (token) {
            axios.get("https://ecomadminapi.azhadev.ir/api/auth/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                if (res.status == 200) {
                    setIsLoading(false)
                    setIsLogin(true)
                } else {
                    setIsLoading(false)
                    setIsLogin(false)
                }
            }).catch((error) => {
                localStorage.removeItem("token")
                setIsLoading(false);
                setIsLogin(false);
            })
        } else {
            setIsLoading(false)
            setIsLogin(false)
        }
    }, [])


    return [isLoading ,isLogin]
}
export default useLogin ;