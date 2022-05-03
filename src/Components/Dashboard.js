import React from "react";
import { useState, useEffect } from "react";
import PageContainer from "./PageContainer";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import GetApi from "../Services/GetApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Orders",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      tension: 0.4,
    },
    {
      label: "Customer",
      data: [39, 36, 55, 41, 54, 75],
      fill: true,
      backgroundColor: "rgba(37, 99, 235,0.2)",
      borderColor: "rgba(37, 99, 235,1)",
      tension: 0.4,
    },
  ],
};

function Dashboard() {
  const [dashboardCard, setDashboardCard] = useState({
    CustomerCard: 0,
    OrderCard: 0,
    CategoryCard: 0,
    ProductCard: 0,
    BranchCard: 0,
    FranchiseCard: 0,
  });

  useEffect(() => {
    GetApi("dashboardCard").then((e) => {
      setDashboardCard(e.responceData.data);
    });
  }, []);

  return (
    <div className="h-screen overflow-auto bg-gold-100 grid grid-cols-12 bg-slate-200  outline-none">
      <PageContainer></PageContainer>
      <div className="col-span-10">
        <div className="mt-5">
          <div>
            <div className="flex justify-evenly">
              <div className="p-5 bg-white rounded shadow-sm w-1/4 m-3">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fuchsia-50 text-fuchsia-400">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 25 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Total Orders</div>
                    <div className="text-2xl font-bold text-gray-900">{dashboardCard.OrderCard}</div>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-white rounded shadow-sm w-1/4 m-3">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-50 text-cyan-400">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.52325 6.61231C10.2911 5.20443 12.4206 4.32434 14.6667 4.07333V17.3333H27.9267C27.6757 19.5794 26.7956 21.7089 25.3877 23.4767C23.9798 25.2446 22.1013 26.5791 19.9685 27.3265C17.8357 28.0739 15.5351 28.2039 13.3317 27.7015C11.1282 27.1991 9.11142 26.0847 7.51336 24.4866C5.91529 22.8886 4.80094 20.8718 4.29854 18.6683C3.79614 16.4649 3.92612 14.1643 4.67352 12.0315C5.42092 9.89866 6.75535 8.0202 8.52325 6.61231Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M20 12H27.3173C26.7188 10.3128 25.7513 8.78047 24.4854 7.5146C23.2195 6.24873 21.6872 5.28125 20 4.68268V12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Net Revenue</div>
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{dashboardCard.OrderCard}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-white rounded shadow-sm w-1/4 m-3">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 text-amber-400">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.7712 13.1046C20.7714 12.1044 21.3333 10.7478 21.3333 9.33333C21.3333 7.91885 20.7714 6.56229 19.7712 5.5621C18.771 4.5619 17.4145 4 16 4C14.5855 4 13.2289 4.5619 12.2288 5.5621C11.2286 6.56229 10.6667 7.91885 10.6667 9.33333C10.6667 10.7478 11.2286 12.1044 12.2288 13.1046C13.2289 14.1048 14.5855 14.6667 16 14.6667C17.4145 14.6667 18.771 14.1048 19.7712 13.1046Z"
                          stroke="#FBBF24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M9.40033 21.4003C11.1507 19.65 13.5246 18.6667 16 18.6667C18.4753 18.6667 20.8493 19.65 22.5997 21.4003C24.35 23.1507 25.3333 25.5246 25.3333 28H6.66666C6.66666 25.5246 7.64999 23.1507 9.40033 21.4003Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Customers</div>
                    <div className="text-2xl font-bold text-gray-900">{dashboardCard.CustomerCard}</div>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-white rounded shadow-sm w-1/4 m-3">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-400">
                      <svg
                        width="32"
                        height="32"
                        viewBox="-2 -2 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                          stroke="currentColor "
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Branch</div>
                    <div className="text-2xl font-bold text-gray-900">{dashboardCard.BranchCard}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 bg-white rounded shadow-sm w-4/4 m-3">
            <Line data={data} height={100} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
