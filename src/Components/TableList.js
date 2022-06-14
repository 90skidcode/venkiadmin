import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { NavLink, useParams } from "react-router-dom";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  TrashIcon,
  PencilAltIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/outline";
import FetchApi from "../Services/FetchApi";
import { TableJsonHeaderList } from "../JSON/TableJson";
import axios from "axios";
import { UtilsJson } from "../utils/UtilsJson";
import PageContainer from "./PageContainer";
import GetApi from "../Services/GetApi";
import { Audio } from "react-loader-spinner";

function alpDate(params) {
  const d = new Date(params);
  const monthNames = [
    "Jan",
    "Feb",
    "May",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className=" text-slate-600">
      Search{" "}
      <input
        className="mt-1h-8 shadow-sm h-8 px-3 rounded sm:text-sm border border-slate-300 hover:border-slate-500 outline-none"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records`}
      />
    </div>
  );
}

function TableList(props) {
  const { type } = useParams();
  const [open, setOpen] = useState(false);
  const [orderDetails, setorderDetails] = useState([]);
  const cancelButtonRef = useRef(null);
  let { responceData } = FetchApi(type);
  const [ModalPopUpFlag, setModalPopUpFlag] = useState("hidden");
  const [deleteCurrent, setDeleteCurrent] = useState();
  function ClosePopUp() {
    setModalPopUpFlag("hidden");
    setDeleteCurrent([]);
  }

  function setTableData() {
    props.setPageLoader(true);
    if (responceData) {
      props.setPageLoader(false);
    }
    return responceData ? responceData.data : [];
  }
  const data = React.useMemo(() => setTableData(responceData), [responceData]);
  const TableColumn = TableJsonHeaderList[type];
  const columns = React.useMemo(
    () => (TableColumn ? TableColumn : []),
    [TableColumn]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  function DeleteData(params) {
    setModalPopUpFlag("");
    setDeleteCurrent(params);
  }

  function DeleteRequest() {
    const deleteId = deleteCurrent.original.id;
    axios
      .delete(UtilsJson.baseUrl + type + "/" + deleteId)
      .then((response) => {
        responceData.data.map((e) =>
          e.id === deleteId ? (e.categoryname = "update") : e
        );
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        ClosePopUp();
      });
  }

  const ProductPrice = (product) => {
    return product.product_info[0].attribute_id.find(
      (o) => o.att_id === product.attribute_id
    ).price;
  };

  const ProductWeight = (product) => {
    return product.product_info[0].attribute_id.find(
      (o) => o.att_id === product.attribute_id
    ).att_value;
  };

  function DeleteModal() {
    return (
      <div
        className={`min-w-screen h-screen animated fadeIn faster  fixed bg-slate-400 bg-opacity-75  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover ${ModalPopUpFlag}`}
      >
        <div className="flex">
          <div className="bg-white rounded-xl shadow-lg justify-center">
            <div className="text-center p-5 flex-auto justify-center">
              <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
              <p className="text-sm text-gray-500 px-8">
                Do you really want to delete? This process cannot be undone.
              </p>
            </div>
            <div className="p-3 mt-2 text-center space-x-4 md:block">
              <button
                onClick={() => ClosePopUp()}
                className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => DeleteRequest()}
                className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function viewInvoice(orderId) {
    setOpen(true);
    GetApi(type + "/" + orderId).then((data) => {
      setorderDetails(data.responceData);
    });
  }

  return (
    <div className="h-screen overflow-auto bg-gold-100 grid grid-cols-12 bg-slate-200  outline-none">
      <PageContainer></PageContainer>
      <div className="col-span-12 sm:col-span-10  m-5">
        <div className="flex justify-between flex-wrap">
          <div className="text-primary-900 text-3xl font-bold capitalize">
            <h1>{type} ✨ </h1>
          </div>
          {type === "settings" || type === "order" ? (
            ""
          ) : (
            <NavLink key={Math.random()} to={"new"}>
              <button className="px-6  py-2.5  bg-blue-600  text-white  font-medium  text-xs  leading-tight  uppercase  shadow-md  hover:bg-blue-700 hover:shadow-lg  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg  transition  duration-150  ease-in-out">
                Add New
              </button>
            </NavLink>
          )}
        </div>
        <div className="bg-white shadow-lg rounded-sm border border-gray-200 mt-5 overflow-auto">
          <header className="px-5 py-4 border-b border-gray-100 p-4 flex flex-wrap justify-between ">
            <h2 className="text-gray-800 text-base font-semibold justify-items-start capitalize">
              All {type}
              <span className="text-base font-semibold text-slate-500">
                {" - " + data.length}
              </span>
            </h2>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </header>

          <table
            className="w-full divide-y divide-gold-600"
            {...getTableProps()}
          >
            <thead className="bg-slate-200 text-slate-500">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    {" "}
                    Action{" "}
                  </th>
                </tr>
              ))}
            </thead>
            <tbody
              className="bg-white divide-y divide-gray-200"
              {...getTableBodyProps()}
            >
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="px-6 py-2 whitespace-nowrap text-slate-500 text-sm "
                          {...cell.getCellProps([
                            {
                              className: cell.column.className,
                              style: cell.column.style,
                            },
                          ])}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}

                    <td className="px-6 py-2 whitespace-nowrap text-slate-500 text-sm  flex flex-row">
                      <NavLink
                        key={Math.random()}
                        to={
                          type === "product"
                            ? row.original.product_code
                              ? row.original.product_code
                              : ""
                            : type === "order"
                            ? typeof row.original.order_id != "undefined"
                              ? row.original.order_id
                              : ""
                            : row.original.id
                        }
                      >
                        <PencilAltIcon
                          height={15}
                          className=" text-blue-500 cursor-pointer text-left mx-2"
                        ></PencilAltIcon>
                      </NavLink>
                      {type === "order" ? (
                        <ClipboardCheckIcon
                          height={15}
                          className=" text-blue-500 cursor-pointer text-left mr-2"
                          xlinkTitle="invoice"
                          onClick={() => viewInvoice(row.original.order_id)}
                        ></ClipboardCheckIcon>
                      ) : (
                        ""
                      )}
                      <TrashIcon
                        height={15}
                        className=" text-red-500 cursor-pointer text-left"
                        onClick={() => {
                          DeleteData(row);
                        }}
                        value={""}
                      ></TrashIcon>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <div
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </div>
              <div
                onClick={() => nextPage()}
                disabled={!canNextPage}
                href="#"
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </div>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing Page{" "}
                  <span className="font-medium">{pageIndex + 1}</span> of{" "}
                  <span className="font-medium">{pageOptions.length}</span>
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <div
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>

                    <ChevronDoubleLeftIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <div
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    href="#"
                    className="relative inline-flex items-center px-2 py-2  border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <div
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    href="#"
                    className="relative inline-flex items-center px-2 py-2  border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronDoubleRightIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal></DeleteModal>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                id="section-to-print"
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-[80%]"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {typeof orderDetails.data != "undefined" ? (
                    <div className="w-full">
                      <div className="mt-3   sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className=" text-4xl mb-5 leading-6 font-medium text-gray-900"
                        >
                          Invoice
                        </Dialog.Title>
                        <div className="mb-8 flex justify-between w-full">
                          <div className=" w-3/4"></div>
                          <div className=" w-4/4 sm:w-1/4">
                            <div className="mb-1 flex items-center">
                              <label className="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">
                                Invoice No.
                              </label>
                              <span className="mr-4 inline-block">:</span>
                              <div className="bg-gray-200 appearance-none  rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                                {orderDetails.data[0].order_id}
                              </div>
                            </div>

                            <div className="mb-1 flex items-center">
                              <label className="w-32 text-gray-800 block font-bold text-xs uppercase tracking-wide">
                                Invoice Date
                              </label>
                              <span className="mr-4 inline-block">:</span>
                              <div className="bg-gray-200 appearance-none  rounded w-48 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                                {alpDate(orderDetails.data[0].created_at)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-between mb-8">
                          <div className="w-full md:w-1/3 mb-2 md:mb-0">
                            <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">
                              Bill/Ship To:
                            </label>
                            <div
                              className="mb-0 sm:mb-1 bg-gray-200 appearance-none  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                              id="inline-full-name"
                              type="text"
                              placeholder="Billing company name"
                              x-model="billing.name"
                            >
                              {
                                JSON.parse(
                                  orderDetails.data[0].delivery_address
                                ).customer_addr_name
                              }
                            </div>
                            <div
                              className="mb-1 bg-gray-200 appearance-none  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                              id="inline-full-name"
                              type="text"
                              placeholder="Billing company address"
                              x-model="billing.address"
                            >
                              {
                                JSON.parse(
                                  orderDetails.data[0].delivery_address
                                ).customer_addr_address
                              }
                            </div>
                            <div
                              className="mb-1 bg-gray-200 appearance-none  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                              id="inline-full-name"
                              type="text"
                              placeholder="Additional info"
                              x-model="billing.extra"
                            >
                              {
                                JSON.parse(
                                  orderDetails.data[0].delivery_address
                                ).customer_addr_phone
                              }
                            </div>
                          </div>
                          <div className="w-full md:w-1/3">
                            <label className="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">
                              From:
                            </label>
                            <div
                              className="mb-1 bg-gray-200 appearance-none  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                              id="inline-full-name"
                              type="text"
                              placeholder="Your company name"
                              x-model="from.name"
                            >
                              {" Sir Venketeshwera Sweets"}
                            </div>

                            <div
                              className="mb-1 bg-gray-200 appearance-none  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                              id="inline-full-name"
                              type="text"
                              placeholder="Your company address"
                              x-model="from.address"
                            >
                              {
                                "379/5, Midland Street, Kalarampatti Mani Road, Salem - 636015."
                              }
                            </div>

                            <div
                              className="mb-1 bg-gray-200 appearance-none  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                              id="inline-full-name"
                              type="text"
                              placeholder="Additional info"
                              x-model="from.extra"
                            >
                              {"+91 96006 19991"}
                            </div>
                            <div
                              className="mb-1 bg-gray-200 appearance-none text-xs rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                              id="inline-full-name"
                              type="text"
                              placeholder="Additional info"
                              x-model="from.extra"
                            >
                              {"info@srivenkateshwaraclassic.com"}
                            </div>
                          </div>
                        </div>

                        <div className="flex -mx-1 border-b py-2 items-start">
                          <div className="flex-1 px-1">
                            <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
                              Description
                            </p>
                          </div>

                          <div className="px-1 w-20 text-right">
                            <p className="text-gray-800 uppercase tracking-wide text-sm font-bold">
                              Units
                            </p>
                          </div>
                          <div className="px-1 w-32 text-right">
                            <p className="leading-none">
                              <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
                                Variety
                              </span>
                              <span className="font-medium text-xs text-gray-500">
                                (Kg / Pcs)
                              </span>
                            </p>
                          </div>

                          <div className="px-1 w-32 text-right">
                            <p className="leading-none">
                              <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
                                Unit Price
                              </span>
                              <span className="font-medium text-xs text-gray-500">
                                (Incl. GST)
                              </span>
                            </p>
                          </div>

                          <div className="px-1 w-32 text-right">
                            <p className="leading-none">
                              <span className="block uppercase tracking-wide text-sm font-bold text-gray-800">
                                Amount
                              </span>
                              <span className="font-medium text-xs text-gray-500">
                                (Incl. GST)
                              </span>
                            </p>
                          </div>
                        </div>

                        {JSON.parse(orderDetails.data[0].product_id).map(
                          (l) => (
                            <div
                              key={Math.random()}
                              className="flex -mx-1 border-b py-2 items-start"
                            >
                              <div className="flex-1 px-1">
                                <p className="text-gray-800 uppercase tracking-wide text-sm ">
                                  {l.product_info[0].product_name}
                                </p>
                              </div>

                              <div className="px-1 w-20 text-right">
                                <p className="text-gray-800 uppercase tracking-wide text-sm ">
                                  {l.quantity}
                                </p>
                              </div>
                              <div className="px-1 w-20 text-right">
                                <p className="text-gray-800 lowercase tracking-wide text-sm ">
                                  {ProductWeight(l)}
                                </p>
                              </div>

                              <div className="px-1 w-32 text-right">
                                <p className="leading-none">
                                  <span className="block uppercase tracking-wide text-sm  text-gray-800">
                                    Rs. {Number(ProductPrice(l)).toFixed(2)}
                                  </span>
                                </p>
                              </div>

                              <div className="px-1 w-32 text-right">
                                <p className="leading-none">
                                  <span className="block uppercase tracking-wide text-sm  text-gray-800">
                                    Rs.
                                    {(
                                      Number(l.quantity) *
                                      Number(ProductPrice(l))
                                    ).toFixed(2)}
                                  </span>
                                </p>
                              </div>
                            </div>
                          )
                        )}

                        <div className="py-2 ml-auto mt-5 w-full sm:w-2/4 lg:w-1/4">
                          <div className="justify-between mb-3 hidden">
                            <div className="text-gray-800 text-right flex-1">
                              Total incl. GST
                            </div>
                            <div className="text-right w-40">
                              <div
                                className="text-gray-800 font-medium"
                                x-html="netTotal"
                              >
                                ₹
                              </div>
                            </div>
                          </div>

                          <div className="py-2 border-t border-b">
                            <div className="flex justify-between">
                              <div className="text-xl text-gray-600 text-right flex-1">
                                Amount
                              </div>
                              <div className="text-right w-40">
                                <div
                                  className="text-xl text-gray-800 font-bold"
                                  x-html="netTotal"
                                >
                                  ₹
                                  {Number(
                                    orderDetails.data[0].order_amount
                                  ).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse no-print">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => window.print()}
                  >
                    Print
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default TableList;
