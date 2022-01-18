import React from "react";
import { useState } from "react";
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
} from "@heroicons/react/outline";
import FetchApi from "../Services/FetchApi";


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

function ProductTable() {
  
  const { responceData } = FetchApi(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const data = React.useMemo(() =>(responceData)? responceData.data : [], [responceData]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        className: "px-6 py-2 whitespace-nowrap text-slate-900 text-sm",
      },
      {
        Header: "Email",
        accessor: "userId",
      },
      {
        Header: "Location",
        accessor: "col3",
      },
      {
        Header: "Orders",
        accessor: "col4",
      },
      {
        Header: "Last Order",
        accessor: "col5",
        className:
          "px-6 py-2 whitespace-nowrap text-sky-500 text-sm font-medium",
      },
      {
        Header: "Total Spent",
        accessor: "col6",
        className:
          "px-6 py-2 whitespace-nowrap text-green-500 text-sm font-medium",
      },
      {
        Header: "Refunds",
        accessor: "col7",
        className:
          "px-6 py-2 whitespace-nowrap text-gray-500 text-sm font-medium",
      },
      {
        Header: "",
        accessor: "col8",
        Cell: ({ cell }) => (
          <TrashIcon
            className=" text-red-500 cursor-pointer"
            onClick={() => {
              deleteData(cell.row.values.name);
            }}
            value={cell.row.values.name}
          ></TrashIcon>
        ),
      },
    ],
    []
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
  const [ModalPopUpFlag, setModalPopUpFlag] = useState('hidden');
  function deleteData(params) {
    console.log(params);
   setModalPopUpFlag('')
  }

  function closePopUp() {
   setModalPopUpFlag('hidden')
  }

  return (
    <>
    <div className="col-span-10 m-5">
      <div className="flex justify-between flex-wrap">
        <div className="text-primary-900 text-3xl font-bold">
          <h1>Customers ✨ </h1>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-sm border border-gray-200 mt-5">
        <header className="px-5 py-4 border-b border-gray-100 p-4 flex flex-wrap justify-between">
          <h2 className="text-gray-800 text-base font-semibold justify-items-start">
            All Customers{" "}
            <span className=" text-base font-semibold text-slate-500">150</span>
          </h2>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </header>
        <table
          className="min-w-full divide-y divide-gold-600"
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
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              onClick={() => nextPage()}
              disabled={!canNextPage}
              href="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </a>
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

    <div className={`min-w-screen h-screen animated fadeIn faster  fixed bg-slate-400 bg-opacity-75  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover ${ModalPopUpFlag}`}>
      <div className="flex   ">
      <div className="bg-white rounded-xl shadow-lg justify-center ">
        <div className="text-center p-5 flex-auto justify-center">
              
                  <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
                  <p className="text-sm text-gray-500 px-8">Do you really want to delete your account?
                This process cannot be undone</p>    
        </div>
       
        <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button onClick={()=>closePopUp()} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                Cancel
            </button>
            <button className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">Delete</button>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default ProductTable;
