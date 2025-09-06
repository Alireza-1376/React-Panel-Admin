import { useEffect, useState } from "react";
import Chart from "./Chart";
import ItemsDashboard from "./ItemsDashboard";
import Table from "./Table";
import { get } from "../../services/httpRequest";
import { PulseLoader } from "react-spinners";
const Dashboard = () => {
  const [statistics, setStatistics] = useState();
  const [loading, setLoading] = useState(false);
  async function getStatistics() {
    setLoading(true)
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await get("/admin/orders/orders_statistics", "", { Authorization: `Bearer ${token}` })
    if (response.status == 200) {
      setStatistics(response.data.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getStatistics();
  }, [])


  return (

    <div className="p-4 pt-2 space-y-6 mt-[71.5px] overflow-y-auto overflow-x-hidden">
      {loading ? <div className="flex justify-center"><PulseLoader size={20} color="purple" /></div> :
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ItemsDashboard
            name="basket"
            title="سبد خرید امروز"
            desc="سبد های خرید مانده امروز"
            number={statistics?.carts?.today}
            week={statistics?.carts.thisWeek}
            month={statistics?.carts.thisMonth}
            bg="bg-gradient-to-r from-orange-400 to-yellow-200"
          />
          <ItemsDashboard
            name="miniShopingCart"
            title="سفارشات مانده امروز"
            desc="سفارشات معلق و فاقد پر..."
            number={statistics?.pendingOrders?.today}
            week={statistics?.pendingOrders.thisWeek}
            month={statistics?.pendingOrders.thisMonth}
            bg="bg-gradient-to-r from-red-400 to-red-200"
          />
          <ItemsDashboard
            name="car"
            title="سفارشات امروز"
            desc="سفارشات کامل و دارای پ..."
            number={statistics?.successOrders?.today}
            week={statistics?.successOrders.thisWeek}
            month={statistics?.successOrders.thisMonth}
            bg="bg-gradient-to-r from-green-400 to-green-200"
          />
          <ItemsDashboard
            name="dollar"
            title="درآمد امروز"
            desc="جمع مبالغ پرداختی(تومان)"
            number={statistics?.successOrdersAmount?.today}
            week={statistics?.successOrdersAmount.thisWeek}
            month={statistics?.successOrdersAmount.thisMonth}
            bg="bg-gradient-to-r from-blue-400 to-blue-200"
          />
        </div>
      }
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full">
          <Table />
        </div>
        <div className="w-full flex justify-center mt-4 ">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
