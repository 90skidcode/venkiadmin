import React from "react";
import { useState, useEffect } from "react";
import FetchApi from "../Services/FetchApi";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import PostApi from "../Services/PostApi";
import PutApi from "../Services/PutApi";
import FileApi from "../Services/FileApi";
import { FormFieldJson } from "../JSON/FormJson";
export default function FormFields(props) {
  const { type, id } = useParams();

  var { responceData } = id !== "new" ? FetchApi(type + "/" + id) : "";

  var postDataLists = React.useMemo(
    () => (responceData ? responceData.data : []),
    [responceData]
  );

  const formFields = FormFieldJson[type];
  const intilizeValue = {};

  useEffect(() => {
    if (postDataLists.length || id === "new") {
      formFields.map(
        (item) =>
          (item.values =
            id === "new" ? item.values : postDataLists[0][item.name])
      );
      formFields.forEach((item) => (intilizeValue[item.name] = item.values));
      setFormValues(intilizeValue);
    }
  }, [postDataLists]);

  const [formValues, setFormValues] = useState(intilizeValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  /* Set Values to form  */
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const UploadImage = (e) => {
    let { name, value } = e.target;
    props.setPageLoader(true);
    FileApi(e.target.files[0]).then(result => {
      setFormValues({ ...formValues, [name.replace('File','')]: result.responceFileData.data['Uploaded Filenames'].toString() });
      props.setPageLoader(false);
    });

  };


  /*To save the form */
  const saveForm = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(formValues));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setIsSubmit(false);
      var { responcePostData } =
        id === "new"
          ? PostApi(type, formValues)
          : PutApi(type + "/" + id, formValues);
    }
  }, [formErrors, formValues, isSubmit]);

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
                <div className="text-primary-900 text-3xl font-bold capitalize">
                  <h1>Add {type} ✨</h1>
                </div>
              </div>
              <div className="bg-white shadow-sm rounded-sm  border border-slate-300 mt-5">
                <header className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800 capitalize">Add {type}</h2>
                </header>
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-12 gap-6">
                    {formFields.map((e) =>
                      e.type !== "hidden" ? (
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
                          ) : e.type === "select" ? (
                            
                            <select
                              key={e.name}
                              name={e.name}
                              id={e.name}
                              value={formValues[e.name]}
                              onChange={handlechange}
                              autoComplete="off"
                              className="mt-1 h-8 shadow-sm px-2 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
                            >{}
                              <option value="">Select from list</option>
                              {e.list.map((item) => (
                                <option
                                  key={Math.random()}
                                  value={e.server ? item.id : item.key}
                                >
                                  {e.server ? item.title : item.value}
                                </option>
                              ))}
                            </select>
                          ) : e.type === "file" ? (
                            <div className="flex items-center justify-center w-full">
                              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                  <div className="flex flex-auto max-h-48 mx-auto">
                                    {(formValues[e.name])? <img
                                      className="has-mask h-36 object-center"
                                      src={`http://ec2-54-88-14-184.compute-1.amazonaws.com:8000/productimg/${formValues[e.name]}`}
                                      alt="freepik"
                                    /> :<p className="pointer-none text-gray-500 ">
                                    <span className="text-sm">
                                      Drag and drop
                                    </span>{" "}
                                    files here <br /> or{" "}
                                    <di
                                      href=""
                                      id=""
                                      className="text-blue-600 hover:underline"
                                    >
                                      select a file
                                    </di>{" "}
                                    from your computer
                                  </p>}
                                  </div>
                                  
                                </div>
                                <input
                                  key={e.name+"File"}
                                  type='file'
                                  name={e.name+"File"}
                                  id={e.name}                               
                                  autoComplete="off"
                                  className="hidden"
                                  onChange={UploadImage}

                                />
                                <input
                                  key={e.name}
                                  type='text'
                                  name={e.name}                                 
                                  value={formValues[e.name]}
                                  autoComplete="off"
                                  className="hidden"                                  
                                />
                              </label>
                            </div>
                          ) : (
                            ""
                          )}
                          <small
                            id="emailHelp"
                            className="block mt-1 text-xs text-red-600"
                          >
                            {formErrors[e.name]}
                          </small>
                        </div>
                      ) : (
                        ""
                      )
                    )}
                  </div>
                </div>
                <div className="px-3 py-2 bg-gray-50 text-right sm:px-6">
                  <NavLink
                    className="px-6  py-2.5 mx-2  bg-red-600  text-white  font-medium  text-xs  leading-tight  uppercase  shadow-md  hover:bg-red-700 hover:shadow-lg  focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-red-800 active:shadow-lg  transition  duration-150  ease-in-out"
                    to={"/list/" + type + "/"}
                  >
                    Back{" "}
                  </NavLink>
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
