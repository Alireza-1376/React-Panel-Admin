import Item from "../Items";
import Title from "../Title";
const Orders = () => {
  return (
    <di6>
      <Title title="سفارشات و سبد" pTitle={["read_carts" , "read_orders" , "read_deliveries"]} />
      <Item text="مدیریت سبد ها" size={16} name="basket" target="/baskets" pTitle="read_carts"/>
      <Item text="مدیریت سفارشات" size={16} name="miniShopingCart" target="/orders" pTitle="read_orders"/>
      <Item text="مدیریت نحوه ارسال" size={16} name="car" target="/sends" pTitle="read_deliveries"/>
      
    </di6>
  );
};

export default Orders;
