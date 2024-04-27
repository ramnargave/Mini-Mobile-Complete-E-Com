// import { useContext } from 'react'
import {FaUserTie } from 'react-icons/fa';
import AdminDashboardTab from './AdminDashboardTab';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
// import myContext from '../../../context/data/myContext';
// import Layout from '../../../components/layout/Layout';

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      const getProducts = async () => {
        try {
          const productsArray = [];
          const querySnapshot = await getDocs(collection(db, "products"));
          querySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
          });
          setProducts(productsArray);
        } catch (error) {
          console.error("Error fetching products:", error.message);
        }
      };
      getProducts();
    }, []);

    const [users, setUsers] = useState([]);
    const [totalseller, setTotalSeller] = useState([]);
    const [totalusers, setTotalUsers] = useState([]);

    useEffect(() => {
      const getProducts = async () => {
        try {
          const productsArray = [];
          const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
          });
          setUsers(productsArray);
        //   console.log(seller)
        } catch (error) {
          console.error("Error fetching products:", error.message);
        }
      };
      getProducts();
    }, []);
   
    useEffect(() => {
        const filterSeller = () => {
          const data = users.filter((p)=>p.roll === "seller");
        //   console.log(data)
          setTotalSeller(data)
        }
    
        filterSeller();
      }, [users])

      useEffect(() => {
        const filterSeller = () => {
          const data = users.filter((p)=>p.roll === "user");
        //   console.log(data)
          setTotalUsers(data)
        }
    
        filterSeller();
      }, [users])

      useEffect(() => {
        const getProducts = async () => {
          try {
            const productsArray = [];
            const querySnapshot = await getDocs(collection(db, "buy"));
            querySnapshot.forEach((doc) => {
              productsArray.push({ ...doc.data(), id: doc.id });
            });
            setOrders(productsArray);
            console.log(orders)
          } catch (error) {
            console.error("Error fetching products:", error.message);
          }
        };
        getProducts();
      }, []);



    // const context = useContext(myContext)
    // const { mode} = context
  return (
    <div className="content dashboard-main-main-cont">
        <section className="text-gray-600 body-font mt-10 mb-10">
            <div className="container px-5 mx-auto mb-10">
                <div className="flex flex-wrap -m-4 text-center">
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" >
                            <div className="text-purple-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" >{products.length}</h2>
                            <p className=" text-purple-500  font-bold" >Total Products</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" >
                            <div className="text-purple-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" >{orders.length}</h2>
                            <p className=" text-purple-500  font-bold" >Total Orders</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" >
                            <div className="text-purple-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" >{totalseller.length}</h2>
                            <p className=" text-purple-500  font-bold" >Total Seller</p>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className=" border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl"  >
                            <div className="text-purple-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                <FaUserTie size={50} />
                            </div>
                            <h2 className="title-font font-medium text-3xl text-black fonts1" >{totalusers.length}</h2>
                            <p className=" text-purple-500  font-bold" >Total Users</p>
                        </div>
                    </div>
                </div>
            </div>
            <AdminDashboardTab/>
        </section>
        </div>
  )
}

export default AdminDashboard