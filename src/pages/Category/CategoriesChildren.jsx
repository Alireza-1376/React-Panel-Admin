import { useLocation } from "react-router-dom";

const CategoriesChildren = () => {
    const location =useLocation();
    return (
        <div>
            {location.state ? <h2 className="text-xl">زیر گروه: {location.state}</h2> : null}
        </div>
    );
}

export default CategoriesChildren;
