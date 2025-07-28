import Item from "../Items";
import Title from "../Title";

const Users = () => {
  
  return (
    <div className={`space-y-1.5 px-4`}>
      <Title title="کاربران و همکاران"/>
      <Item text="مشاهده کاربران" size={18} name="people" />
      <Item text="نقش ها" size={18} name="person" />
      <Item text="مجوزها" size={18} name="shield" />
    </div>
  );
};

export default Users;
