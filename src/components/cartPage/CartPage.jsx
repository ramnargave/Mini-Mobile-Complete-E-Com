import { Link } from 'react-router-dom'
import './CartPage.css'
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../firebase/Firebase';
import { useEffect, useState } from 'react';
// import CartCard from './CartCard';



function CartPage() {


    // ye dekhne ke liye ki user login hai ya nhi 
    function GetCurrentUser() {
        const [user, setUser] = useState("");
        const usersCollectionRef = collection(db, "users");
        useEffect(() => {
          auth.onAuthStateChanged((userlogged) => {
            if (userlogged) {
              // console.log(userlogged.email)
              const getUsers = async () => {
                const q = query(
                  collection(db, "users"),
                  where("uid", "==", userlogged.uid)
                );
                // console.log(q);
                const data = await getDocs(q);
                setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
              };
              getUsers();
            } else {
              setUser(null);
            }
          });
        }, []);
        return user;
      }
      const loggeduser = GetCurrentUser();

    //   user end 



    //   ye cart ke liye ki cart me kitne item hai or items show karane ke liye
    const [cartdata, setcartdata] = useState([]);
    if (loggeduser) {
        const getcartdata = async () => {
            const cartArray = [];
            const path = `cart-${loggeduser[0].uid}`
            // console.log(path)
            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    cartArray.push({ ...doc.data(), id: doc.id })
                });
                setcartdata(cartArray)
                // console.log('done')
            }).catch('Error error error')

        }
        getcartdata()
    }
    // cart end 



    // const [productquantity, setProductquantity] = useState(cartdata.quantity);
    // console.log(productquantity)


  
    // const increasequantity = async () =>{
    //   setProductquantity(productquantity+1)
       
    //   const cartid = cartdata.id;
    //   const itemref = (doc(db, `cart-${loggeduser[0].uid}`, cartid))
    //   await updateDoc(itemref,{
    //     quantity: productquantity + 1
    //   }).then(()=>{console.log('updated')})
    // }
    // const decreasequantity = async () =>{
    //   if(productquantity >= 1) {
    //     setProductquantity(productquantity-1)
    //     const cartid = cartdata.id;
    //   const itemref = (doc(db, `cart-${loggeduser[0].uid}`, cartid))
    //   await updateDoc(itemref,{
    //     quantity: productquantity - 1
    //   }).then(()=>{console.log('updated')})
    //   }
    //   if(productquantity <= 1) {
    //     const cartid = cartdata.id;
    //     deleteDoc(doc(db, `cart-${loggeduser[0].uid}`, cartid)).then(() => {
    //       window.alert('Product removed from cart');
    //     }).catch(() => window.alert("error"));
    //   }
    // }



  
  const deletecartitem = async (item)  => {
    const cartid = item.id;
   await deleteDoc(doc(db, `cart-${loggeduser[0].uid}`, cartid)).then(() => {
      window.alert('Product removed from cart');
    }).catch(() => window.alert("error"));
  }

  // const totalPrice = cartdata.reduce((total, item) => total + item.product.discountprice, 0);
  // console.log(totalPrice)

  return (
    <div className='cart-main-main-cont'>
    { cartdata.length != 0 ?  
     < >
     <div className=" bg-gray-100 pt-5 " >
       <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
       <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
         <div className="rounded-lg md:w-2/3 ">
           {cartdata.map((item, index) => (
            //  const { title, price, description, imageUrl } = item;
               <>
               <div className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6 sm:flex  sm:justify-start" >
                 <img src={item.product.productimage} alt="product-image" className="w-full rounded-lg sm:w-40" />
                 <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                   <div className="mt-5 sm:mt-0">
                     <h2 className="text-lg font-bold text-gray-900" >{item.product.producttitle}</h2>
                     <h2 className="text-sm text-gray-900">{item.product.description.slice(0, 100)}....</h2>
                     <p className="mt-1 text-xs font-semibold text-gray-700" >₹ {item.product.discountprice}</p>
                   </div>
                   <div onClick={() => deletecartitem(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                     </svg>

                   </div>
                 </div>
               </div>
               </>
             
           ))}

         </div>

         <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" >
           <div className="mb-2 flex justify-between">
             <p className="text-gray-700" >Subtotal</p>
             <p className="text-gray-700" >₹ {cartdata.map(item => parseInt(item.product.discountprice.replace(/[^\d.-]/g, ''), 10)).reduce((total, value) => total + value, 0 )}</p>
           </div>
           <div className="flex justify-between">
             <p className="text-gray-700" >Shipping</p>
             <p className="text-gray-700" >₹ 0</p>
           </div>
           <hr className="my-4" />
           <div className="flex justify-between mb-3">
             <p className="text-lg font-bold" >Total</p>
             <div className>
               <p className="mb-1 text-lg font-bold" >₹ {cartdata.map(item => parseInt(item.product.discountprice.replace(/[^\d.-]/g, ''), 10)).reduce((total, value) => total + value, 0 )}</p>
             </div>
           </div>
           <button  type="button" className="focus:outline-none w-full text-white bg-violet-600 hover:bg-violet-800  outline-0 font-medium rounded-lg text-sm px-5 py-2.5 ">Buy Now</button>

           {/* <Modal  /> */}
           {/* <Modal
             name={name}
             address={address}
             pincode={pincode}
             phoneNumber={phoneNumber}
             setName={setName}
             setAddress={setAddress}
             setPincode={setPincode}
             setPhoneNumber={setPhoneNumber}
             buyNow={buyNow}
           /> */}
         </div>
       </div>
     </div>
   </>

  

        
   : <div className="cartpage-main-empty-cont">
    <div className='text-center '>
              <h1>
                Your Cart is Empty
              </h1>
              <Link className='btn btn-warning' to={'/'}>Continue Shopping...</Link>
            </div>
    </div> }
    </div>
  )
}

export default CartPage