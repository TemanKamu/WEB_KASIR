import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmailIcon, PasswordIcon } from "./Icon";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageEmail, setMessageEmail] = useState(false);
  const [messagePassword, setMessagePassword] = useState(false);
  const navigator = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((data) => {
        console.log(data);
        navigator("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.typeError === "user") {
          setMessageEmail(true);
        } else {
          setMessageEmail(false);
        }

        if (err.response.data.typeError === "password") {
          setMessagePassword(true);
        } else {
          setMessagePassword(false);
        }
      });
  };

  const getSession = async () => {
    await axios
      .get("http://localhost:5000/login-session")
      .then((data) => {
        console.log(data);
        if (data) {
          navigator("/");
        } else {
          navigator("/login");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    getSession();
  }, []);
  return (
    <section className="w-full min-h-screen flex flex-wrap">
      <article className="w-6/12">
        <img
          src="images/logo.png"
          alt="logo.png"
          className="w-full h-full object-fill"
        />
      </article>
      <article className="w-6/12 bg-black p-7">
        <header>
          <span className="block text-5xl font-medium text-white py-3">
            Sign in
          </span>
          <p className="text-gray-300 w-10/12">
            Before accessing the cashier application it is better for us to
            login first
          </p>
        </header>
        <article className="mt-5">
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <div className="w-6">
                  <EmailIcon fill="#B9B9B9" />
                </div>
              </div>
              <input
                type="email"
                className={`${messageEmail && "border-2 border-red-500 "} block w-full p-4 ps-14 text-sm outline-none  rounded-md`}
                placeholder="Enter email..."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className={`relative ${!messageEmail && "hidden"}`}>
                <div className="absolute text-red-400">
                  <span className="text-xs">* User not found</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <div className="w-6">
                  <PasswordIcon fill="#B9B9B9" />
                </div>
              </div>
              <input
                type="password"
                className={`${messagePassword && "border-2 border-red-500 "} block w-full p-4 ps-14 text-sm outline-none  rounded-md`}
                placeholder="Enter password..."
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className={`relative ${!messagePassword && "hidden"}`}>
                <div className="absolute text-red-400">
                  <span className="text-xs">* Wrong password</span>
                </div>
              </div>
            </div>
            <button className="bg-white p-4 rounded-xl">
              <span className="text-xl font-semibold">SIGN IN</span>
            </button>
            <article className="text-white text-center">
              <span>
                Don't have an account ?{" "}
                <a
                  className="text-blue-300 underline cursor-pointer"
                  href="/register"
                >
                  Sign up
                </a>
              </span>
            </article>
          </form>
        </article>
      </article>
    </section>
  );
};

export default Login;
