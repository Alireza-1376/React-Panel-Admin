import Navbar from "../layouts/navbar/Navbar";
import Sidebar from "../layouts/sidebar/Sidebar";
import Page from "../pages/Page";
import {PuffLoader} from "react-spinners"
import { Navigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

const Admin = () => {
    const [isLoading ,isLogin] =useLogin() ;
    const {gripVertical , setGripVertical} = useContext(ModalContext)
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
