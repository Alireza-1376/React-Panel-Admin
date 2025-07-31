import Item from "../Items";
import Title from "../Title";

const Users = () => {
  
  return (
    <div className={`space-y-1.5`}>
      <Title title="کاربران و همکاران"/>
      <Item text="مشاهده کاربران" size={18} name="people" target="/test"/>
      <Item text="نقش ها" size={18} name="person" target="/test"/>
      <Item text="مجوزها" size={18} name="shield" target="/test"/>
    </div>
  );
};

export default Users;
