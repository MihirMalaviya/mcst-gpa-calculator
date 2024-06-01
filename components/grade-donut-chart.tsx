import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const DonutChart = ({ percentColored }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "pie",
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
    },
    title: {
      text: "",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: false,
        innerSize: "80%",
        colors: ["rgba(90, 250, 130, .5)", "rgba(5, 100, 100, .1)"],
      },
    },
    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "GPA",
        data: [
          { name: "percent", y: percentColored },
          { name: "", y: 100 - percentColored },
        ],
      },
    ],
  });

  useEffect(() => {
    setChartOptions((prevOptions) => ({
      ...prevOptions,
      series: [
        {
          ...prevOptions.series[0],
          data: [
            { ...prevOptions.series[0].data[0], y: percentColored },
            { ...prevOptions.series[0].data[1], y: 100 - percentColored },
          ],
        },
      ],
    }));
  }, [percentColored]);

  return (
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
  );
};

export default DonutChart;
