// import React, { useContext } from 'react'

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {  doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";


function UpdateProduct() {
  const navigate = useNavigate()
  const location = useLocation();
  console.log(location.state);
  const [producttitle, setProductTitle] = useState(location.state.producttitle);
  const [producttype, setProductType] = useState(location.state.producttype);
  const [keyspecs, setKeyspecs] = useState(location.state.keyspecs);
  const [description, setDescription] = useState(location.state.description);
  const [brand, setBrand] = useState(location.state.brand);
  const [customersupport, setCustomersupport] = useState(
    location.state.customersupport
  );
  const [mrp, setMRP] = useState(location.state.mrp);
  const [discountprice, setDiscountPrice] = useState(
    location.state.discountprice
  );
  const [warranty, setWarranty] = useState(location.state.warranty);
  //   const [productimage, setProductImage] = useState("");
  const [rating, setRating] = useState(location.state.rating);
  // const [ramstorage, setRamstorage] = useState("");
  const [stock, setStock] = useState(location.state.stock);

  const update = async (event) => {
    event.preventDefault();
    const docRef = doc(db, "products", location.state.id)
    try {
      await updateDoc(docRef,  {
        producttitle,
        producttype,
        description,
        brand,
        customersupport,
        mrp,
        discountprice,
        warranty,
        rating,
        // ramstorage,
        stock,
      }).then(() => {
        setProductTitle("");
        setProductType("");
        setDescription("");
        setBrand("");
        setCustomersupport("");
        setMRP("");
        setWarranty("");
        setKeyspecs("");
        setStock("");
        navigate("/sellerdashboard");
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="update-main-cont">
        <div className=" flex justify-center items-center  ">
          <form onSubmit={update} className=" bg-gray-800 px-10 py-10 rounded-xl ">
            <div className="">
              <h1 className="text-center text-white text-xl mb-4 font-bold">
                Update Product
              </h1>
            </div>
            <div>
              title
              <input
                type="text"
                value={producttitle}
                onChange={(e) => setProductTitle(e.target.value)}
                name="title"
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product title"
              />
            </div>
            
            <select
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              value={producttype}
              onChange={(e) => setProductType(e.target.value)}
            >
                <option value="" >Select Product Type</option>
                <option>Mobile</option>
                <option>Camera</option>
                <option>Headphone</option>
                <option>Ipad</option>
                <option>TV</option>
                <option>Laptop</option>
              </select>
            
            <div>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                name="Brand"
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Brand"
              />
            </div>
            <div>
              <input
                type="text"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                name="rating"
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Stock"
              />
            </div>
            <select
              className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
            >
              <option value="">Select Product Type</option>
              <option>3 Month</option>
              <option>6 Month</option>
              <option>1 Year</option>
              <option> No Warranty</option>
            </select>
            <div>
              <input
                type="text"
                value={keyspecs}
                onChange={(e) => setKeyspecs(e.target.value)}
                name="keyspecs"
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Key Specs"
              />
            </div>
            <div>
              <textarea
                cols="30"
                rows="10"
                name="title"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product desc"
              ></textarea>
            </div>
            <div>
              <input
                type="text"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                name="stock"
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Stock"
              />
            </div>
            <div>
              <input
                type="text"
                value={mrp}
                onChange={(e) => setMRP(e.target.value)}
                name="Mrp"
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="MRP"
              />
            </div>
            <div>
              <input
                type="text"
                value={discountprice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                name="Discount Price"
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Discount Price"
              />
            </div>
            <div>
              <input
                type="text"
                value={customersupport}
                onChange={(e) => setCustomersupport(e.target.value)}
                name="Customers Support"
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Customer Support"
              />
            </div>
            <div className=" flex justify-center mb-3">
              <button
                type="submit"
                className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
