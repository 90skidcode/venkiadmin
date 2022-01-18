import React from "react";
import {  NavLink } from "react-router-dom";

function NavSideBar() {
  const menu = [
    {
      text: "Dashboard",
      path: "/",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      text: "Customers",
      path: "/customer",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      text: "Orders",
      path: "/customer/1",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    },
    {
      text: "Payment",
      path: "/",
      icon: "M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      text: "Product",
      path: "/product",
      icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      text: "Setting",
      path: "/",
      icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
    },
    {
      text: "LogOut",
      path: "/",
      icon: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
    },
    {
      text: "Account",
      path: "/",
      icon: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];
  return (
    <div className="items-center col-span-2 h-screen overflow-hidden text-white bg-primary-900 shadow-2xl shadow-slate-500">
      <div className="flex items-center w-full p-3  justify-center bg-white">
        <span className="ml-2 text-lg font-bold text-center text-primary-900">
          Venkateshwara
        </span>
      </div>
      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full">
		
            {menu.map((m) => (
              <NavLink key={Math.random()}
                to={m.path} 
                className="flex items-center w-full h-12 px-3 mt-2 cursor-pointer rounded hover:bg-secondary-900 hover:text-white"         >
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    className="text-[#94a3b8]"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={m.icon}
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">{m.text}</span>
              </NavLink>
            ))}
           
         
        </div>
      </div>
    </div>
  );
}

export default NavSideBar;
