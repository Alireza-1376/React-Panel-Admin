import Item from "../Items";
import Title from "../Title";
const Orders = () => {
  return (
    <div className={`space-y-0.5 `}>
      <Title title="سفارشات و سبد"/>
      <Item text="مدیریت سبد ها" size={18} name="basket" target="/baskets"/>
      <Item text="مدیریت سفارشات" size={18} name="miniShopingCart" target="/orders"/>
      <Item text="مدیریت نحوه ارسال" size={18} name="car" target="/sends"/>
      
    </div>
  );
};

export default Orders;
