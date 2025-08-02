import Item from "../Items";
import Title from "../Title";

const Users = () => {
  
  return (
    <div className={`space-y-0.5`}>
      <Title title="کاربران و همکاران"/>
      <Item text="مشاهده کاربران" size={18} name="people" target="/users"/>
      <Item text="نقش ها" size={18} name="person" target="/roles"/>
      <Item text="مجوزها" size={18} name="shield" target="/permissions"/>
    </div>
  );
};

export default Users;
