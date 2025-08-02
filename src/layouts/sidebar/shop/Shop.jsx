import Item from "../Items";
import Title from "../Title";
const Shop = () => {  
  return (
    <div className="space-y-0.5">
      <Title title="فروشگاه"/>
      <Item text=" مدیریت گروه محصول" size={18} name="bar" target="/categories"/>
      <Item text=" مدیریت محصول" size={18} name="cube" target="/products"/>
      <Item text=" مدیریت برندها" size={18} name="copy" target="/brands"/>
      <Item text="مدیریت گارانتی ها" size={18} name="pageLines" target="/gurantys"/>
      <Item text="مدیریت رنگ ها" size={18} name="palet" target="/colors"/>
      <Item text="مدیریت تخفیف ها" size={18} name="percent" target="/discounts"/>
    </div>
  );
};

export default Shop;
