import Item from "../Items";
import Title from "../Title";

const Communications = () => {
  
  return (
    <div className={`space-y-0.5`}>
      <Title title="ارتباطات" pTitle={["read_questions" , "read_comments"]}/>
      <Item text="سوال ها" size={18} name="question" target="/questions" pTitle="read_questions"/>
      <Item text="نظرات" size={18} name="message" target="/comments" pTitle="read_comments"/>
    </div>
  );
};

export default Communications;
