import Navbar from "../layouts/navbar/Navbar";
import Sidebar from "../layouts/sidebar/Sidebar";
import Page from "../pages/Page";
import {PuffLoader} from "react-spinners"
import { Navigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useContext, useEffect } from "react";
import { ModalContext } from "../contexts/ModalContext";
import { useDispatch, useSelector } from "react-redux";


const Admin = () => {
    const [isLoading ,isLogin] =useLogin() ;
    const {gripVertical , setGripVertical} = useContext(ModalContext)
    const state =useSelector(state => state.roles)
    console.log(state)
    
    return (
        <div className="overflow-hidden" onClick={()=>{setGripVertical(false)}}>
            {isLoading ? <div className="flex justify-center items-center h-screen"><PuffLoader color="purple" size={100}/></div> : isLogin ?
                <>
                    <Navbar />
                    <div className="flex">
                        <Sidebar />
                        <Page />
                    </div>
                </>
                : <Navigate to="/auth/login"/>}
        </div>
    );
}

export default Admin;
