import React, { useEffect, useMemo } from "react";
import Loading from "./Loading.jsx";
import Layout from "./layout/Layout";
import {
  AddIcon,
  AllItemIcon,
  FoodIcon,
  DeleteIcon,
  CloseButton,
} from "./Icon";
import Modal from "./Modal";
import ModalUpdate from "./ModalUpdate.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Manage = () => {
  const [search, setSearch] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [menuId, setMenuId] = React.useState(0);
  const [showModalUpdate, setShowModalUpdate] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(0);
  const [dataSession, setDataSession] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [menu, setMenu] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigator = useNavigate();

  const handleModal = (data) => {
    setShowModal(data);
  };
  const getAllCategory = async () => {
    await axios
      .get("http://localhost:5000/category-menu")
      .then((data) => {
        setCategory(data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleModalUpdate = (data) => {
    setShowModalUpdate(data);
  };
  const getSession = async () => {
    await axios
      .get("http://localhost:5000/login-session")
      .then((data) => {
        setDataSession(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          navigator("/login");
        }
      });
  };
  const getAllMenu = async () => {
    await axios
      .get("http://localhost:5000/menu")
      .then((data) => {
        console.log(data.data.data);
        setMenu(data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGetMenuByCategory = async (category) => {
    await axios
      .get(`http://localhost:5000/menu/category/${category}`)
      .then((data) => {
        setMenu(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleGetMenuBySearch = async (e) => {
    e.preventDefault();
    if (search === "") {
      getAllMenu();
      return;
    }
    await axios
      .get(`http://localhost:5000/menu/search/${search}`)
      .then((data) => {
        setMenu(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteMenu = async (id) => {
    await axios
      .delete(`http://localhost:5000/menu/${id}`)
      .then((data) => {
        console.log(data);
        getAllMenu();
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  useEffect(() => {
    getAllMenu();
    getAllCategory();
    getSession();
  }, []);
  useEffect(() => {
    if (!inputValue || inputValue < 0) {
      setInputValue(1);
    }
  }, [inputValue]);
  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      {showModal ? <Modal onCustomEvent={handleModal} /> : null}
      {showModalUpdate ? (
        <ModalUpdate
          onCustomEvent={handleModalUpdate}
          id={dataSession.id}
          menuId={menuId}
        />
      ) : null}
      <section className="m-5 w-full">
        <header className="bg-red">
          <article className="flex flex-wrap justify-start gap-4">
            <div
              className=" w-full max-w-[16.9999rem] px-7 bg-black rounded-lg text-white shadow-xl  flex flex-col cursor-pointer transition hover:opacity-70"
              onClick={() => getAllMenu()}
            >
              <div className=" mt-3 pb-1">
                <div className="w-9 h-9 flex justify-center m-auto">
                  <AllItemIcon />
                </div>
                <p className="text-center font-semibold text-lg mt-4">ALL</p>
              </div>
            </div>
            {category &&
              category.map((data, i) => (
                <div
                  className="w-full max-w-[16.99rem] bg-black rounded-lg text-white shadow-xl flex flex-col cursor-pointer transition hover:opacity-70"
                  key={i}
                  onClick={() => handleGetMenuByCategory(data.id)}
                >
                  <div className="mt-3 pb-1">
                    <div className="max-w-[3rem] flex justify-center my-auto mx-auto">
                      <img
                        src={data.picture_url}
                        className="w-full h-full object-fill"
                        alt="your category"
                      />
                    </div>
                    <p className="text-center font-semibold text-md ">
                      {data.name}
                    </p>
                  </div>
                </div>
              ))}
          </article>
          <article className="">
            <form className="shadow-2xl" onSubmit={handleGetMenuBySearch}>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative mt-3">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 ml-1 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-md"
                  placeholder="Search menu..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-black rounded-br-md rounded-tr-md transition hover:opacity-70"
                >
                  <span>SEARCH</span>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </form>
          </article>
        </header>
        <article className="flex flex-wrap xl:justify-start mt-5 gap-7 max-h-[660px] sm:justify-center overflow-y-auto">
          <div
            className="bg-white shadow-2xl rounded-lg w-full max-w-[265px] h-[240px] hover:bg-gray-200 cursor-pointer transition flex"
            onClick={() => setShowModal(true)}
          >
            <div className="p-3 px-5 m-auto">
              <div className="w-20 h-20 mx-auto ">
                <AddIcon fill={"black"} />
              </div>
              <p className="text-center text-xl mt-3">ADD NEW</p>
            </div>
          </div>
          {menu &&
            menu.map((item, i) => {
              return (
                <div
                  className="bg-white shadow-xl rounded-lg w-full max-w-[265px] h-[240px] max-h-[240px] transition hover:bg-gray-200 cursor-pointer"
                  key={i}
                >
                  <header className="w-full ">
                    <img
                      src={item.picture_url}
                      className="object-cover w-full h-[160px] rounded-t-lg"
                      alt=""
                    />
                  </header>
                  <article className="max-h-[100px]  my-auto h-full">
                    <header className="font-semibold text-lg text-center mx-auto w-9/12 truncate ...">
                      {item.name}
                    </header>
                    <article className="text-center text-[8px] font-thin -mt-0.5 max-w-[9rem] mx-auto max-h-[14px] line-clamp-3">
                      {item.desc}
                    </article>
                    <footer className="text-center font-medium my-1 flex flex-col">
                      {item.priceFormat}
                      <div className="flex w-full max-w-[265px] mt-2">
                        <div className="w-6/12">
                          <button
                            className="w-full bg-black text-white  rounded-bl-xl border border-black hover:opacity-70"
                            onClick={() => {
                              setShowModalUpdate(true);
                              setMenuId(item.id);
                            }}
                          >
                            EDIT
                          </button>
                        </div>
                        <div className="w-6/12">
                          <button
                            className="w-full bg-white text-black  rounded-br-xl border border-black"
                            onClick={() => deleteMenu(item.id)}
                          >
                            DELETE
                          </button>
                        </div>
                      </div>
                    </footer>
                  </article>
                </div>
              );
            })}
        </article>
      </section>
    </Layout>
  );
};

export default Manage;
