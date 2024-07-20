import { LockClosedIcon } from "@heroicons/react/solid";
import { useState } from "react";
import PostApi from "../Services/PostApi";
import { useNavigate } from "react-router-dom";
import shLogo from "../asst/img/short-logo.png";
import toast from "react-hot-toast";
export default function LoginPage(props) {
  localStorage.clear();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  /*To save the form */
  const login = (event) => {
    event.preventDefault();
    var intilizeValue = {
      "user_name": event.target[1].value,
      "login_password": event.target[2].value
    }
    setLoading(true);
    PostApi("userLogin", intilizeValue, props, 'Login Sucessfully', 'login').then((e) => {
      if (e.responcePostData.data.status === "200") {
        toast.success('Login Successfully', { position: "top-right" })
        localStorage.setItem('details', JSON.stringify(e.responcePostData.data));
        navigate("dashboard");
        setLoading(false);
      } else {
        toast.error('Invalid details', { position: "top-right" })
        setLoading(false);

      }
    }).catch((error) => {
      setLoading(false);
    })
  };

  return (
    <div className="flex justify-center">
      <div className="min-h-full w-full h-screen bg-gradient-to-r from-violet-800 to-fuchsia-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full p-10 bg-slate-100 space-y-8 rounded-sm">
          <div>
            <img
              className="mx-auto h-16 w-auto rounded-lg"
              src={shLogo}
              alt="Sarva Logo"
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
                  placeholder="User Name"

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

                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="********"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? ' disabled:bg-gray-400 disabled:cursor-not-allowed' : ""}`} disabled={loading}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {!loading ?
                    <LockClosedIcon
                      className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                      aria-hidden="true"
                    />
                    : ""}
                </span>
                {!loading ? 'Sign in' : "Loading ..."}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
