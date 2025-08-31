import Item from "../Items";
import Title from "../Title";
const Orders = () => {
  return (
    <div className={`space-y-0.5 `}>
      <Title title="سفارشات و سبد" pTitle={["read_carts" , "read_orders" , "read_deliveries"]} />
      <Item text="مدیریت سبد ها" size={18} name="basket" target="/baskets" pTitle="read_carts"/>
      <Item text="مدیریت سفارشات" size={18} name="miniShopingCart" target="/orders" pTitle="read_orders"/>
      <Item text="مدیریت نحوه ارسال" size={18} name="car" target="/sends" pTitle="read_deliveries"/>
      
    </div>
  );
};

export default Orders;
