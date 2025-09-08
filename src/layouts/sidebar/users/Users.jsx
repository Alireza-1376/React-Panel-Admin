import Item from "../Items";
import Title from "../Title";

const Users = () => {
  
  return (
    <div >
      <Title title="کاربران و همکاران" pTitle={["read_users" , "read_roles" , "read_permissions"]}/>
      <Item text="مشاهده کاربران" size={16} name="people" target="/users" pTitle="read_users"/>
      <Item text="نقش ها" size={16} name="person" target="/roles" pTitle="read_roles"/>
      <Item text="مجوزها" size={16} name="shield" target="/permissions" pTitle="read_permissions"/>
    </div>
  );
};

export default Users;
