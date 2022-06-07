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
      Header: "Visible",
      accessor: "status",
      Cell: ({ cell }) =>
      cell.row.values.status == '1' ? (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">
            Visible
          </span>
        ) : (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            Deleted 
          </span>
        ),
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
      Cell: ({ cell }) =>cell.row.values.delivery_address ? (

        <h1>{(JSON.parse(cell.row.values.delivery_address).customer_addr_name)}</h1>
      ) : ""
    },
    {
      Header: "Delivery Pincode",
      accessor: "delivery_address",
      Cell: ({ cell }) =>cell.row.values.delivery_address ? (
        <h1>{(JSON.parse(cell.row.values.delivery_address).customer_addr_pincode)}</h1>
      ) : ""
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
      Cell: ({ cell }) =>
      cell.row.values.delivery_status === '1' ? (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">
            Delivery Accept
          </span>
        ) : cell.row.values.delivery_status === '2' ? (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-yellow-600 rounded-full">
            Out for Delivery
          </span>
        ) : cell.row.values.delivery_status === '3' ? (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-yellow-600 rounded-full">
            Deliver Sent
          </span>
        ): cell.row.values.delivery_status === '4' ? (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            Deliver Rejected by Customer
          </span>
        ): cell.row.values.delivery_status === '5' ? (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            Customer not in placed
          </span>
        ):"",
    },
    {
      Header: "Order Status",
      accessor: "order_status",
      Cell: ({ cell }) =>
      cell.row.values.order_status === '1' ? (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">
            Order Placed
          </span>
        ) : cell.row.values.order_status === '2' ? (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
             Payment Rejected
          </span>
        ) : cell.row.values.order_status === '3' ? (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
           Order cancel by Customer
          </span>
        ): cell.row.values.order_status === '4' ? (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            Order cancel by Admin
          </span>
        ): cell.row.values.order_status === '5' ? (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">
            Order Deliver
          </span>
        ):"",
    }
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
    // {
    //   Header: "Price",
    //   accessor: "product_price",
    //   Cell: ({ cell }) => ( 'Rs.'+ Number(cell.row.values.product_price).toFixed(2) )
    // },
    // {
    //   Header: "Sale Price",
    //   accessor: "product_sales_price",
    //   Cell: ({ cell }) => ( 'Rs.'+ Number(cell.row.values.product_sales_price).toFixed(2))
    // },
    {
      Header: "Visible",
      accessor: "visible",
      Cell: ({ cell }) =>
      cell.row.values.visible === 'V' ? (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">
            Visible
          </span>
        ) : (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            Hidden
          </span>
        ),
    },
  ], 
  settings: [
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
  ],
  tags: [
    {
      Header: "Id",
      accessor: "tag_id",
      className:
        "px-6 py-2 whitespace-nowrap text-slate-900 text-sm cursor-pointer",
    },
    {
      Header: "Name",
      accessor: "tag_name",
    }
  ],
  banner:[ {
    Header: "Image",
    accessor: "banner_image",
    Cell: ({ cell }) => (
      <img
        width="50"
        height="50"
        alt={cell.row.values.banner_image}
        src={
          UtilsJson.baseUrl + "productimg/" + cell.row.values.banner_image
        }
      />
    ),
  }, {
    Header: "Status",
    accessor: "status",
    Cell: ({ cell }) =>
    cell.row.values.status ? (
        <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">
          Visible
        </span>
      ) : (
        <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          Hidden
        </span>
      ),
  }],
  social:[ {
    Header: "Name",
    accessor: "social_media_name",
    className:
      "px-6 py-2 whitespace-nowrap text-slate-900 text-sm cursor-pointer",
  },
  {
    Header: "Link",
    accessor: "social_link",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ cell }) =>
    cell.row.values.status ? (
        <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">
          Visible
        </span>
      ) : (
        <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          Hidden
        </span>
      ),
  }],
  settingPincode:[ {
    Header: "Pincode",
    accessor: "valid_pincode",
    className:
      "px-6 py-2 whitespace-nowrap text-slate-900 text-sm cursor-pointer",
  }, 
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ cell }) =>
    cell.row.values.status ? (
        <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">
          Enable
        </span>
      ) : (
        <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          Disable
        </span>
      ),
  }],coupons: [
    {
      Header: "Coupon Code",
      accessor: "cc",
      className: "px-6 py-2 whitespace-nowrap text-slate-900 text-sm"
    },
    {
      Header: "Start Date",
      accessor: "sd",
      Cell: ({ cell }) =>cell.row.values.sd ? (
        <h1>{((cell.row.values.sd))}</h1>
      ) : ""
    },
    {
      Header: "End Date",
      accessor: "ed",
      Cell: ({ cell }) =>cell.row.values.ed ? (
        <h1>{((cell.row.values.ed))}</h1>
      ) : ""
    },
    {
      Header: "Amount",
      accessor: "value",
    },
    {
      Header: "Limit",
      accessor: "limit",
    }
  ],
};
