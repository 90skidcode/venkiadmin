
export const TableJsonHeaderList = {
  category: [
    {
      Header: "Name",
      accessor: "categoryname",
      className: "px-6 py-2 whitespace-nowrap text-slate-900 text-sm",
    },
    {
      Header: "Description",
      accessor: "categorydescription",
    },
    {
      Header: "Image",
      accessor: "category_image",  
      Cell: ({ cell }) => (
        <img alt={cell.row.values.category_image} src={"http://54.88.14.184:8000/"+cell.row.values.category_image}/>
      )
    }
  ],
};
