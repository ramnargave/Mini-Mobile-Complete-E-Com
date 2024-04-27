import  { useEffect, useState } from 'react';
import './UserProfile.css'; // Import the CSS file
import { auth, db } from '../firebase/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function UserProfile() {
  const GetCurrentUser = () =>{
    const [user, setUser] = useState('')
    const usersCollectionRef = collection(db, 'users')

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
    // if(loggeduser){console.log(loggeduser[0])}
    
  return (
    <>
{ loggeduser ? <> <div className="user-profile">
        <h1>User Profile</h1>
        <div className="user-detail">
          <label>Name:</label>
          <span>{loggeduser[0].username}</span>
        </div>
        <div className="user-detail">
          <label>Mobile Number:</label>
          <span className="mobile">{loggeduser[0].phonenumber}</span>
        </div>
        <div className="user-detail">
          <label>Email:</label>
          <span className="email">{loggeduser[0].email}</span>
        </div>
        <div className="user-detail">
          <label>Address:</label>
          <span>{loggeduser[0].address}</span>
        </div>
      </div> </> : <> <div className="About">
        <div className="container gx-0">
            <div className="row gx-0">
                <div className="col-12">
                    <div className="About_col">
                        <h1 className="main_head">First Login</h1>
                    </div>
                </div>
            </div>
        </div>
    </div> </>}
    </>
  )
}

export default UserProfile