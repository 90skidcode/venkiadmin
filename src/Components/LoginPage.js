import { LockClosedIcon } from "@heroicons/react/solid";
import { useState } from "react";
import PostApi from "../Services/PostApi";
import { UtilsJson } from "../utils/UtilsJson";
import { useNavigate } from "react-router-dom";
export default function LoginPage(props) {
  localStorage.clear();
  const intilizeValue = {};
  const [formValues, setFormValues] = useState(intilizeValue);
  const navigate = useNavigate();
  /* Set Values to form  */
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  /*To save the form */
  const login = (e) => {
    e.preventDefault();
    PostApi("userLogin",formValues,props, 'Login Sucessfully','login').then((e)=> {
      if(e.responcePostData.data[0] === "Invalid Login"){
        props.setMessage({class:'bg-red-600',visable:true, title:'Error', body:'Invalid details'});

      }else{
        props.setMessage({class:'bg-green-600',visable:true, title:'Success', body:'Login Successfully'});
        localStorage.setItem('details',JSON.stringify(e.responcePostData.data));
        navigate("list/category");
      }
    })
  };

  return (
    <div className="flex justify-center">
      <div className="min-h-full w-full h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full p-10 bg-slate-100 space-y-8 rounded-sm">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={UtilsJson.baseUrl + "productimg/"+"SVS.png"}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={login}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="user_id" className="sr-only">
                  User Id
                </label>
                <input
                  id="user_id"
                  name="user_id"
                  type="text"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="VKT100"
                  onBlur={handlechange}
                />
              </div>
              <div>
                <label htmlFor="login_password" className="sr-only">
                  Password
                </label>
                <input
                  id="login_password"
                  name="login_password"
                  type="password"
                  autoComplete="current-password"
                  onBlur={handlechange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="********"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
