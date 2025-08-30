import axios from "axios";
import { useEffect, useState } from "react";
import { get } from "../services/httpRequest";
import { useDispatch } from "react-redux";
import { reciveError, reciveReponse, sendRequest } from "../redux/roles.js/actionRoles";
import { data } from "react-router-dom";

function useLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const token = JSON.parse(localStorage.getItem('token'))
    const dispatch =useDispatch();
    
    async function getLoginStatus(id) {
        dispatch(sendRequest())
        if (token) {
            try {
                const getStatus =await get("/auth/user", id, { Authorization: `Bearer ${token}` })
                dispatch(reciveReponse(getStatus.data))
                setIsLoading(false)
                setIsLogin(getStatus.status == 200 ? true : false)
            } catch (error) {
                localStorage.removeItem('token')
                setIsLoading(false)
                setIsLogin(false)
                dispatch(reciveError(error.response.data.message))
            }
        } else {
            setIsLoading(false)
            setIsLogin(false)
            dispatch(reciveError(error.response.data.message))
        }
    }
    useEffect(() => {
        getLoginStatus()
    }, [])

    return [isLoading, isLogin]
}

export default useLogin;