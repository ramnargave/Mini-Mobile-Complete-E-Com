import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/Firebase";


function SellerLogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successmsg, setSuccessmsg] = useState('');
    const [errormsg, setErrormsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
         if(email == "" || password == "" ){
          return alert("plz fill all")
         }
         try {
          const userr = await signInWithEmailAndPassword(auth, email, password);
          // const users = localStorage.setItem('userr', JSON.stringify(userr));
          setSuccessmsg('Logged in seccessfully you will be redirected to ');
        //   console.log(userr)
          setEmail('');
          setErrormsg('')
          setPassword('');
          setTimeout(() => {
              setErrormsg('')
              setSuccessmsg('')
              navigate('/')
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
  return (
    <>
    <div>
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
      {errormsg && <div className="errormsg">{errormsg}</div> } 
        {successmsg && <div className="successmsg">{successmsg}</div>}
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>Dont Have Account <Link to={'/sellerregistion'} >Register</Link></p>
      </form>
    </div>
    </div>
    </>
  )
}

export default SellerLogin