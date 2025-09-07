import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { get } from "../../services/httpRequest";
import moment from "moment-jalaali";
import { PulseLoader } from "react-spinners";
let month = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
]
const Chart = () => {
  const [chartMonth, setChartMonth] = useState([]);
  const [amountMonth, setAmountMonth] = useState([]);
  const [loading , setLoading] = useState(false)

  const options = {
    chart: {
      height: 300,
      type: "line",
      fontFamily: "BYekan",
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "straight" },
    title: { text: "نمودار فروش سالیانه", align: "center" },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: chartMonth,
      tickAmount: 12,
    },
  };
   const series = [
    {
      name: "میلیون تومان",
      data: amountMonth,
    }
  ];

  async function getThisYearOrders() {
    setLoading(true)
    const token = JSON.parse(localStorage.getItem("token"))
    const response = await get("/admin/orders/this_year_orders", "", { Authorization: `Bearer ${token}` })
    if (response.status == 200) {
      setLoading(false)
      let monthArr = [];
      let thisMonth = moment().jMonth()
      for (let i = 0; i < 12; i++) {
        if (thisMonth == -1) thisMonth = 11
        monthArr.push({ month: thisMonth, amount: 0 })
        thisMonth--;
      }

      const orders = response.data.data;
      for (let order of orders) {
        const monthIndex = moment(order.pay_at).jMonth()
        const monthArrIndex = monthArr.findIndex((item) => {
          return item.month == monthIndex;
        })
        monthArr[monthArrIndex].amount = monthArr[monthArrIndex].amount + parseInt((order.pay_amount/1000000).toFixed(0))
      }

      const chartArray = monthArr.map((item) => {
        return month[item.month]
      }).reverse()

      const amountArry = monthArr.map((item) => {
        return item.amount
      }).reverse()

      setAmountMonth(amountArry)

      setChartMonth(chartArray)

    }
    setLoading(false)
  }

  useEffect(() => {
    getThisYearOrders()
  }, [])




  return (
    <>
    {loading ?<div><PulseLoader size={20} color="purple"/></div> : <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={300}
      className="w-full"
    />}
    </>
  );
};

export default Chart;
