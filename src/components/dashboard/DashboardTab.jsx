import  { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import myContext from '../../../context/data/myContext';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, } from 'react-icons/ai';
import Dashbordcard from './Dashbordcard';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase/Firebase';

function DashboardTab() {

    const [order, setOrder] = useState([]);
    const [filterorder, setFilterOrder] = useState([]);

    const GetCurrentUser = () =>{
        const [user, setUser] = useState('')
        const usersCollectionRef = collection(db, 'users')
    
        // user login hai ya nhi 
        useEffect(() => {
        auth.onAuthStateChanged(userlogged=>{
          if(userlogged){
            const getUsers = async () => {
              const q = query(collection(db, 'users'), where('uid','==', userlogged.uid))
              const data = await getDocs(q);
              setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
            }
            getUsers();
          }
          else{
            setUser(null);
          }
        })
    
        }, [])
        return user;
      }
      const loggeduser  = GetCurrentUser()


      useEffect(() => {
        const getProducts = async () => {
          try {
            const productsArray = [];
            const querySnapshot = await getDocs(collection(db, "buy"));
            querySnapshot.forEach((doc) => {
              productsArray.push({ ...doc.data(), id: doc.id });
            });
            setOrder(productsArray);
            // console.log(order)
          } catch (error) {
            console.error("Error fetching products:", error.message);
          }
        };
        getProducts();
      }, []);


      useEffect(() => {
        const filterSeller = () => {
          const data = order.filter((p)=>p.product.uid === loggeduser[0].uid,);
        //   console.log(data)
          setFilterOrder(data)
        }
    
        filterSeller();
      }, [order]);

    // const context = useContext(myContext)
    // const { mode } = context
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    return (
        <>
           {  loggeduser && loggeduser[0].roll == "seller" ?( <div className="container mx-auto  dashboard-main-main-cont">
                <div className="tab container mx-auto ">
                    <Tabs defaultIndex={0} className=" " >
                        <TabList className="md:flex md:space-x-8 bg-  grid grid-cols-2 text-center gap-4   md:justify-center mb-10 ">
                            <Tab>
                                <button type="button" className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center bg-[#605d5d12] ">
                                    <div className="flex gap-2 items-center">
                                        <MdOutlineProductionQuantityLimits />Products</div> </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500  hover:shadow-pink-700  rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]    px-5 py-1.5 text-center ">
                                    <div className="flex gap-2 items-center">
                                        <AiFillShopping /> Order
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type="button" className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]   px-5 py-1.5 text-center ">
                                    <div className="flex gap-2 items-center">
                                        <FaUser /> Users
                                    </div>
                                </button>
                            </Tab>
                        </TabList>
                        {/* product  */}
                        <TabPanel>
                            <div className='  px-4 md:px-0 mb-16'>
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline'>Product Details</h1>
                                <div className=" flex justify-end">
                                    <Link to={'/addproducts'}
                                        type="button"
                                        className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"  > <div className="flex gap-2 items-center">
                                            Add Product <FaCartPlus size={20} />
                                        </div></Link>
                                </div>
                                <div className="relative overflow-x-auto ">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                                        <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"  >
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    S.No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Price
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Category
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                       <Dashbordcard  />
                                    </table>

                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {/* <Order order={order} setOrder={setOrder} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-16">
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' >Order Details</h1>
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
                                            <thead  className="text-xs text-black uppercase bg-gray-200 "  >
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Payment Id
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Image
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Title
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Address
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Pincode
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Phone Number
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Email
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Date
                                                    </th>
                                                </tr>
                                            </thead>
                                           {filterorder.map((p) => (
                                           <>
                                           <tbody className='jjj' key={p.id} >
                                               
                                               <tr className="bg-gray-50 border-b  dark:border-gray-700"  >
                                                   <td className="px-6 py-4 text-black " >
                                                      3393939
                                                   </td>
                                                   <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                       <img className='w-16' src= {p.product.productimage} alt="img" />
                                                   </th>
                                                   <td className="px-6 py-4 text-black " >
                                                       {p.product.producttitle}
                                                   </td>
                                                   <td className="px-6 py-4 text-black " >
                                                       {p.product.discountprice}
                                                   </td>
                                                   <td className="px-6 py-4 text-black " >
                                                       {p.status}
                                                   </td>
                                                 
                                                   <td className="px-6 py-4 text-black " >
                                                       {p.customername}
                                                   </td>
                                                   <td className="px-6 py-4 text-black " >
                                                       {p.customercity}
                                                   </td>
                                                   <td className="px-6 py-4 text-black " >
                                                       {p.customerpincode}
                                                   </td>
                                                   <td className="px-6 py-4 text-black " >
                                                      {p.customerphonenumber}
                                                   </td>
                                                   <td className="px-6 py-4 text-black " >
                                                       {p.customeremail}
                                                   </td>
                                                   <td className="px-6 py-4 text-black " >
                                                   {new Date(p.ordertime).toLocaleString()}
                                                   </td>

                                               </tr>
                                       
                                   </tbody>
                                           </>
                                           )) }
                                        </table>
                                 
                            </div>
                        </TabPanel>
                        <TabPanel>
                            {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
                            <div className="relative overflow-x-auto mb-10">
                                <h1 className=' text-center mb-5 text-3xl font-semibold underline' >User Details</h1>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-black uppercase bg-gray-200 "  >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                S.No
                                            </th>

                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Address
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Pincode
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phone Number
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      
                                                <tr className="bg-gray-50 border-b  dark:border-gray-700"  >
                                                    <td className="px-6 py-4 text-black " >
                                                        1.
                                                    </td>
                                                    <td className="px-6 py-4 text-black " >
                                                        Name
                                                    </td>
                                                    <td className="px-6 py-4 text-black " >
                                                        Address
                                                    </td>
                                                    <td className="px-6 py-4 text-black " >
                                                        181919
                                                    </td>
                                                    <td className="px-6 py-4 text-black " >
                                                        1991818818
                                                    </td>
                                                    <td className="px-6 py-4 text-black " >
                                                       kktk@gmail.com
                                                    </td>
                                                    <td className="px-6 py-4 text-black " >
                                                        12 Aug 2019
                                                    </td>

                                                </tr>
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                    </Tabs>
                </div>
            </div>)
       : ( <h1>Dont Have acees</h1> ) }
        </>
    )
}


export default DashboardTab