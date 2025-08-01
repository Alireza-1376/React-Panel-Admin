import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import Dashboard from "./Dashboard/Dashboard";
import Category from "./Category/Category";
import Products from "./Products/Products";
import { Route, Routes } from "react-router-dom";
import Colors from "./Colors/Colors";
import Guranty from "./Gurantys/Gurantys";
import Brands from "./Brands/Brands";

const Page = () => {
  const { setOpenSidebar } = useContext(SidebarContext);
  return (
    <div id="content" onClick={() => { setOpenSidebar(false) }} className="bg-[url('./public/images/background.jpg')] h-[100vh] overflow-x-auto bg-cover bg-yellow-100 w-full">
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/categories" element={<Category />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/colors" element={<Colors />}/>
        <Route path="/gurantys" element={<Guranty />}/>
        <Route path="/brands" element={<Brands />}/>
        <Route path="*" element={<Dashboard />}/>
      </Routes>
    </div>
  );
};

export default Page;
