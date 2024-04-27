import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import MyContext from "./MyContext"
import { auth, db } from "../firebase/Firebase";
import { useState } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";



function MyState(props) {

   ////////////////////// Register function  ///////////////////////////////////

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [successmsg, setSuccessmsg] = useState('');
   const [errormsg, setErrormsg] = useState('');
   const [username, setUsername] = useState('');
   const [phonenumber, setPhonenumber] = useState('');
   // const [address, setAddress] = useState('');
   const [addressLine1, setAddressLine1] = useState("")
   const [city, setCity] = useState("")
   const [state, setState] = useState("")
   const [pincode, setPincode] = useState("")
 
   const handleregister = async (e) => {
       e.preventDefault();
        if(email == "" || password == "" || username == "" || phonenumber == "" || addressLine1 == "" || city == "" || state == "" || pincode == "" ){
         return alert("plz fill all")
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
               addressLine1: addressLine1,
               pincode: pincode,
               state: state,
               city: city,
               timestamp: new Date().getTime(),
               uid: user.uid,
               roll: "user",
           }).then(()=>{
               setSuccessmsg("Registered Successfully");
               setEmail('');
               setPassword('');
               setUsername('');
               setPhonenumber('');
               // setAddress('');
               setAddressLine1("")
               setPincode("");
               setErrormsg("");
               setCity('');
               setState('');
               setTimeout(() => {
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
           }
           if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
               setErrormsg("Email already in use");
           }
       })
      
      
       
     };


   ////////////////////// Register function End ///////////////////////////////////


   ////////////////////// Login Function  ///////////////////////////////////

    const handleLogin = async (e) => {
      e.preventDefault();
       if(email == "" || password == "" ){
        return alert("plz fill all")
       }
       try {
        const userr = await signInWithEmailAndPassword(auth, email, password);
        // const users = localStorage.setItem('userr', JSON.stringify(userr));
        setSuccessmsg('Logged in seccessfully you will be redirected to ');
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




  return (
    <MyContext.Provider value={{
    setEmail, email, setPassword, password, setErrormsg, errormsg, setSuccessmsg, successmsg, handleLogin,
    setUsername, username, setPhonenumber, phonenumber, setAddressLine1, addressLine1, setPincode, pincode, setCity, city, setState, state, handleregister, GetCurrentUser, loggeduser,
    }}>
    {props.children}
    </MyContext.Provider>
  )
}

export default MyState