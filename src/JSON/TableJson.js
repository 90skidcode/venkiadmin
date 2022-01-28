
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
        <img width="50" height="50" alt={cell.row.values.category_image} src={"http://ec2-54-88-14-184.compute-1.amazonaws.com:8000/productimg/"+cell.row.values.category_image}/>
      )
    }
  ],
};
