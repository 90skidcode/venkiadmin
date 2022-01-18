import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import NavSideBar from "./Components/NavSideBar";
import AddProduct from "./Components/AddProduct";
import ProductTable from "./Components/ProductTable";
import PageContainer from "./Components/PageContainer";
function App() {
  return (
    <Router>
      <div className="h-screen overflow-auto bg-gold-100 grid grid-cols-12 bg-slate-200  outline-none">
       <PageContainer/>
        <Routes>
          <Route path="/customer"  element={<ProductTable />} />
          <Route path="/customer/:id"  element={<AddProduct />} />
          <Route path="/table"  element={<PageContainer/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
