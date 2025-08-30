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
import ModalProduct from "./Products/ModalProduct";
import AddAttribute from "./Products/AddAttribute";
import Gallery from "./Products/Gallery";
import { useSelector } from "react-redux";
const Page = () => {
  const { setOpenSidebar } = useContext(SidebarContext);
  const state = useSelector(state => state.user.user.roles)
  let permissions = [];
  for (let role of state) {
    // console.log(role)
    permissions = [...permissions, ...role.permissions]
  }
  function findPermission(permission) {
    const findIndex = permissions.findIndex((item) => {
      return item.title.includes(permission);
    })
    return findIndex;
  }




  return (
    <div id="content" onClick={() => { setOpenSidebar(false) }} className=" h-[100vh] overflow-x-auto bg-cover w-full">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {findPermission("read_categories") > -1 ?
          <Route path="/categories" element={<Category />}>
            <Route path=":id" element={<CategoriesChildren />} />
          </Route>
          :
          null}

        <Route path="/categories/:id/attributes" element={<AddProperty />} />

        {findPermission("read_products") > -1 ?
          <Route path="/products" element={<Products />} />
          : null}

        {/* {findPermission("") > -1 ? : null} */}
        <Route path="/products/add-product" element={<ModalProduct />} />
        {/* {findPermission("") > -1 ? : null} */}
        <Route path="/products/set-attribute" element={<AddAttribute />} />
        {/* {findPermission("") > -1 ? : null} */}
        <Route path="/products/gallery" element={<Gallery />} />
        
        {findPermission("read_colors") > -1 ?
          <Route path="/colors" element={<Colors />} />
          : null}

        {findPermission("read_guarantees") > -1 ?
          <Route path="/gurantys" element={<Guranty />} />
          : null}

        {findPermission("read_brands") > -1 ?
          <Route path="/brands" element={<Brands />} />
          : null}

        {/* {findPermission("") > -1 ? : null} */}
        <Route path="/discounts" element={<Discounts />} />
        {/* {findPermission("") > -1 ? : null} */}
        <Route path="/baskets" element={<Baskets />} />
        {/* {findPermission("") > -1 ? : null} */}
        <Route path="/orders" element={<Orders />} />
        {/* {findPermission("") > -1 ? : null} */}
        <Route path="/sends" element={<Sends />} />
        {/* {findPermission("") > -1 ? : null} */}
        <Route path="/users" element={<Users />} />
        {/* {findPermission("") > -1 ? : null} */}
        <Route path="/roles" element={<Roles />} />
        {/* {findPermission("") > -1 ? : null} */}
        <Route path="/permissions" element={<Permissions />} />
        {/* {findPermission("") > -1 ? : null} */}
        <Route path="/questions" element={<Questions />} />
        {/* {findPermission("") > -1 ? : null} */}
        <Route path="/comments" element={<Comments />} />
        {/* {findPermission("") > -1 ? : null} */}
        <Route path="/logout" element={<LogOut />} />
        {/* {findPermission("") > -1 ? : null} */}
        <Route path="*" element={<Dashboard />} />
        {/* {findPermission("") > -1 ? : null} */}
      </Routes>
    </div>
  );
};

export default Page;
