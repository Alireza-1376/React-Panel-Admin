import { useLocation, useNavigate } from "react-router-dom";

const PrevPage = () => {
    const navigate =useNavigate();
    const location =useLocation();
    return (
        <>
        {location.state ? <button onClick={()=>{navigate(-1)}} className="text-white bg-gray-600 px-6 rounded-md py-1">بازگشت</button> : null}
        </>
    );
}

export default PrevPage;
