import React, { useEffect, useRef, useState } from "react";
import { CloseButton } from "./Icon";
import axios from "axios";

const Modal = ({ onCustomEvent, id }) => {
  const [categoryList, setCategoryList] = React.useState([]);

  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [file, setFile] = React.useState("");

  // Ref
  const priceFormatted = useRef(null);

  const handlePriceFormat = (arg) => {
    const numericValue = arg.replace(/[^0-9]/g, "");
    const numericResult = isNaN(parseInt(numericValue))
      ? ""
      : parseInt(numericValue);
      setPrice(Number(numericResult));
      console.log(arg)
    priceFormatted.current.value = `Rp, ${numericResult.toLocaleString()}`;
  };
  const getAllCategory = async () => {
    await axios
      .get("http://localhost:5000/category-menu")
      .then((data) => {
        console.log(data.data.data);
        setCategoryList(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmitMenu = async (e) => {
    e.preventDefault();
    // const numericValue = price.replace(/[^0-9]/g, "");
    console.log(price)
    // const numericResult = isNaN(parseInt(price))
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("categoryId", category);
    formData.append("price", price);
    formData.append("image", file);
    console.log(file);
    await axios
      .post("http://localhost:5000/menu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(category);
        console.log(err);
      });
  };
  const handleClickModal = () => {
    onCustomEvent(false);
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  useEffect(() => {}, [price]);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Add menu</h3>
              <button
                className="p-1 ml-auto  border-0 text-black float-right text-3xl font-semibold outline-none focus:outline-none"
                onClick={handleClickModal}
              >
                <div className="text-black h-10 w-10 block outline-none focus:outline-none">
                  <CloseButton />
                </div>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto w-[40rem]">
              <form
                action=""
                className="flex flex-col gap-3"
                onSubmit={handleSubmitMenu}
              >
                <input
                  type="text"
                  className="border border-black outline-none rounded-lg py-4 ps-3"
                  placeholder="Enter name Menu ... "
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  className="border border-black outline-none rounded-lg py-2 ps-3"
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Enter description menu"
                  required
                ></textarea>
                <select
                  className="border border-black outline-none rounded-lg py-2 ps-3"
                  onChange={(e) => setCategory(parseInt(e.target.value))}
                  required
                >
                  <option value="" selected disabled>
                    Pilih Category
                  </option>
                  {categoryList.map((data, i) => (
                    <option value={data.id} key={i}>
                      {data.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="border border-black outline-none rounded-lg py-2 ps-3"
                  placeholder="Enter price menu"
                  ref={priceFormatted}
                  onChange={(e) => handlePriceFormat(e.target.value)}
                  required
                />
                <input
                  type="file"
                  className="border border-black outline-none rounded-lg py-2 ps-3"
                  onChange={(e) => setFile(e.target.files[0])}
                  placeholder="Enter menu image"
                  required
                />
                <button
                  type="submit"
                  className="bg-black text-white text-xl p-4 rounded-xl"
                >
                  Submit
                </button>
              </form>
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
