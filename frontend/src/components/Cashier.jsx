import React, { useEffect, useRef, useState } from "react";
import Loading from "./Loading.jsx";
import Layout from "./layout/Layout";
import { AllItemIcon, DeleteIcon, CloseButton } from "./Icon";
import Bill from "./Bill.jsx";
import Modal from "./Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const Cashier = () => {
  const [search, setSearch] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [dataSession, setDataSession] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [menu, setMenu] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [amountItem, setAmountItem] = useState(0);
  const [billMenu, setBillMenu] = React.useState([]);
  const [money, setMoney] = React.useState(0);
  const [temp, setTemp] = React.useState("");
  const [totalDetail, setTotalDetail] = React.useState([]);
  const [detailBill, setDetailBill] = React.useState([]);
  const [tempSec, setTempSec] = React.useState("");
  const componentRef = useRef(null);
  const navigator = useNavigate();

  const countMenu = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/count", {
        menu: billMenu,
        tunai: money,
      })
      .then((data) => {
        setTotalDetail(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setDetailBill([]);
      setTemp(null);
    },
  });
  const getDetailbillByNoTransaction = async (noTransaction) => {
    await axios
      .get(`http://localhost:5000/bill-details/${noTransaction}`)
      .then((data) => {
        setDetailBill(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  const getAllBillMenu = async (noTransaction) => {
    await axios
      .get(`http://localhost:5000/bill-menu/${noTransaction}`)
      .then((data) => {
        setBillMenu(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddMenu = async (data) => {
    if (!temp) {
      await axios
        .post("http://localhost:5000/bill-menu", {
          menuId: data.id,
          amount: 1,
          price: data.price,
        })
        .then((data) => {
          setAmountItem(1);
          setTemp(data.data.data.noTransaction);
          getAllBillMenu(data.data.data.noTransaction);
        });
    } else {
      const billDataIsSame = billMenu.filter((billData) => {
        return billData.menu.id === data.id;
      });
      if (billDataIsSame[0]) {
        await axios
          .patch(`http://localhost:5000/bill-menu/${data.id}`, {
            noTransaction: temp,
            amount: billDataIsSame.amount,
          })
          .then(() => {
            setAmountItem(amountItem + 1);
            getAllBillMenu(temp);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await axios
          .post("http://localhost:5000/bill-menu", {
            noTransaction: temp,
            menuId: data.id,
            amount: 1,
            price: data.price,
          })
          .then((data) => {
            setTemp(data.data.data.noTransaction);
            getAllBillMenu(data.data.data.noTransaction);
            setAmountItem(1);
            console.log("on post");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
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
  const handleUpdateMenu = async (id, type, data) => {
    if (data.amount === 1) {
      console.log("on zero bill menu");
      await axios
        .delete(`http://localhost:5000/bill-menu/${data.id}`)
        .then(() => {
          console.log("succes delete data");
          getAllBillMenu(temp);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .patch(`http://localhost:5000/bill-menu/${id}`, {
          type,
          noTransaction: temp,
        })
        .then(() => {
          getAllBillMenu(temp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleDeleteMenu = async (id, data) => {
    await axios
      .delete(`http://localhost:5000/bill-menu/${id}`)
      .then(() => {
        getAllBillMenu(temp);
        countMenu();
      })
      .catch((err) => {
        console.log({ data });
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
  const handleCancel = async () => {
    await axios
      .delete(`http://localhost:5000/bill-menu/all/${temp}`)
      .then(() => {
        setTemp(null);
        getAllBillMenu(temp);
        setBillMenu([]);
        setTotalDetail([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCharge = async () => {
    await axios
      .post("http://localhost:5000/bill-details", {
        billMenuId: billMenu[0].id,
        noTransaction: temp,
        totalPrice: totalDetail[0].total,
        cash: money,
        change: totalDetail[0].kembali,
      })
      .then((data) => {
        getDetailbillByNoTransaction(data.data.data.noTransaction);
        setTemp(null);
        getAllBillMenu(null);
        setTotalDetail([]);
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
    setTotalDetail(totalDetail);
    console.log(totalDetail);
  }, [totalDetail]);
  useEffect(() => {
    setDetailBill(detailBill);
  }, [detailBill]);
  if (loading) {
    return <Loading />;
  }
  return (
    <Layout>
      {showModal ? <Modal onCustomEvent={handleModal} /> : null}
      <div className="w-full hidden">
        {detailBill.length !== 0 && (
          <div className="w-9/12 border border-black" ref={componentRef}>
            <h1 className="text-xl text-center">Nordils bills</h1>
            <hr className="border border-black mt-3" />
            <div className="text-center">
              <span className="text-[10px]">Tanggal transaksi : </span>
              <span className="text-[10px]">
                {detailBill.billDetail.createdAt}
              </span>
            </div>
            <div className="text-center">
              <span className="text-[10px]">Nomor transaksi : </span>
              <span className="text-[10px]">
                {detailBill.billDetail.noTransaction}
              </span>
            </div>
            <hr className="border border-black" />
            <div className="p-1">
              {detailBill.billMenu.map((data, i) => (
                <div className="flex justify-around mt-3" key={i}>
                  <span className="text-[8px] mr-3">{data.menu.name}</span>
                  <span className="text-[8px] mr-3">{data.amount}x</span>
                  <span className="text-[8px] mr-3">
                    {(data.amount * data.price).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="mt-10">
                <hr className="border border-black mt-3" />
                <div className="mt-2 flex justify-around">
                  <span className="text-[10px] font-bold">Tunai:</span>
                  <span className="text-[10px] font-normal">
                    {detailBill.billDetail.cash.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-around">
                  <span className="text-[10px] font-bold">Total:</span>
                  <span className="text-[10px] font-normal">
                    {detailBill.billDetail.total_price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-around">
                  <span className="text-[10px] font-bold">Kembali:</span>
                  <span className="text-[10px] font-normal">
                    {detailBill.billDetail.change.toLocaleString()}
                  </span>
                </div>

                <hr className="border border-black mt-3" />
              </div>
            </div>
            {handlePrint()}
          </div>
        )}
      </div>
      <section className="m-5 w-full">
        <header className="bg-red">
          <article className="flex flex-wrap justify-start gap-4">
            <div
              className=" w-full max-w-[10.5rem] px-7 bg-black rounded-lg text-white shadow-xl  flex flex-col cursor-pointer transition hover:opacity-70"
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
                  className="w-full max-w-[10.5rem] bg-black rounded-lg text-white shadow-xl flex flex-col cursor-pointer transition hover:opacity-70"
                  key={i}
                  onClick={() => handleGetMenuByCategory(data.id)}
                >
                  <div className="mt-3 pb-1">
                    <div className="max-w-[3.3rem] flex justify-center my-auto mx-auto">
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
        <article className="flex flex-wrap xl:justify-start mt-5 gap-7 max-h-[660px] overflow-y-auto sm:justify-center">
          {menu &&
            menu.map((item, i) => {
              return (
                <div className="flex flex-col" key={i}>
                  <div
                    className="bg-white border border-gray-300 shadow-xl rounded-lg w-[256px] max-w-[265px] h-[240px] max-h-[240px] transition hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleAddMenu(item)}
                  >
                    <header className="w-full">
                      {billMenu &&
                        billMenu.map((data, i) => {
                          return (
                            data.menu.id === item.id && (
                              <div
                                className="relative ml-[210px] top-1"
                                key={i}
                              >
                                <div className="absolute bg-white px-4 py-2 rounded-full">
                                  {data.amount}
                                </div>
                              </div>
                            )
                          );
                        })}
                      <img
                        src={item.picture_url}
                        className="object-cover w-full xl:h-[160px] rounded-t-lg"
                        alt=""
                      />
                    </header>
                    <article className="max-h-[90px]  my-auto h-full">
                      <header className="font-semibold text-lg text-center mx-auto w-9/12 truncate ...">
                        {item.name}
                      </header>
                      <article className="text-center text-[8px] font-thin -mt-0.5 max-w-[9rem] mx-auto max-h-[14px] line-clamp-3">
                        {item.desc}
                      </article>
                      <footer className="text-center font-medium my-1">
                        {item.priceFormat}
                      </footer>
                    </article>
                  </div>
                </div>
              );
            })}
        </article>
      </section>
      <aside className="w-[32rem] max-w-[32rem] min-h-screen py-5 px-10 bg-black xl:flex lg:flex md:flex hidden transition ">
        <section className="mx-2 my-5 w-[25.6rem] max-w-[25.6rem]">
          <header className=" flex justify-between">
            <header className="text-white text-4xl">
              Order &nbsp;
              <span className="font-bold text-4xl">Menu</span>
            </header>
            <div className="w-10 cursor-pointer">
              <CloseButton fill={"white"} />
            </div>
          </header>
          <article>
            <section className="flex flex-col max-h-[321.9px] overflow-y-auto overflow-x-hidden rounded-xl mt-4">
              {billMenu &&
                billMenu.map((data, i) => (
                  <article className="mt-4 w-[25rem] max-w-[25rem]" key={i}>
                    <div className="w-full rounded-xl bg-white">
                      <div className="flex gap-2 p-1">
                        <div className="w-full h-full max-w-[110px] max-h-[79.19px]">
                          <img
                            src={data.menu.picture_url}
                            alt="image-item"
                            className="object-fill rounded-lg w-full max-h-[79.19px]"
                          />
                        </div>
                        <div className=" w-[12rem]">
                          <header className="font-bold text-lg">
                            {data.menu.name}
                          </header>
                          <article className="text-[8px] font-thin w-11/12 text-left text-gray-800 -mt-1 line-clamp-2">
                            {data.menu.desc}
                          </article>
                          <footer className="-mt-2 flex justify-between items-center w-10/12">
                            <div className="">
                              <span className="text-[8px] font-black w-8/12 text-left text-gray-800">
                                Subtotal :{" "}
                              </span>
                              <span className="text-[8px] w-8/12 text-left text-gray-800">
                                {data.menu.price}
                              </span>
                            </div>
                            <div className="">
                              <span className="text-[8px] font-black w-8/12 text-left text-gray-800">
                                Total :{" "}
                              </span>
                              <span className="text-[8px] w-8/12 text-left text-gray-800">
                                {data.menu.price * data.amount}
                              </span>
                            </div>
                          </footer>
                        </div>
                        <div className="w-auto my-auto">
                          <div className="border border-black rounded-3xl w-full bg-white flex justify-between">
                            <button
                              className="bg-black rounded-l-3xl text-white w-[20px] flex justify-center"
                              value="-"
                              onClick={() =>
                                handleUpdateMenu(data.menu.id, "-", data)
                              }
                            >
                              -
                            </button>

                            <span className="mx-2">{data.amount}</span>

                            <button
                              className="bg-black rounded-r-3xl text-white w-[20px] flex justify-center border-none outline-none"
                              value="+"
                              onClick={() =>
                                handleUpdateMenu(data.menu.id, "+", data)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          className="w-5 h-5 my-auto"
                          onClick={() => handleDeleteMenu(data.id, data)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
            </section>
            <section className="mt-5">
              <form onSubmit={countMenu}>
                <input
                  type="text"
                  className="rounded-xl text-sm text-gray-500 px-3 py-4  w-full"
                  placeholder="Masukkan uang tunai ..."
                  onChange={(e) => setMoney(e.target.value)}
                />
                <article className="flex gap-3">
                  <button
                    className="text-black bg-white py-3 px-5 rounded-xl mt-3 transition hover:bg-gray-300"
                    type="submit"
                  >
                    COUNT
                  </button>
                  <button
                    className="text-black bg-red-200 py-3 px-5 rounded-xl mt-3 transition hover:bg-red-400"
                    onClick={() => handleCancel()}
                  >
                    CANCEL
                  </button>
                </article>
              </form>

              <hr className="mt-10 border-white rounded-xl" />
            </section>
          </article>

          {totalDetail.length > 0 ? (
            <footer className=" mt-8">
              <section className="rounded-xl p-5 w-full bg-white">
                <article className="flex flex-col gap-3">
                  <div>
                    <span className="font-bold">Tunai : </span>
                    <span>{totalDetail[1].formatedData.tunai}</span>
                  </div>
                  <div>
                    <span className="font-bold">Kembali : </span>
                    <span>{totalDetail[1].formatedData.kembali}</span>
                  </div>
                  <div>
                    <span className="font-bold">Total : </span>
                    <span>{totalDetail[1].formatedData.total}</span>
                  </div>
                </article>
              </section>
              <footer className="w-full">
                <button
                  className="text-black w-full bg-white py-3 px-5 rounded-xl mt-3 transition hover:bg-gray-300"
                  onClick={() => handleCharge()}
                >
                  CHARGE {totalDetail[1].formatedData.total}
                </button>
              </footer>
            </footer>
          ) : (
            <footer className=" mt-8">
              <section className="rounded-xl p-5 w-full bg-white">
                <article className="flex flex-col gap-3">
                  <div>
                    <span className="font-bold">Tunai : </span>
                    <span></span>
                  </div>
                  <div>
                    <span className="font-bold">Kembali : </span>
                    <span></span>
                  </div>
                  <div>
                    <span className="font-bold">Total : </span>
                    <span></span>
                  </div>
                </article>
              </section>
              <footer className="w-full">
                <button className="text-black w-full bg-white py-3 px-5 rounded-xl mt-3 transition hover:bg-gray-300 cursor-not-allowed">
                  CHARGE
                </button>
              </footer>
            </footer>
          )}
        </section>
      </aside>
    </Layout>
  );
};

export default Cashier;
