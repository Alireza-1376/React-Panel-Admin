import Item from "../Items";
import Title from "../Title";
const Orders = () => {
  return (
    <div className={`space-y-1.5 `}>
      <Title title="سفارشات و سبد"/>
      <Item text="مدیریت سبد ها" size={18} name="basket" target="/test"/>
      <Item text="مدیریت سفارشات" size={18} name="miniShopingCart" target="/test"/>
      <Item text="مدیریت نحوه ارسال" size={18} name="car" target="/test"/>
      
    </div>
  );
};

export default Orders;
