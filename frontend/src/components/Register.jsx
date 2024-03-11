import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmailIcon, PasswordIcon, UserIcon, PhoneIcon } from "./Icon";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messagePassword, setMessagePassword] = useState(false);
  const [messageEmail, setMessageEmail] = useState(false);
  const [messageNumberPhone, setMessageNumberPhone] = useState(false);
  const navigator = useNavigate();
  const path = window.location.pathname;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/user", {
        name,
        noHp: numberPhone,
        email,
        password,
        confirmPassword,
      })
      .then((data) => {
        navigator("/login");
      })
      .catch((err) => {
        // console.log(err.response.data);
        if (err.response.data.typeError === "email") {
          setMessageEmail(true);
        } else {
          setMessageEmail(false);
        }
        if (err.response.data.typeError === "noHp") {
          setMessageNumberPhone(true);
        } else {
          setMessageNumberPhone(false);
        }
        console.log(err);
      });
  };

  const getSession = async () => {
    await axios
      .get("http://localhost:5000/login-session")
      .then((data) => {
        console.log(data);
        if (data) {
          navigator("/");
        }
      })
      .catch((err) => {
        if (err.response.data.typeError === "session") {
          if (path === "/login" || path === "/register") {
            return 0;
          } else {
            navigator("/login");
          }
        }
        if (!err.response.data.typeError) {
          console.log(err);
          console.log("lol");
        }
      });
  };

  useEffect(() => {
    getSession();
  }, []);
  useEffect(() => {
    if ((!password && confirmPassword) || (password && !confirmPassword)) {
      setMessagePassword(false);
    } else {
      if (password !== confirmPassword) {
        setMessagePassword(true);
      } else {
        setMessagePassword(false);
      }
    }
  }, [password, confirmPassword]);
  return (
    <section className="w-full min-h-screen flex flex-wrap">
      <article className="w-7/12">
        <img
          src="images/logo.png"
          alt="logo.png"
          className="w-full h-full object-fill"
        />
      </article>
      <article className="w-5/12 bg-black p-7">
        <header>
          <span className="block text-5xl font-medium text-white py-3">
            Sign up
          </span>
          <p className="text-gray-300 w-10/12">
            Because you don't have an account yet, please register first
          </p>
        </header>
        <article className="mt-5">
          <form className="flex flex-wrap gap-8" onSubmit={handleSubmit}>
            <div className="relative w-[17rem] max-w-[17rem]">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <div className="w-6">
                  <UserIcon fill="#B9B9B9" />
                </div>
              </div>
              <input
                type="text"
                className="block w-full p-4 ps-14 text-sm  border-none outline-none rounded-md"
                placeholder="Enter name..."
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="relative w-[17rem] max-w-[17rem]">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <div className="w-6">
                  <EmailIcon fill="#B9B9B9" />
                </div>
              </div>
              <input
                type="email"
                className={`${
                  messageEmail && "border-2 border-red-500 "
                } block w-full p-4 ps-14 text-sm outline-none rounded-md`}
                placeholder="Enter email..."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className={`relative ${!messageEmail && "hidden"}`}>
                <div className="absolute text-red-400">
                  <span className="text-xs">* Email is already in use!</span>
                </div>
              </div>
            </div>
            <div className="relative w-[17rem] max-w-[17rem]">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <div className="w-6">
                  <PhoneIcon fill="#B9B9B9" />
                </div>
              </div>
              <input
                type="text"
                className={`${
                  messageNumberPhone && "border-2 border-red-500 "
                } block w-full p-4 ps-14 text-sm  outline-none rounded-md`}
                placeholder="Enter number phone..."
                onChange={(e) => setNumberPhone(e.target.value)}
                required
              />
              <div className={`relative ${!messageNumberPhone && "hidden"}`}>
                <div className="absolute text-red-400">
                  <span className="text-xs">* Number phone already in use</span>
                </div>
              </div>
            </div>
            <div className={"relative w-[17rem] max-w-[17rem]"}>
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <div className="w-6">
                  <PasswordIcon fill="#B9B9B9" />
                </div>
              </div>
              <input
                type="password"
                className={`${
                  messagePassword && "border-2 border-red-500 "
                } block w-full p-4 ps-14 text-sm  outline-none rounded-md`}
                placeholder="Enter password..."
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className={`relative ${!messagePassword && "hidden"}`}>
                <div className="absolute text-red-400">
                  <span className="text-xs">* Password not match</span>
                </div>
              </div>
            </div>
            <div className="relative w-[17rem] max-w-[17rem]">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <div className="w-6">
                  <PasswordIcon fill="#B9B9B9" />
                </div>
              </div>
              <input
                type="password"
                className={`${
                  messagePassword && "border-2 border-red-500 "
                } block w-full p-4 ps-14 text-sm outline-none rounded-md`}
                placeholder="Enter confirm password..."
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div className={`relative ${!messagePassword && "hidden"}`}>
                <div className="absolute text-red-400">
                  <span className="text-xs">* Confirm password not match</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                className="bg-white p-4 rounded-xl w-[28rem] max-w-[28rem]"
                type="submit"
              >
                <span className="text-xl font-semibold">SIGN UP</span>
              </button>
              <article className="text-white text-center">
                <span>
                  Already have an account ?{" "}
                  <a
                    className="text-blue-300 underline cursor-pointer"
                    href="/login"
                  >
                    Sign in
                  </a>
                </span>
              </article>
            </div>
          </form>
        </article>
      </article>
    </section>
  );
};

export default Register;
