import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PageContainer from "./Components/PageContainer";
import Dashboard from "./Components/Dashboard";
import TableList from "./Components/TableList";
import FormFields from "./Components/FormFields";
import LoginPage from "./Components/LoginPage";
import { UtilsJson } from "./utils/UtilsJson";
import { Toaster } from "react-hot-toast";

function App() {
  const [pageLoader, setPageLoader] = useState(false);

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
      <Toaster />
      <Routes>
        <Route path={`${UtilsJson.routingUrl}/`} element={<LoginPage setPageLoader={setPageLoader}
          pageLoader={pageLoader}
        ></LoginPage>}></Route>
        <Route
          path={`${UtilsJson.routingUrl}/table`}
          element={
            <PageContainer
              setPageLoader={setPageLoader}
              pageLoader={pageLoader}
            />
          }
        />
        <Route
          path={`${UtilsJson.routingUrl}/list/:type`}
          element={
            <TableList
              setPageLoader={setPageLoader}
              pageLoader={pageLoader}
            />
          }
        />
        <Route
          path={`${UtilsJson.routingUrl}/list/:type/:id`}
          element={
            <FormFields
              setPageLoader={setPageLoader}
              pageLoader={pageLoader}
            />
          }
        />
        <Route path={`${UtilsJson.routingUrl}/dashboard`} element={<Dashboard />} />
        <Route path="*" element={<LoginPage setPageLoader={setPageLoader}
          pageLoader={pageLoader}
        ></LoginPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
