import Item from "../Items";
import Title from "../Title";

const Communications = () => {
  
  return (
    <div className={`space-y-0.5`}>
      <Title title="ارتباطات"/>
      <Item text="سوال ها" size={18} name="question" target="/questions"/>
      <Item text="نظرات" size={18} name="message" target="/comments"/>
      
    </div>
  );
};

export default Communications;
