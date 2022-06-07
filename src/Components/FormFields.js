import React from "react";
import { useState, useEffect } from "react";
import FetchApi from "../Services/FetchApi";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import PostApi from "../Services/PostApi";
import PutApi from "../Services/PutApi";
import FileApi from "../Services/FileApi";
import GetApi from "../Services/GetApi";
import { FormFieldJson } from "../JSON/FormJson";
import { UtilsJson } from "../utils/UtilsJson";
import PageContainer from "./PageContainer";

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

export default function FormFields(props) {
  const { type, id } = useParams();
  const attributes = {};
  const formFields = FormFieldJson[type];
  const intilizeValue = {};
  const [formAttributes, setFormAttributes] = useState(attributes);
  const [formValues, setFormValues] = useState(intilizeValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  var { responceData } =
    id !== "new"
      ? type === "settings"
        ? FetchApi(type)
        : FetchApi(type + "/" + id)
      : "";

  const [categoryList, setcategoryList] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (type === "product") {
      GetApi("category").then((e) => {
        setcategoryList(e.responceData.data);
      });
      GetApi("tags").then((e) => {
        setTags(e.responceData.data);
      });
    }
  }, []);

  var postDataLists = React.useMemo(
    () => (responceData ? responceData.data : []),
    [responceData]
  );

  useEffect(() => {
    if (postDataLists.length || id === "new") {
      if (typeof formFields != "undefined") {
        formFields.map(
          (item) =>
            (item.values =
              id === "new" ? item.values : postDataLists[0][item.name])
        );
        formFields.forEach((item) => (intilizeValue[item.name] = item.values));
      }
      setFormValues(intilizeValue);
    }
    if (type == "product") {
      if (typeof responceData?.data[0]?.attribute_id === "object") {
        responceData.data[0].attribute_id.forEach((element) => {
          attributes[element?.att_id] = element.price;
          setFormAttributes(attributes);
        });
      } else {
        setFormAttributes([
          {
            att_id: "ATT101",
            price: "",
          },
          {
            att_id: "ATT102",
            price: "",
          },
          {
            att_id: "ATT103",
            price: "",
          },
        ]);
        intilizeValue.attribute_id = formAttributes;
        setFormValues(intilizeValue);
      }
    }
  }, [postDataLists]);

  /* Set Values to form  */
  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  /* Set Values to form  */
  const handlechangeSelectMultiple = (e) => {
    const { name } = e.target;
    const options = e.target.options;
    var optionsValue = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        optionsValue.push(options[i].value);
      }
    }
    console.log(optionsValue);
    setFormValues({ ...formValues, [name]: optionsValue });
  };

  const UploadImage = (e) => {
    let { name } = e.target;
    props.setPageLoader(true);
    FileApi(e.target.files[0]).then((result) => {
      setFormValues({
        ...formValues,
        [name.replace("File", "")]:
          result.responceFileData.data["Uploaded Filenames"].toString(),
      });
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
      if (id === "new") {
        PostApi(type, formValues, props, "Record Add Successfully", "form");
      } else {
        PutApi(
          type + "/" + id,
          formValues,
          props,
          "Record Updated Sucessfully"
        );
      }
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

  const updateAttribute = (e) => {
    const { name, value } = e.target;
    setFormAttributes({ ...formAttributes, [name]: value });
    var priceUpdate = formValues.attribute_id;
    if (priceUpdate.length) {
      console.log(priceUpdate);
      priceUpdate = priceUpdate.map((k, v) => {
        if (k.att_id === name) {
          return { att_id: name, price: value };
        } else {
          return { att_id: k.att_id, price: k.price };
        }
      });
      console.log(priceUpdate);
    }
    setFormValues({ ...formValues, attribute_id: priceUpdate });
  };

  return (
    <div className="h-screen overflow-auto bg-gold-100 grid grid-cols-12 bg-slate-200  outline-none">
      <PageContainer></PageContainer>
      <div className="col-span-12 sm:col-span-10 ">
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
                  <h2 className="font-semibold text-gray-800 capitalize">
                    Add {type}
                  </h2>
                </header>
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="sm:grid sm:grid-cols-12 gap-6">
                    {formFields
                      ? formFields.map((e) =>
                          e.type !== "hidden" ? (
                            <div className={e.class} key={e.name}>
                              <label
                                htmlFor={e.name}
                                className="block text-sm font-medium text-slate-600"
                              >
                                {e.title}
                              </label>
                              {e.type === "text" ||
                              e.type === "number" ||
                              e.type === "password" ? (
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
                              ) : e.type === "readonly" ? (
                                <input
                                  key={e.name}
                                  type={"text"}
                                  name={e.name}
                                  id={e.name}
                                  value={formValues[e.name]}
                                  onChange={handlechange}
                                  autoComplete="off"
                                  readOnly
                                  className="mt-1 shadow-sm h-8 px-3 bg-slate-200 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
                                />
                              ) : e.type === "label" ? (
                                <p
                                  key={e.name}
                                  type={"text"}
                                  onChange={handlechange}
                                  autoComplete="off"
                                  readOnly
                                  className="mt-1 shadow-sm px-2 p-1 h-8 bg-slate-200 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
                                >
                                  {" "}
                                  {alpDate(formValues[e.name])}
                                </p>
                              ) : e.type === "textarea" ? (
                                <textarea
                                  cols="30"
                                  rows="10"
                                  key={e.name}
                                  type={e.type}
                                  name={e.name}
                                  id={e.name}
                                  value={formValues[e.name]}
                                  onChange={handlechange}
                                  autoComplete="off"
                                  className="mt-1 shadow-sm px-3 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
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
                                >
                                  {}
                                  <option value="">Select from list</option>
                                  {e.server
                                    ? e.list === "tags"
                                      ? tags.map((item) =>
                                          item.status === "1" ? (
                                            <option
                                              key={Math.random()}
                                              value={item.tag_id}
                                            >
                                              {item.tag_name}
                                            </option>
                                          ) : (
                                            ""
                                          )
                                        )
                                      : categoryList.map((item) =>
                                          item.status === 1 ? (
                                            <option
                                              key={Math.random()}
                                              value={item.category_no}
                                            >
                                              {item.category_name}
                                            </option>
                                          ) : (
                                            ""
                                          )
                                        )
                                    : e.list.map((item) => (
                                        <option
                                          key={Math.random()}
                                          value={item.key}
                                        >
                                          {item.value}
                                        </option>
                                      ))}
                                </select>
                              ) : e.type === "selectMultiple" ? (
                                <select
                                  key={e.name}
                                  name={e.name}
                                  id={e.name}
                                  value={formValues[e.name]}
                                  onChange={handlechangeSelectMultiple}
                                  autoComplete="off"
                                  multiple
                                  className="mt-1 shadow-sm px-2 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
                                >
                                  {}
                                  <option value="">Select from list</option>
                                  {e.server
                                    ? e.list === "tags"
                                      ? tags.map((item) =>
                                          item.status === "1" ? (
                                            <option
                                              key={Math.random()}
                                              value={item.tag_id}
                                            >
                                              {item.tag_name}
                                            </option>
                                          ) : (
                                            ""
                                          )
                                        )
                                      : categoryList.map((item) =>
                                          item.status === 1 ? (
                                            <option
                                              key={Math.random()}
                                              value={item.category_no}
                                            >
                                              {item.category_name}
                                            </option>
                                          ) : (
                                            ""
                                          )
                                        )
                                    : e.list.map((item) => (
                                        <option
                                          key={Math.random()}
                                          value={item.key}
                                        >
                                          {item.value}
                                        </option>
                                      ))}
                                </select>
                              ) : e.type === "file" ? (
                                <div className="flex items-center justify-center w-full mt-1">
                                  <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                    <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                      <div className="flex flex-auto max-h-48 mx-auto">
                                        {formValues[e.name] ? (
                                          <img
                                            className="has-mask h-36 object-center"
                                            src={`${
                                              UtilsJson.baseUrl
                                            }productimg/${formValues[e.name]}`}
                                            alt="freepik"
                                          />
                                        ) : (
                                          <p className="pointer-none text-gray-500 ">
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
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <input
                                      key={e.name + "File"}
                                      type="file"
                                      name={e.name + "File"}
                                      id={e.name}
                                      autoComplete="off"
                                      className="hidden"
                                      onChange={UploadImage}
                                    />
                                    <input
                                      key={e.name}
                                      type="text"
                                      name={e.name}
                                      value={formValues[e.name]}
                                      autoComplete="off"
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                              ) : e.type === "table" ? (
                                <>
                                  <table className="table-auto text-black border mt-1 text-sm w-full">
                                    <thead>
                                      <tr>
                                        <th className="border p-2 font-medium">
                                          S.No
                                        </th>
                                        <th className="border p-2 font-medium">
                                          Type
                                        </th>
                                        <th className="border p-2 font-medium">
                                          Price
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="border">
                                        <td className="border p-1 text-center">
                                          1
                                        </td>
                                        <td className="border p-1">1 Pcs</td>
                                        <td className="border p-1">
                                          {" "}
                                          <input
                                            key={"ATT103"}
                                            type="number"
                                            name={"ATT103"}
                                            id={"ATT103"}
                                            onChange={updateAttribute}
                                            value={formAttributes["ATT103"]}
                                            autoComplete="off"
                                            className="mt-1 h-8 shadow-sm px-3 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
                                          />{" "}
                                        </td>
                                      </tr>
                                      <tr className="border">
                                        <td className="border p-1 text-center">
                                          2
                                        </td>
                                        <td className="border p-1">250 Gm</td>
                                        <td className="border p-1">
                                          <input
                                            key={"ATT102"}
                                            type="number"
                                            name={"ATT102"}
                                            id={"ATT102"}
                                            onChange={updateAttribute}
                                            autoComplete="off"
                                            value={formAttributes["ATT102"]}
                                            className="mt-1 h-8 shadow-sm px-3 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
                                          />
                                        </td>
                                      </tr>
                                      <tr className="border">
                                        <td className="border p-1 text-center">
                                          3
                                        </td>
                                        <td className="border p-1">500 Gm</td>
                                        <td className="border p-1">
                                          <input
                                            key={"ATT101"}
                                            type="number"
                                            name={"ATT101"}
                                            id={"ATT101"}
                                            onChange={updateAttribute}
                                            autoComplete="off"
                                            value={formAttributes["ATT101"]}
                                            className="mt-1 h-8 shadow-sm px-3 rounded-sm text-slate-600 sm:text-sm border border-slate-300 hover:border-slate-500 outline-none w-full "
                                          />{" "}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <input
                                    key={e.name}
                                    type="text"
                                    name={e.name}
                                    value={JSON.stringify(formValues[e.name])}
                                    autoComplete="off"
                                    className="hidden"
                                  />
                                </>
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
                        )
                      : ""}
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
    </div>
  );
}
