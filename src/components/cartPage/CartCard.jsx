import ReactStars from 'react-stars';
import './CartPage.css'
import { useState } from 'react';
import { auth, db } from '../firebase/Firebase';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useEffect } from 'react';

function CartCard({itemdata}) {

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


  

  const [productquantity, setProductquantity] = useState(itemdata.quantity);

  // let price = itemdata.product.discountprice * productquantity;
  //  console.log(price)

  const increasequantity = async () =>{
    setProductquantity(productquantity+1)
     
    const cartid = itemdata.id;
    const itemref = (doc(db, `cart-${loggeduser[0].uid}`, cartid))
    await updateDoc(itemref,{
      quantity: productquantity + 1
    }).then(()=>{console.log('updated')})
  }
  const decreasequantity = async () =>{
    if(productquantity >= 1) {
      setProductquantity(productquantity-1)
      const cartid = itemdata.id;
    const itemref = (doc(db, `cart-${loggeduser[0].uid}`, cartid))
    await updateDoc(itemref,{
      quantity: productquantity - 1
    }).then(()=>{console.log('updated')})
    }
    if(productquantity <= 1) {
      const cartid = itemdata.id;
      deleteDoc(doc(db, `cart-${loggeduser[0].uid}`, cartid)).then(() => {
        window.alert('Product removed from cart');
      }).catch(() => window.alert("error"));
    }
  }

const deletecartitem = async ()  => {
  const cartid = itemdata.id;
 await deleteDoc(doc(db, `cart-${loggeduser[0].uid}`, cartid)).then(() => {
    window.alert('Product removed from cart');
  }).catch(() => window.alert("error"));
}

  return (
    <>
    <div className="cartpage-cart">
            <div className="carpage-img-div">
                <img src={itemdata.product.productimage} alt="" />
            </div>
            <div className="cartpage-cart-text-div">
                <div className="cartpage-title">
                 {itemdata.product.producttitle}
                </div>
                <div className="cartpage-star-div">
                <ReactStars value={4.5} size={20} edit={false} />
                 <div className="cartpage-review" >({itemdata.product.rating})</div>
                </div>
                <div className="cartpage-price">
                  <div className="cartpage-discount-price">Rs. {itemdata.product.discountprice}</div> <div className="carpage-mrp">Rs. {itemdata.product.mrp}</div> 
                </div>
                <div className="quantity-div">
                <div className="plush-div" onClick={decreasequantity} >-</div>
                <div className="Count-div">{productquantity}</div>
                <div className="minush-div" onClick={increasequantity} >+</div>
              </div>
                <div className="cartpage-buy-and-delete-btn">
                    <div className="cartpage-buy-btn">Buy</div>
                    <div className="cartpage-delete-btn" onClick={deletecartitem} >Delete</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CartCard