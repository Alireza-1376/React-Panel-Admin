import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import Dashboard from "./Dashboard/Dashboard";
import Category from "./Category/Category";
import Products from "./Products/Products";
import { Route, Routes } from "react-router-dom";
import Colors from "./Colors/Colors";
import Guranty from "./Gurantys/Gurantys";
import Brands from "./Brands/Brands";
import Discounts from "./Discounts/Discounts";
import Baskets from "./Baskets/Baskets";
import Orders from "./Orders/Orders";
import Sends from "./Sends/Sends";
import Users from "./Users/Users";
import Roles from "./Roles/Roles";
import Permissions from "./Permissions/Permissions";
import Questions from "./Question/Question";
import Comments from "./Comments/Comments";
import LogOut from "./Logout/LogOut";
import CategoriesChildren from "./Category/CategoriesChildren";
import AddProperty from "./Category/AddProperty"
const Page = () => {
  const { setOpenSidebar } = useContext(SidebarContext);
  return (
    <div id="content" onClick={() => { setOpenSidebar(false) }} className=" h-[100vh] overflow-x-auto bg-cover w-full">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Category />}>
          <Route path=":id" element={<CategoriesChildren />}/>
        </Route>
        <Route path="/categories/:id/attributes" element={<AddProperty />}/>
        <Route path="/products" element={<Products />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/gurantys" element={<Guranty />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/discounts" element={<Discounts />} />
        <Route path="/baskets" element={<Baskets />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/sends" element={<Sends />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default Page;
