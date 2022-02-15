import { UtilsJson } from "../utils/UtilsJson";
export const TableJsonHeaderList = {
  category: [
    {
      Header: "Name",
      accessor: "category_name",
      className: "px-6 py-2 whitespace-nowrap text-slate-900 text-sm",
    },
    {
      Header: "Description",
      accessor: "category_description",
    },
    {
      Header: "Image",
      accessor: "category_image",
      Cell: ({ cell }) => (
        <img
          width="50"
          height="50"
          alt={cell.row.values.category_image}
          src={
            UtilsJson.baseUrl + "productimg/" + cell.row.values.category_image
          }
        />
      ),
    },
  ],
  franchise: [
    {
      Header: "Name",
      accessor: "franchise_name",
      className: "px-6 py-2 whitespace-nowrap text-slate-900 text-sm",
    },
    {
      Header: "Address",
      accessor: "franchise_address",
    },
    {
      Header: "Phone Number",
      accessor: "franchise_phone",
    },
    {
      Header: "Email",
      accessor: "franchise_email",
    },
  ],
  user: [
    {
      Header: "Code",
      accessor: "user_id",
      className: "px-6 py-2 whitespace-nowrap text-slate-900 text-sm",
    },
    {
      Header: "Name",
      accessor: "user_name",
    },
    {
      Header: "Address",
      accessor: "user_address",
    },
    {
      Header: "Phone Number",
      accessor: "user_phone",
    },
    {
      Header: "Email",
      accessor: "user_email",
    },
  ],
  customer: [
    {
      Header: "Customer No",
      accessor: "customer_no",
      className: "px-6 py-2 whitespace-nowrap text-slate-900 text-sm",
    },
    {
      Header: "First Name",
      accessor: "customer_fname",
    },
    {
      Header: "Last Name",
      accessor: "customer_lname",
    },
    {
      Header: "Joning Date",
      accessor: "customer_joining",
    },
    {
      Header: "Phone Number",
      accessor: "customer_phone",
    },
    {
      Header: "Email",
      accessor: "customer_email",
    },
  ],
  order: [
    {
      Header: "Customer Name",
      accessor: "customer_id",
      className: "px-6 py-2 whitespace-nowrap text-slate-900 text-sm",
    },
    {
      Header: "D elivery Address",
      accessor: "delivery_address",
    },
    {
      Header: "Payment Mode",
      accessor: "payment_mode",
    },
    {
      Header: "Order Amount",
      accessor: "order_amount",
    },
    {
      Header: "Delivery Status",
      accessor: "delivery_status",
    },
    {
      Header: "Order Status",
      accessor: "order_status",
    },
  ],
  branch: [
    {
      Header: "ID",
      accessor: "branch_no",
      className:
        "px-6 py-2 whitespace-nowrap text-slate-900 text-sm cursor-pointer",
    },
    {
      Header: "Name",
      accessor: "branch_name",
    },
    {
      Header: "Address",
      accessor: "branch_address",
    },
    {
      Header: "Phone",
      accessor: "branch_phone",
    },
    {
      Header: "Email",
      accessor: "branch_email",
    },
    {
      Header: "Country",
      accessor: "branch_country",
    },
    {
      Header: "State",
      accessor: "branch_state",
    },
    {
      Header: "City",
      accessor: "branch_city",
    },
    {
      Header: "Pincode",
      accessor: "branch_pincode",
    },
  ],
  product: [
    {
      Header: "Code",
      accessor: "product_code",
      className:
        "px-6 py-2 whitespace-nowrap text-slate-900 text-sm cursor-pointer",
    },
    {
      Header: "Name",
      accessor: "product_name",
    },
    {
      Header: "Price",
      accessor: "product_price",
    },
    {
      Header: "Sale Price",
      accessor: "product_sales_price",
    },
    {
      Header: "Visible",
      accessor: "visible",
      Cell: ({ cell }) =>
      cell.row.values.visible ? (
          <span class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">
            Visable
          </span>
        ) : (
          <span class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            Visable
          </span>
        ),
    },
  ], settings: [
    {
      Header: "Email",
      accessor: "client_email",
      className:
        "px-6 py-2 whitespace-nowrap text-slate-900 text-sm cursor-pointer",
    },
    {
      Header: "Phone",
      accessor: "client_phone",
    },
    {
      Header: "Address",
      accessor: "client_address",
    },
  ]

};
