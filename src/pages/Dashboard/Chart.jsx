import { useState } from "react";
import ReactApexChart from "react-apexcharts";
const Chart = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "میلیون تومان",
        data: [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170],
      },
    ],
    options: {
      chart: {
        height: 300,
        type: "line",
        fontFamily: "BYekan",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "نمودار فروش سالیانه ",
        align: "center",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
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
        ],
        tickAmount: 12,
      },
    },
  });
  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="line"
      height={300}
      className="w-full"
    />
  );
};

export default Chart;
