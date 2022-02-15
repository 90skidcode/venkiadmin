import React from "react";
import { useState,useEffect } from "react";
import FetchApi from "../Services/FetchApi";
export default function AddProduct() {
  var { responceData } = FetchApi("https://jsonplaceholder.typicode.com/posts");
  var postDataList = React.useMemo(
    () => (responceData ? responceData.data : []),
    [responceData]
  );

  var responceData  = FetchApi(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  var postDataLists = React.useMemo(
    () => (responceData ? responceData.data : []),
    [responceData]
  );

  const formFields = [
    {
      type: "text",
      title: "Name",
      name: "name",
      values: "",
      class: "col-span-3",
      require: true,
    },
    {
      type: "select",
      title: "Age",
      name: "age",
      values: "",
      class: "col-span-3",
      require: false,
      server: false,
      list: [
        {
          key: "a",
          value: "A",
        },
        {
          key: "b",
          value: "B",
        },
        {
          key: "c",
          value: "C",
        },
      ],
    },
    {
      type: "select",
      title: "Cars",
      name: "car",
      values: "",
      class: "col-span-3",
      require: true,
      server: true,
      list: postDataList,
    },
  ];
  const intilizeValue = {};
  formFields.forEach((item) => (intilizeValue[item.name] = item.values));
  const [formValues, setFormValues] = useState(intilizeValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  /* Set Values to form  */
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  /*To save the form */
  const saveForm = (e) => {
    e.preventDefault();    
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
   if(Object.keys(formErrors).length === 0 && isSubmit){
    setIsSubmit(false);
   }
  }, [formErrors])

  /* To validate forms */

  const validate = (values) => {
    const errors = {};
    formFields.forEach((element) => {
      if (!values[element.name] && element.require) {
        errors[element.name] = element.title + " is required";
      }
    });
    return errors;
  };

  return (
    <>
      <div className="col-span-10">
        <div className="m-5">
          <form method="POST" onSubmit={saveForm}>
            <div className="">
              <div className="flex justify-between flex-wrap">
                <div className="text-primary-900 text-3xl font-bold">
                  <h1>Add Customer ✨</h1>
                </div>
              </div>
              <div className="bg-white shadow-sm rounded-sm  border border-slate-300 mt-5">
                <header className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800">Add Customer</h2>
                </header>
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-12 gap-6">
                    {formFields.map((e) => (
                      <div className={e.class} key={e.name}>
                        <label
                          htmlFor={e.name}
                          className="block text-sm font-medium text-slate-600"
                        >
                          {e.title}
                        </label>
                        {e.type === "text" || e.type === "number" ? (
                          <input
                            key={e.name}
                            type={e.type}
                            name={e.name}
                            id={e.name}
                            value={formValues[e.name]}
                            onChange={handlechange}
                            autoComplete="off"
                            className="mt-1 h-8 shadow-sm px-3 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
                          />
                        ) : (
                          <select
                          key={e.name}
                          name={e.name}
                          id={e.name}
                          value={formValues[e.name]}
                          onChange={handlechange}
                          autoComplete="off"
                            className="mt-1 h-8 shadow-sm px-2 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
                          >
                            <option value="">Select from list</option>
                            {e.list.map((item) => (
                              <option key={Math.random()} value={(e.server) ? item.id :item.key}>
                                {(e.server) ? item.title :item.value}
                              </option>
                            ))}
                          </select>
                        )}
                        <small
                          id="emailHelp"
                          className="block mt-1 text-xs text-red-600"
                        >
                          {formErrors[e.name]}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-3 py-2 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="px-6  py-2.5  bg-blue-600  text-white  font-medium  text-xs  leading-tight  uppercase  shadow-md  hover:bg-blue-700 hover:shadow-lg  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg  transition  duration-150  ease-in-out"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
