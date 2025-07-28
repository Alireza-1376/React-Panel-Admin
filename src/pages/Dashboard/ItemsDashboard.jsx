import Icon from "../../layouts/sidebar/Icons";

const ItemsDashboard = ({name , number ,title , desc ,week , month ,bg}) => {
    return (
        <div className="space-y-2"> 
            <div className={`shadow-md p-4 rounded-sm ${bg}`}>
                <h2 className="text-3xl">{number}</h2>
                <div className="flex items-center justify-between mb-1">
                    <p className="text-xl">{title}</p>
                    <div className="bg-amber-100 p-2 rounded-full shadow-sm">
                        <Icon name={name} size={24}/>
                    </div>
                </div>
                <p>{desc}</p>
            </div>
            <div className={`shadow-md py-2 px-4 rounded-sm ${bg}`}>
                <p>{week} در هفته گذشته</p>
                <p>{month} در ماه گذشته</p>
            </div>
        </div>
    );
}

export default ItemsDashboard;
