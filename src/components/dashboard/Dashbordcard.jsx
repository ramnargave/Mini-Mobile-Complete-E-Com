import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";

function Dashbordcard() {
    const [products, setProducts] = useState([]);
    const [myproducts, setMyProducts] = useState([]);
   const navigate = useNavigate();


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
          const querySnapshot = await getDocs(collection(db, "products"));
          querySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
          });
          setProducts(productsArray);
          // console.log(products)
        } catch (error) {
          console.error("Error fetching products:", error.message);
        }
      };
      getProducts();
    }, []);

    useEffect(() => {
      const filterSeller = () => {
        const data = products.filter((p)=>p.uid === loggeduser[0].uid,);
        // console.log(data)
        setMyProducts(data)
      }
  
      filterSeller();
    }, [products])

   const deleteProduct = async (productId) => {
    const docRef = doc(db, "products", productId);
    try {
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
      // Remove the deleted product from the state
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
   }
   
    return (
      <tbody>
        {myproducts.map((p, index) => (
          <tr key={p.id} className="bg-gray-50 border-b dark:border-gray-700">
            <td className="px-6 py-4 text-black">{index + 1}.</td>
            <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
              <img className='w-16' src={p.productimage} alt="img" />
            </th>
            <td className="px-6 py-4 text-black">{p.producttitle}</td>
            <td className="px-6 py-4 text-black">{p.discountprice}</td>
            <td className="px-6 py-4 text-black">{p.producttype}</td>
            <td className="px-6 py-4 text-black">{new Date(p.timestamp).toLocaleString()}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <div className="flex gap-2 cursor-pointer text-black">
                  <div onClick={() => deleteProduct(p.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </div>
                  <div onClick={()=>{navigate('/updateproducts',{state:p})}} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
  
  export default Dashbordcard;
