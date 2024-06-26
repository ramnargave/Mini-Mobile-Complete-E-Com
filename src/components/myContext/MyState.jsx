import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import MyContext from "./MyContext"
import { auth, db } from "../firebase/Firebase";
import { useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { toast } from "react-toastify";



function MyState(props) {

   ////////////////////// Register function  ///////////////////////////////////

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [successmsg, setSuccessmsg] = useState('');
   const [errormsg, setErrormsg] = useState('');
   const [username, setUsername] = useState('');
   const [phonenumber, setPhonenumber] = useState('');
 
   const handleregister = async (e) => {
       e.preventDefault();
        if(email == "" || password == "" || username == "" || phonenumber == ""){
         toast("plz fill all")
        }
      
         await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
           const user = userCredential.user;
           const initialcartvalue = 0;
           addDoc(collection(db, "users"), {
               email: email,
               password: password,
               username: username,
               phonenumber: phonenumber,
               // address: address,
               cart: initialcartvalue,
               timestamp: new Date().getTime(),
               uid: user.uid,
               roll: "user",
           }).then(()=>{
               setSuccessmsg("Registered Successfully");
               toast("Registered Successfully")
               setEmail('');
               setPassword('');
               setUsername('');
               setPhonenumber('');
               // setAddress('');
               setTimeout(() => {
                setErrormsg("");
                   setSuccessmsg("");
                   window.location.href = '/login'
                }, 2000);
           })
           .catch((error)=>{ setErrormsg(error.message)})
        })
        .catch((error)=>{ 
           if(error.message == 'Firebase: Error (auth/invalid-email).')
           {
               setErrormsg("Invalid Email");
               setTimeout(() => {
                setErrormsg("");
               }, 1000);
           }
           if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
               setErrormsg("Email already in use");
               setTimeout(() => {
                setErrormsg("");
               }, 1000);
           }
       })
      
      
       
     };


   ////////////////////// Register function End ///////////////////////////////////


   ////////////////////// Login Function  ///////////////////////////////////

    const handleLogin = async (e) => {
      e.preventDefault();
       if(email == "" || password == "" ){
        toast("plz fill all")
       }
       try {
        const userr = await signInWithEmailAndPassword(auth, email, password);
        // const users = localStorage.setItem('userr', JSON.stringify(userr));
        setSuccessmsg('Logged in seccessfully you will be redirected to ');
        toast("Logged in seccessfully you will be redirected to")
        // console.log(userr)
        setEmail('');
        setErrormsg('')
        setPassword('');
        setTimeout(() => {
            setErrormsg('')
            setSuccessmsg('')
            window.location.href = '/'
        }, 1000);
       } catch (error) {
        if(error.message == 'Firebase: Error (auth/invalid-credential).')
        {
            setErrormsg("Incorrect email and password");
            toast("Incorrect email and password")
            setTimeout(() => {
              setErrormsg("")
            }, 1000);
        }
        if(error.message == 'Firebase: Error (auth/user-not-found).'){
            setErrormsg("Email not found");
        }
        if(error.message == 'Firebase: Error (auth/wrong-password).'){
            setErrormsg("Wrong Password");
        }

       }
     
    };
   ////////////////////// Login Function End  ///////////////////////////////////

   
   ////////////////////// Login hai ya nhi check  ///////////////////////////////////
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
     ////////////////////// Login hai ya nhi check end  ///////////////////////////////////


     const [products, setProducts] = useState([]);
 
     useEffect(() => {
         const getProducts = async () => {
           try {
             const productsArray = [];
             const querySnapshot = await getDocs(collection(db, "products"));
             querySnapshot.forEach((doc) => {
               productsArray.push({ ...doc.data(), id: doc.id });
             });
             setProducts(productsArray);
             // console.log(productsArray)
             // console.log(filterByCategory);
           } catch (error) {
             console.error("Error fetching products:", error.message);
           }
         };
         getProducts();
   
   
       }, []);




  return (
    <MyContext.Provider value={{
    setEmail, email, setPassword, password, setErrormsg, errormsg, setSuccessmsg, successmsg, handleLogin,
    setUsername, username, setPhonenumber, phonenumber,  handleregister, GetCurrentUser, loggeduser,
    products, setProducts,
    }}>
    {props.children}
    </MyContext.Provider>
  )
}

export default MyState