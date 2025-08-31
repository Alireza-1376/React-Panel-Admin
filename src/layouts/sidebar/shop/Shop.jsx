import Item from "../Items";
import Title from "../Title";
const Shop = () => {  
  return (
    <div className="space-y-0.5">
      <Title title="فروشگاه" pTitle={["read_categories" , "read_products" ,"read_brands" ,"read_guarantees" ,"read_colors" , "read_discounts"]}/>
      <Item text=" مدیریت گروه محصول" size={18} name="bar" target="/categories" pTitle="read_categories"/>
      <Item text=" مدیریت محصول" size={18} name="cube" target="/products" pTitle="read_products"/>
      <Item text=" مدیریت برندها" size={18} name="copy" target="/brands" pTitle="read_brands"/>
      <Item text="مدیریت گارانتی ها" size={18} name="pageLines" target="/gurantys" pTitle="read_guarantees"/>
      <Item text="مدیریت رنگ ها" size={18} name="palet" target="/colors" pTitle="read_colors"/>
      <Item text="مدیریت تخفیف ها" size={18} name="percent" target="/discounts" pTitle="read_discounts"/>
    </div>
  );
};

export default Shop;
