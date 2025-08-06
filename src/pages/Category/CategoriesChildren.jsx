import { useLocation } from "react-router-dom";

const CategoriesChildren = () => {
    const location =useLocation();
    return (
        <div>
            <h2 className="text-xl">زیر گروه: {location.state}</h2>
        </div>
    );
}

export default CategoriesChildren;
