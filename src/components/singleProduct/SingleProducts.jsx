import './Singleproduct.css';
import ReactStars from 'react-stars';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AllProducts from '../products/Allproducts/AllProducts';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase/Firebase';
import { useContext } from 'react';
import MyContext from '../myContext/MyContext';

function SingleProducts({ products }) {
  const context = useContext(MyContext);
  const { GetCurrentUser, loggeduser, } = context;


  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const filterProduct = products.find((p) => p.id === id);
    setProduct(filterProduct || {});

    if (filterProduct) {
      const relatedProducts = products.filter((p) => p.producttype.toLowerCase() === filterProduct.producttype.toLowerCase() && p.id !== id);
      // console.log(relatedProducts)
      setRelatedProducts(relatedProducts);
      
    }

  }, [id, products]);


//   console.log(product)




  const addtocart = () => {
    if(loggeduser){
      addDoc(collection(db, `cart-${loggeduser[0].uid}`), {
        product, quantity: 1, productid: id,
        
    }).then(() => {
        window.alert('Product added to cart');

    }).catch(() => window.alert("error"));
    }
    else{
      alert("Please login to add to cart")
    }
  }

  const addtofavourite = () => {
    if(loggeduser){
      addDoc(collection(db, `favourite-${loggeduser[0].uid}`), {
        product, quantity: 1, productid: id
    }).then(() => {
        window.alert('Product added to favourite list');

    }).catch(() => window.alert("error"));
    }
    else{
      alert("Please login to add to favourite list")
    }
  }

  const productbuy = () => {
    if(loggeduser){

      addDoc(collection(db, "buy"), {
        product, quantity: 1,
        customername: loggeduser[0].username,
        customeremail: loggeduser[0].email,
        customerphonenumber: loggeduser[0].phonenumber,
        customeraddress: loggeduser[0].addressLine1,
        customerpincode: loggeduser[0].pincode,
        customerstate: loggeduser[0].state,
        customercity: loggeduser[0].city,
        status: "panding",
        ordertime: new Date().getTime(),
        customeruid: loggeduser[0].uid,
    }).then(() => {
        window.alert('success fully buy');

    }).catch(() => window.alert("error"));
    }
    else{
      alert("Please login to buy")
    }
  }
    //   const [productstock, setProductStock] = useState(product.stock);


  
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


  return (
    <>
      <>
            <section className="text-gray-600 body-font overflow-hidden single-product-main-cont ">
                <div className="container px-5 py-10 mx-auto">
                    {product && 
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full lg:h-auto  object-cover object-center rounded"
                            src={product.productimage}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                {product.brand}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {product.producttitle}
                            </h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                <ReactStars value={product.rating} size={20} edit={false} />
                                    <span className="text-gray-600 ml-3">({product.rating} Reviews)</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed border-b-2 mb-5 pb-5">
                                {product.description}
                            </p>

                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                ₹{product.discountprice}
                                </span>
                                { product.stock != 0 ? <>   <button  onClick={()=>addtocart(product)} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                    Add To Cart
                                </button>
                                {/* <button  onClick={()=>productbuy(product)} className="flex ml-auto text-white bg-orange-400 border-0 py-2 px-6 focus:outline-none  rounded">
                                    Buy
                                </button> */}
                                <button onClick={addtofavourite} className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg
                                        fill="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                    </svg>
                                </button> </> 
                                : <> <h3>out of stock</h3> </>
                                } 
                              
                            </div>
                        </div>
                    </div>}
                </div>
            </section>

     </>

      
        <AllProducts products={relatedProducts} />
      
    </>
  )
}

export default SingleProducts;
