import { useState } from 'react';
import './SellerRegistion.css'
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/Firebase';

function SellerRegistion() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [companyName, setCompanyName] = useState("")
    const [pincode, setPincode] = useState("")
    const [addressLine1, setAddressLine1] = useState("")
    const [addressLine2, setAddressLine2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [gst, setGst] = useState("")
    const [pan, setPan] = useState("")
    const [successmsg, setSuccessmsg] = useState('');
    const [errormsg, setErrormsg] = useState('');
  
    
    const handleLogin = async (e) => {
        e.preventDefault();
         if(email == "" || password == "" || username == "" || phonenumber == "" || addressLine1 == "" || city == "" || state == "" || gst == "" || pan == "" ){
          return alert("plz fill all")
         }
       
          await createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            const user = userCredential.user;
            addDoc(collection(db, "users"), {
                email: email,
                password: password,
                username: username,
                phonenumber: phonenumber,
                companyName: companyName,
                pincode: pincode,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                state: state,
                city: city,
                gst: gst,
                pan: pan,
                uid: user.uid,
                timestamp: new Date().getTime(),
                roll: "seller"
            }).then(()=>{
                setSuccessmsg("Registered Successfully");
                setEmail('');
                setPassword('');
                setUsername('');
                setPhonenumber('');
                setAddressLine1('');
                setAddressLine2('');
                setPincode("");
                setCompanyName("")
                setCity('');
                setState('');
                setGst('');
                setPan('');
                setErrormsg("");
                setTimeout(() => {
                    setSuccessmsg("");
                    navigate('/sellerlogin')
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
  return (
    <>
    <div>
    <div className="registration-container">
    {errormsg && <div className="errormsg">{errormsg}</div> } 
      {successmsg && <div className="successmsg">{successmsg}</div>}
      <h2>Registration Form</h2>
      <form className="registration-form" onSubmit={handleLogin}>
        <div className="Rform-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}  required />
        </div>

        <div className="Rform-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}  required />
        </div>

        <div className="Rform-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="Rform-group">
          <label htmlFor="companyName">Company/Business Name:</label>
          <input type="text" id="companyName" name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>

        <div className="Rform-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input type="tel" id="mobileNumber" name="mobileNumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} required />
        </div>

        <div className="Rform-group">
          <label htmlFor="pincode">Pincode:</label>
          <input type="text" id="pincode" name="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
        </div>

        <div className="Rform-group">
          <label htmlFor="addressLine1">Address Line 1:</label>
          <input type="text" id="addressLine1" name="addressLine1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required />
        </div>

        <div className="Rform-group">
          <label htmlFor="addressLine2">Address Line 2:</label>
          <input type="text" id="addressLine2" name="addressLine2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
        </div>

        <div className="Rform-group">
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>

        <div className="Rform-group">
          <label htmlFor="state">State:</label>
          <input type="text" id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} required />
        </div>

        <div className="Rform-group">
          <label htmlFor="gst">GST:</label>
          <input type="text" id="gst" name="gst" value={gst} onChange={(e) => setGst(e.target.value)} />
        </div>

        <div className="Rform-group">
          <label htmlFor="pan">PAN:</label>
          <input type="text" id="pan" name="pan" value={pan} onChange={(e) => setPan(e.target.value)} />
        </div>

        <button className='RBUTTON' type="submit">Submit</button>
      </form>
    </div>
    </div>
    </>
  )
}

export default SellerRegistion