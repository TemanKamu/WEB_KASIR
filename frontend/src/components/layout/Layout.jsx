import { useEffect } from "react";
import {
  DashboardIcon,
  BillIcon,
  SettingIcon,
  AnalyticIcon,
  LogoutIcon,
} from "../Icon/index.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Layout = (props) => {
  const { children } = props;
  const navigator = useNavigate();
  const Logout = async () => {
    await axios
      .delete("http://localhost:5000/logout")
      .then(() => {
        navigator("/login");
        console.log("berhasil logout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const currentPath = window.location.pathname;
  return (
    <div className="flex gap-3">
      <div className="sticky left-0 min-h-screen flex flex-col gap-5 bg-white shadow-2xl p-4">
        <div className="w-14 mx-auto mb-5">
          <img
            src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-2-800x800.jpg"
            alt="..."
            className="shadow rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
        <button
          className={`${
            currentPath === "/"
              ? "bg-black"
              : "border border-black bg-white  transition hover:bg-gray-500 hover:text-white"
          } px-2 rounded-lg`}
          onClick={() => (window.location.href = "/")}
        >
          <div className="my-3 ">
            <div className="w-11 mx-auto -mt-2">
              <DashboardIcon fill={currentPath === "/" ? "white" : "black"} />
            </div>
            <div className="flex justify-center">
              <span
                className={`text-[10px] mt-2 ${
                  currentPath === "/" ? "text-white" : "text-black"
                }`}
              >
                Dashboard
              </span>
            </div>
          </div>
        </button>
        {/* <button
          className={`${
            currentPath === "/bill"
              ? "bg-black"
              : "border border-black  transition hover:bg-gray-500 hover:text-white"
          } px-4 rounded-lg`}
          onClick={() => (window.location.href = "/bill")}
        >
          <div className="my-3 ">
            <div className="w-9 mx-auto -mt-1">
              <BillIcon fill={currentPath === "/bill" ? "white" : "black"} />
            </div>
            <div className="flex justify-center">
              <span
                className={`text-[10px] mt-2 ${
                  currentPath === "/bill" ? "text-white" : "text-black"
                }`}
              >
                Bill
              </span>
            </div>
          </div>
        </button> */}
        <button
          className={`${
            currentPath === "/manage"
              ? "bg-black"
              : "border border-black  transition hover:bg-gray-500 hover:text-white"
          } px-4 rounded-lg`}
          onClick={() => (window.location.href = "/manage")}
        >
          <div className="my-3 ">
            <div className="w-9 mx-auto -mt-1">
              <SettingIcon
                fill={currentPath === "/manage" ? "white" : "black"}
              />
            </div>
            <div className="flex justify-center">
              <span
                className={`text-[10px] mt-2 ${
                  currentPath === "/manage" ? "text-white" : "text-black"
                }`}
              >
                Manage
              </span>
            </div>
          </div>
        </button>

        <button
          className={`${
            currentPath === "/logout"
              ? "bg-black"
              : "border border-black  transition hover:bg-gray-500 hover:text-white"
          } px-4 rounded-lg `}
          onClick={() => Logout()}
        >
          <div className="my-3 ">
            <div className="w-9 -mt-1">
              <LogoutIcon
                fill={currentPath === "/logout" ? "white" : "black"}
              />
            </div>
            <div className="flex justify-center">
              <span
                className={`text-[10px] mt-2 ${
                  currentPath === "/logout" ? "text-white" : "text-black"
                }`}
              >
                Logout
              </span>
            </div>
          </div>
        </button>
      </div>
      {children}
    </div>
  );
};
export default Layout;
