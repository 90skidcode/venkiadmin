import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PageContainer from "./Components/PageContainer";
import Dashboard from "./Components/Dashboard";
import TableList from "./Components/TableList";
import FormFields from "./Components/FormFields";
import LoginPage from "./Components/LoginPage";


function App() {
  const [pageLoader, setPageLoader] = useState(false);
  const [message, setMessage] = useState({
    class: "bg-blue-600",
    visable: false,
    title: "Error",
    body: "Please try again",
  });

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
      <div
        className={`absolute top-0 right-0 ${
          message.visable ? "" : "hidden"
        }`}
      >
        <div
          className={`${message.class}   m-2  right-0 shadow-lg  max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3`}
          id="static-example"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-mdb-autohide="false"
        >
          <div
            className={`${message.class}  flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-slate-300 rounded-t-lg`}
          >
            <p className="font-bold text-white flex items-center">
              {message.title}
            </p>
            <div className="flex items-center">
              <button
                type="button"
                className="btn-close text-xs btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
                data-mdb-dismiss="toast"
                aria-label="Close"
                onClick={() => setMessage({ ...message, visable: false })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-3  rounded-b-lg break-words text-white">
            {message.body}
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<LoginPage  setPageLoader={setPageLoader}
              pageLoader={pageLoader}
              setMessage={setMessage}
              message={message}></LoginPage>}></Route>
        <Route
          path="/table"
          element={
            <PageContainer
              setPageLoader={setPageLoader}
              pageLoader={pageLoader}
              setMessage={setMessage}
              message={message}
            />
          }
        />
        <Route
          path="/list/:type"
          element={
            <TableList
              setPageLoader={setPageLoader}
              pageLoader={pageLoader}
              setMessage={setMessage}
              message={message}
            />
          }
        />
        <Route
          path="/list/:type/:id"
          element={
            <FormFields
              setPageLoader={setPageLoader}
              pageLoader={pageLoader}
              setMessage={setMessage}
              message={message}
            />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
