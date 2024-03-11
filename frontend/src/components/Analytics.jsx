import React from "react";
import Layout from "./layout/Layout";

import LineChart from "./chart/LineChart.jsx";
import {
  lineChartDataOverallRevenue,
  lineChartOptionsOverallRevenue,
} from "./chart/chartData";

const Analytics = () => {
  const data = [
    { name: "Senin", totalPenjualan: 400, pv: 2400, amt: 2400 },
    { name: "Page B", totalPenjualan: 300, pv: 2400, amt: 2400 },
    { name: "Page C", totalPenjualan: 300, pv: 2400, amt: 2400 },
    { name: "Page D", totalPenjualan: 500, pv: 2400, amt: 2400 },
  ];
  return (
    <Layout>
      <section className="flex flex-col bg-gray-300 p-2 w-full m-2 ">
        <section className="flex w-auto h-[160px] m-1 gap-3">
          <article className="bg-white w-4/12 rounded-lg"> </article>
          <article className="bg-white w-4/12 rounded-lg"> </article>
          <article className="bg-white w-4/12 rounded-lg"> </article>
        </section>
        <section className="flex w-auto h-[330px] m-1 gap-3">
          <article className="bg-white w-8/12 rounded-lg">
            <LineChart
              chartData={lineChartDataOverallRevenue}
              chartOptions={lineChartOptionsOverallRevenue}
            />
          </article>
          <article className="bg-white w-4/12 rounded-lg"> </article>
        </section>
        {/* <section className="flex w-auto h-[200px] m-1 gap-3">
          <article className="bg-white w-full rounded-lg">{" "}</article>
        </section> */}
      </section>
    </Layout>
  );
};

export default Analytics;
