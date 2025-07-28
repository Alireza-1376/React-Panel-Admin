import Item from "../Items";
import Title from "../Title";
const Shop = () => {  
  return (
    <div className="space-y-1.5 px-4">
      <Title title="فروشگاه"/>
      <Item text=" مدیریت گروه محصول" size={18} name="bar"/>
      <Item text=" مدیریت محصول" size={18} name="cube"/>
      <Item text=" مدیریت برندها" size={18} name="copy"/>
      <Item text="مدیریت گارانتی ها" size={18} name="pageLines"/>
      <Item text="مدیریت رنگ ها" size={18} name="palet"/>
      <Item text="مدیریت تخفیف ها" size={18} name="percent"/>
    </div>
  );
};

export default Shop;
