import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Bar, Doughnut} from "react-chartjs-2";
import { FastForwardIcon } from "@heroicons/react/outline";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  
);

export const options = {
  responsive: true,
  plugins: {
    legend: false,
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
    options: {
      maintainAspectRatio: false,
  }
  },
};

const labels = ["January", "February", "March"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [300, 50, 100],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [30, 80, 120],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const dataD = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    plugins: {
    
      options: {
        maintainAspectRatio: false,
    },
  },
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

function Dashboard() {
  return (
    <div className=" grid grid-cols-12 col-span-10 justify-evenly">
      <div className="bg-white shadow-lg rounded-sm border border-gray-200 mt-5  col-span-4 ">
        <div className="py-3 px-5 text-slate-600">Bar chart</div>
        <Bar height={248} options={options} data={data} />
      </div>
      <div className="bg-white shadow-lg rounded-sm border border-gray-200 mt-5  col-span-4 ">
        <div className="py-3 px-5 text-slate-600">Bar chart</div>
        <Bar height={248} options={options} data={data} />
      </div>
      <div className="bg-white shadow-lg rounded-sm border border-gray-200 mt-5 h-fit">
        <div className="py-3 px-5 text-slate-600">Bar chart</div>
        <Doughnut height={248} data={dataD} />
      </div>
    </div>
  );
}

export default Dashboard;
