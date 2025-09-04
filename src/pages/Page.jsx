import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import Dashboard from "./Dashboard/Dashboard";
import Category from "./Category/Category";
import Products from "./Products/Products";
import {  Route, Routes } from "react-router-dom";
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
import ModalProduct from "./Products/ModalProduct";
import AddAttribute from "./Products/AddAttribute";
import Gallery from "./Products/Gallery";
import { usePermissions } from "../hooks/usePermissions";
import ModalBasket from "./Baskets/ModalBasket";

const Page = () => {
  const { setOpenSidebar } = useContext(SidebarContext);
  const permissionCategory =usePermissions("read_categories")
  const permissionProduct =usePermissions("read_products")
  const permissionColors =usePermissions("read_colors")
  const permissionGuaranties =usePermissions("read_guarantees")
  const permissionBrands =usePermissions("read_brands")
  const permissionDiscount =usePermissions("read_discounts")
  const permissionUsers =usePermissions("read_users")
  const permissionRoles =usePermissions("read_roles")
  const permissionPermissions =usePermissions("read_permissions")
  const permissionDeliveries = usePermissions("read_deliveries")
  const permissionBaskets =usePermissions("read_carts")
  const permissionCreateBaskets =usePermissions("create_cart")
  
  

  return (
    <div id="content" onClick={() => { setOpenSidebar(false) }} className=" h-[100vh] overflow-x-auto bg-cover w-full">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {permissionCategory &&
        <Route path="/categories" element={<Category />}>
          <Route path=":id" element={<CategoriesChildren />} />
        </Route> 
        }

        <Route path="/categories/:id/attributes" element={<AddProperty />} />
        {permissionProduct && <Route path="/products" element={<Products />} />}

        <Route path="/products/add-product" element={<ModalProduct />} />
        <Route path="/products/set-attribute" element={<AddAttribute />} />
        <Route path="/products/gallery" element={<Gallery />} />

        {permissionColors && <Route path="/colors" element={<Colors />} />}
        {permissionGuaranties && <Route path="/gurantys" element={<Guranty />} />}
        {permissionBrands && <Route path="/brands" element={<Brands />} />}
        {permissionDiscount && <Route path="/discounts" element={<Discounts />} />}
        
        {permissionBaskets && <Route path="/baskets" element={<Baskets />} />}
        {permissionCreateBaskets && <Route path="/baskets/add" element={<ModalBasket />}/>}
        <Route path="/orders" element={<Orders />} />
        {permissionDeliveries && <Route path="/sends" element={<Sends />} />}
       
        {permissionUsers &&  <Route path="/users" element={<Users />} />}
        {permissionRoles && <Route path="/roles" element={<Roles />} />}
        {permissionPermissions &&  <Route path="/permissions" element={<Permissions />} />}
       
        <Route path="/questions" element={<Questions />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default Page;
