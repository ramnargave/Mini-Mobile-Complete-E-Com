
import { useContext } from 'react';
import './LoginRegister.css'
import MyContext from '../myContext/MyContext';



function Register() {
  const context = useContext(MyContext);
  const {   setEmail, email, setPassword, password,   setUsername, username, setPhonenumber, phonenumber,  handleregister,
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




        <button type="submit">Signup</button>
      </form>
    </div>
    </>
  )
}

export default Register