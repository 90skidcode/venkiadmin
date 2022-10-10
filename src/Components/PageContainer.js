import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UtilsJson } from "./../utils/UtilsJson";
function PageContainer() {
  const navigate = useNavigate();
  let UserDetails = localStorage.getItem("details");

  if (!UserDetails) {
    navigate("/");
    return "";
  } else UserDetails = JSON.parse(UserDetails).Message[0];

  const menu = [
    {
      text: "Dashboard",
      path: "/dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      text: "Users",
      path: "/list/user",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      text: "Category",
      path: "/list/category",
      icon: "M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z",
    },
    {
      text: "Franchise",
      path: "/list/franchise",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      text: "Branch",
      path: "/list/branch",
      icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
    },
    {
      text: "Customer",
      path: "/list/customer",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      text: "Orders",
      path: "/list/order",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    },
    {
      text: "Coupons",
      path: "/list/coupons",
      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    },
    // {
    //   text: "Wishlist",
    //   path: "/list/wishlist",
    //   icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    // },
    {
      text: "Product",
      path: "/list/product",
      icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    },{
      text: "Tags",
      path: "/list/tags",
      icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
    },{
      text: "Banner Image",
      path: "/list/banner",
      icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    },{
      text: "Social Media links",
      path: "/list/social",
      icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    },{
      text: "Pincode",
      path: "/list/settingPincode",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
    },
    {
      text: "Setting",
      path: "/list/settings",
      icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
    }
  ];

  return (
    <div className="hidden sm:col-span-2 sm:flex flex-col h-full p-3  bg-primary-900 text-slate-200">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="w-full text-center">Venkateshwara</h2>
          {/* <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current text-slate-200"
            >
              <rect width="352" height="32" x="80" y="96"></rect>
              <rect width="352" height="32" x="80" y="240"></rect>
              <rect width="352" height="32" x="80" y="384"></rect>
            </svg>
          </button> */}
        </div>
        {/* <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center py-4">
            <button
              type="submit"
              className="p-2 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                className="w-5 h-5 text-gray-600"
              >
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search..."
            className="
              w-full
              py-2
              pl-10
              text-sm
              border-transparent
              rounded-md
              focus:outline-none
              bg-gray-100
              text-gray-800
              focus:bg-gray-50
            "
          />
        </div> */}
        <div className="flex-1">
          <ul className="pb-4 space-y-1 text-sm">
            {menu.map((m) => (
             
              <li
                key={Math.random().toString().slice(2)}
                className="rounded-sm"
              >
                <NavLink
                  to={`${UtilsJson.routingUrl}${m.path}`}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
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

                  <span>{m.text} </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bottom-0 flex items-center p-2 mt-12 space-x-4 justify-self-end">
        <img
          src="https://source.unsplash.com/100x100/?portrait"
          alt=""
          className="w-12 h-12 rounded-lg"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {UserDetails.user_name || ""}
          </h2>
          <span className="flex items-center space-x-1">
            <NavLink
             to={'/'}
              className="text-xs hover:underline text-slate-400 cursor-pointer"
            >
              LogOut
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PageContainer;
