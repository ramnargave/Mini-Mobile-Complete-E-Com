import { useContext } from 'react';
import './LoginRegister.css'
import { Link,  } from 'react-router-dom';
import MyContext from '../myContext/MyContext';

function Login() {
    const context = useContext(MyContext);
    const {  setEmail, email, setPassword, password, setErrormsg, errormsg, setSuccessmsg, successmsg, handleLogin } = context;
  return (
    <>
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
        <p>Dont Have Account <Link to={'/signup'} >Register</Link></p>
      </form>
    </div>
    </>
  )
}

export default Login