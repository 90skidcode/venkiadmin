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
        <img width="50" height="50" alt={cell.row.values.category_image} src={UtilsJson.baseUrl+"productimg/"+cell.row.values.category_image}/>
      )
    }
  ],
  franchise:[{
    Header: "Name",
    accessor: "franchise_name",
    className: "px-6 py-2 whitespace-nowrap text-slate-900 text-sm",
  },
  {
    Header: "Address",
    accessor: "franchise_address",
  },{
    Header: "Phone Number",
    accessor: "franchise_phone",
  },{
    Header: "Email",
    accessor: "franchise_email",
  }],
  user:[{
    Header: "Name",
    accessor: "user_name",
    className: "px-6 py-2 whitespace-nowrap text-slate-900 text-sm",
  },
  {
    Header: "Address",
    accessor: "user_address",
  },{
    Header: "Phone Number",
    accessor: "user_phone",
  },{
    Header: "Email",
    accessor: "user_email",
  }]
};
