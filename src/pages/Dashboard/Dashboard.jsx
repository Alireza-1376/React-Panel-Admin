import Chart from "./Chart";
import ItemsDashboard from "./ItemsDashboard";
import Table from "./Table";
const Dashboard = () => {
    
  return (
    <div className="p-4 space-y-6 mt-[71.5px] overflow-y-auto overflow-x-hidden">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ItemsDashboard
          name="basket"
          number={7}
          title="سبد خرید امروز"
          desc="سبد های خرید مانده امروز"
          week={13}
          month={18}
          bg="bg-gradient-to-r from-orange-400 to-yellow-200"
        />
        <ItemsDashboard
          name="miniShopingCart"
          number={5}
          title="سفارشات مانده امروز"
          desc="سفارشات معلق و فاقد پر..."
          week={9}
          month={16}
          bg="bg-gradient-to-r from-red-400 to-red-200"
        />
        <ItemsDashboard
          name="car"
          number={54}
          title="سفارشات امروز"
          desc="سفارشات کامل و دارای پ..."
          week={263}
          month={1038}
          bg="bg-gradient-to-r from-green-400 to-green-200"
        />
        <ItemsDashboard
          name="dollar"
          number="1,500,000"
          title="درآمد امروز"
          desc="جمع مبالغ پرداختی(تومان)"
          week="6,380,000"
          month="24,380,000"
          bg="bg-gradient-to-r from-blue-400 to-blue-200"
        />
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full">
          <Table />
        </div>
        <div className="w-full flex justify-center mt-4">
          <Chart/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
