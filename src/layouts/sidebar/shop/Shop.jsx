import Item from "../Items";
import Title from "../Title";
const Shop = () => {  
  return (
    <div className="space-y-1.5">
      <Title title="فروشگاه"/>
      <Item text=" مدیریت گروه محصول" size={18} name="bar" target="/categories"/>
      <Item text=" مدیریت محصول" size={18} name="cube" target="/products"/>
      <Item text=" مدیریت برندها" size={18} name="copy" target="/test"/>
      <Item text="مدیریت گارانتی ها" size={18} name="pageLines" target="/test"/>
      <Item text="مدیریت رنگ ها" size={18} name="palet" target="/test"/>
      <Item text="مدیریت تخفیف ها" size={18} name="percent" target="/test"/>
    </div>
  );
};

export default Shop;
