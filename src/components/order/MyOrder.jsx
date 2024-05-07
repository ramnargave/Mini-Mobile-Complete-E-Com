import { collection, getDocs,  } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {  db } from "../firebase/Firebase";
import MyContext from "../myContext/MyContext";
import { Link } from "react-router-dom";


function MyOrder() {
    const [oorder, setOorder] = useState([]);
    const [myorder, setMyOrder] = useState([]);
  
    const context = useContext(MyContext);
    const { loggeduser } = context;
   
  
    useEffect(() => {
      const getProducts = async () => {
        try {
          const productsArray = [];
          const querySnapshot = await getDocs(collection(db, "buy"));
          querySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
          });
          setOorder(productsArray);
          // console.log(order)
        } catch (error) {
          console.error("Error fetching products:", error.message);
        }
      };
      getProducts();
    }, []);
  
    useEffect(() => {
      const filterSeller = () => {
        const data = oorder.filter((p) => p.customeruid === loggeduser[0].uid);
        //   console.log(data)
        setMyOrder(data);
      };
  
      filterSeller();
    }, [oorder]);
  return (
<>
          <div className="order-main-cont h-full pt-10">
            
  
                {myorder.map((p)=>(
                    <>
                       <Link key={p.product.id} to={`/orderdetail/${p.product.id}`} className=" order-cont mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                          <div className="rounded-lg md:w-2/3">
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" >
                              <img src={p.product.productimage} alt="product-image" className="w-full rounded-lg sm:w-40" />
                              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                {/* <h2 className="text-lg font-bold text-gray-900">Order Id:- {p.id}</h2> */}
                                  <h2 className="text-lg font-bold text-gray-900">{p.product.producttitle}</h2>
                                  <p className="mt-1 text-xs text-gray-700" >Order Id:- {p.id}</p>
                                  <p className="mt-1 text-xs text-gray-700" >Status:- {p.status}</p>
                                  <p className="mt-1 text-xs text-gray-700" >{p.product.description}</p>
                                  <p className="mt-1 text-xs text-gray-700" >{p.product.discountprice}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        
                  </Link>
                    </>
                ))}
               
                
      
            
          </div>
        </>
  )
}

export default MyOrder