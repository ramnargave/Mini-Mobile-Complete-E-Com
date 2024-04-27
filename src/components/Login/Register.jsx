
import { useContext } from 'react';
import './LoginRegister.css'
import MyContext from '../myContext/MyContext';



function Register() {
  const context = useContext(MyContext);
  const {   setEmail, email, setPassword, password,   setUsername, username, setPhonenumber, phonenumber, setAddressLine1, addressLine1, setPincode, pincode, setCity, city, setState, state, handleregister,
    setErrormsg, errormsg, setSuccessmsg, successmsg, } = context;
  return (
    <>
    <div className="login-container">
      <form onSubmit={handleregister} className="login-form">
      {errormsg && <div className="errormsg">{errormsg}</div> } 
      {successmsg && <div className="successmsg">{successmsg}</div>}
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="phonenumber"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
         <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
         <input
          type="text"
          placeholder="City/Distric/Town"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
         <input
          type="number"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />
          <input
          type="text"
          placeholder="Addressline"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
    </>
  )
}

export default Register