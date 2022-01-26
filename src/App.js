import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import AddProduct from "./Components/AddProduct";
import ProductTable from "./Components/ProductTable";
import PageContainer from "./Components/PageContainer";
import Dashboard from "./Components/Dashboard";
import TableList from "./Components/TableList";
import FormFields from "./Components/FormFields";
function App() {
  return (
    <Router>
      <div className="h-screen overflow-auto bg-gold-100 grid grid-cols-12 bg-slate-200  outline-none">
       <PageContainer/>
        <Routes>
          <Route path="/customer"  element={<ProductTable />} />
          <Route path="/customer/:id"  element={<AddProduct />} />
          <Route path="/table"  element={<PageContainer/>} />
          <Route path="/list/:type"  element={<TableList/>} />
          <Route path="/list/:type/:id"  element={<FormFields/>} />
          <Route path="/dashboard"  element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
