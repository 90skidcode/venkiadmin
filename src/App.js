import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AddProduct from "./Components/AddProduct";
import ProductTable from "./Components/ProductTable";
import PageContainer from "./Components/PageContainer";
import Dashboard from "./Components/Dashboard";
import TableList from "./Components/TableList";
import FormFields from "./Components/FormFields";
import { useState } from "react";
function App() {
  const [pageLoader, setPageLoader] = useState(false);
  const [message, setmessage] = useState({class:'bg-blue-600',visable:true, title:'Error', body:'Please try again'});
  return (
    <Router>
      <div
        className={
          pageLoader
            ? "flex h-screen absolute w-full bg-slate-100 opacity-30"
            : "hidden"
        }
      >
        <div className="m-auto">
          <div
            className="animate-ping  inline-block w-8 h-8 bg-blue-800 rounded-full opacity-1"
            role="status"
          >
            <span className="visually-hidden"></span>
          </div>
        </div>
      </div>
      <div className={`flex flex-row justify-end h-screen absolute w-full ${message.visable ? '':'hidden'}`}>
        <div
          className={`${message.class}  h-24 m-2  right-0 shadow-lg  w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3`}
          id="static-example"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-mdb-autohide="false"
        >
          <div className={`${message.class}  flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-slate-300 rounded-t-lg`}>
            <p className="font-bold text-white flex items-center">
              
            {message.title}
            </p>
            <div className="flex items-center">
              <p className="text-white opacity-90 text-xs cursor-pointer" onClick={setmessage({...})}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
</svg></p>
              <button
                type="button"
                className="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
                data-mdb-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
          </div>
          <div className="p-3  rounded-b-lg break-words text-white">
           {message.body}
          </div>
        </div>
      </div>
      <div className="h-screen overflow-auto bg-gold-100 grid grid-cols-12 bg-slate-200  outline-none">
        <PageContainer />
        <Routes>
          <Route path="/customer" element={<ProductTable />} />
          <Route
            path="/customer/:id"
            element={
              <AddProduct
                setPageLoader={setPageLoader}
                pageLoader={pageLoader}
              />
            }
          />
          <Route
            path="/table"
            element={
              <PageContainer
                setPageLoader={setPageLoader}
                pageLoader={pageLoader}
              />
            }
          />
          <Route
            path="/list/:type"
            element={
              <TableList
                setPageLoader={setPageLoader}
                pageLoader={pageLoader}
              />
            }
          />
          <Route
            path="/list/:type/:id"
            element={
              <FormFields
                setPageLoader={setPageLoader}
                pageLoader={pageLoader}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
