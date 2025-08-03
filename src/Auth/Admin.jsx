import Navbar from "../layouts/navbar/Navbar"
import Sidebar from "../layouts/sidebar/Sidebar"
import Page from "../pages/Page"
import { Navigate } from "react-router-dom"
import useLogin from "../hooks/useLogin"
const Admin = () => {
    const [isLoading , isLogin]= useLogin();
    return (
        <div className="overflow-hidden">
            {isLoading ? <h1>Loading</h1> : isLogin ?
                <>
                    <Navbar />
                    <div className="flex">
                        <Sidebar />
                        <Page />
                    </div>
                </> : <Navigate to="/auth/login"/>}
        </div>
    );
}

export default Admin;
