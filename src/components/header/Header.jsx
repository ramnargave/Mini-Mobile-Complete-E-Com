import "./Nav.css";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useState } from "react";
import NavLogo from './NavLogo.png'
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate,  } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/Firebase";
import MyContext from "../myContext/MyContext";

function Header() {
 const navigate = useNavigate();

 const context = useContext(MyContext);
 const { loggeduser } = context;


  // if(loggeduser){console.log(loggeduser[0])}

  // end 

  const [searchshow, setSearchshow] = useState(false);
  const [menushow, setMenushow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // const userr = JSON.parse(localStorage.getItem('userr'));





  const logoutt = () => {
    // localStorage.clear('userr');
    auth.signOut().then(() => {
      navigate('/login')
      setProfile(false)
    })
  }
 
  const HandleScroll = () => {
    if (window.scrollY > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
    // console.log(scrolled);
  };

  useEffect(() => {
   window.addEventListener('scroll', HandleScroll);
  }, [])
  

  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };
  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   Handle the search term...
  //   console.log(`Searching for ${searchTerm}`);
  // };
  const searchshowh = () => {
    setSearchshow(!searchshow);
    setMenushow(false);
    setProfile(false);
  };
  const menushowh = () => {
    setMenushow(!menushow);
    setSearchshow(false);
    setProfile(false);
  };
  const profileshow = () => {
    setProfile(!profile);
    setMenushow(false);
    setSearchshow(false);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    navigate(`/search/${searchTerm.toLowerCase()}`)
    setSearchshow(false);
    setSearchTerm("")
  }

  // cartdeta ki lenth 
  const [cartdata, setcartdata] = useState([]);
    if (loggeduser) {
        const getcartdata = async () => {
            const cartArray = [];
            const path = `cart-${loggeduser[0].uid}`
            // console.log(path)
            getDocs(collection(db, path)).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    cartArray.push({ ...doc.data(), id: doc.id })
                });
                setcartdata(cartArray)
                // console.log('done')
            }).catch('Error error error')

        }
        getcartdata()
    }


  return (
    <>
      <div className={`navbar-main-main-container ${scrolled ? "white-nav" : ""}`}>
        <div className="navbar-left-div">
          <div className="navbar-menu-icon-div">
            { menushow ?  <CloseIcon onClick={menushowh} /> : <MenuIcon onClick={menushowh} /> }
          </div>
          <Link to={'/'} className="navbar-logo-div">
            <img src={NavLogo} alt="" />
          </Link>
        </div>
        <div className="navbar-mid-div">
          <Link to={'/'} className="navbar-mid-div-contant">Home</Link>
          <Link to={'/allproducts'} className="navbar-mid-div-contant">All Products</Link>
          <Link to={'/about'} className="navbar-mid-div-contant">Abouts</Link>
          <div className="navbar-mid-div-contant">Service</div>
          <Link to={'/contact'} className="navbar-mid-div-contant">Contact</Link>
          { loggeduser && loggeduser[0].roll == "seller" ? <Link to={'/sellerdashboard'} className="navbar-mid-div-contant">Dashboard</Link> :  <Link to={'/sellerlogin'} className="navbar-mid-div-contant">Sell</Link> }
          { loggeduser && loggeduser[0].roll == "admin" ? <Link to={'/admindashboard'} className="navbar-mid-div-contant">AdminDashboard</Link> : "" }
        </div>
        <div className="navbar-right-div">
          <div className="navbar-icons-div">
            <div className="navbar-serach-icon-div" onClick={searchshowh}>
              <SearchIcon />
            </div>
      
          {loggeduser ? <Link className="Person-div" onClick={profileshow}   >
           <PersonIcon/> <div>{loggeduser[0].username}</div> 
            </Link> : <Link to={'/login'} className="Person-div"  >
           <PersonIcon/> <div>Login</div> 
            </Link>  } 

           { loggeduser ?  <button type="button" className="btn btn-primary position-relative">
              <Link to={'/cart'} className="carticon-div">
                <ShoppingCartIcon />
              </Link>
             <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                 {cartdata.length}
               </span>  
            </button> : <button type="button" className="btn btn-primary position-relative">
              <Link to={'/login'} className="carticon-div">
                <ShoppingCartIcon />
              </Link>
             <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                 0
               </span>  
            </button> }

          </div>
        </div>
      </div>

      {/* search slider  */}
      <div
        className={
          searchshow
            ? "navbar-pop-slider-main-div-show"
            : "navbar-pop-slider-main-div-hide"
        }
      >
        <div className="pop-search-bar-mainn-main-div">
          <form onSubmit={handleSubmit} className="pop-search-bar-div">
            <input
              type="text"
              placeholder="Mobile"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
          </form>
          <div className="pop-search-bar-div-icon">
            <SearchIcon onClick={handleSubmit} />
          </div>
          <div
            className="pop-search-bar-x-div"
            onClick={() => setSearchshow(false)}
          >
            X
          </div>
        </div>
        <div className="pop-search-everyone-search">
          <div className="everyyone-is-searching">
            <p>Everyone is searching</p>
          </div>
          <div className="pop-search-last-div">
            <div
              className="pop-search-last-div-likha"
              onClick={() => setSearchTerm("Mobile")}
            >
              Mobile
            </div>
            <div
              className="pop-search-last-div-likha"
              onClick={() => setSearchTerm("Headphone")}
            >
              Headphone
            </div>
            <div
              className="pop-search-last-div-likha"
              onClick={() => setSearchTerm("Watch")}
            >
              Watch
            </div>
            <div
              className="pop-search-last-div-likha"
              onClick={() => setSearchTerm("Laptops")}
            >
              Laptops
            </div>
            <div
              className="pop-search-last-div-likha"
              onClick={() => setSearchTerm("Tv")}
            >
              Tv
            </div>
          </div>
        </div>
      </div>


      {/* menu slider  */}
      <div className={menushow ? "menushow" : "menushow-hide"}>
        <div className="menu-small-div">
          <Link to={'/'} className="navbar-mid-div-contant">Home</Link>
        </div>
        <div className="menu-small-div">
          <Link to={'/allproducts'} className="navbar-mid-div-contant">All Products</Link>
        </div>
        <div className="menu-small-div">
          <Link to={'/about'} className="navbar-mid-div-contant">Abouts</Link>
        </div>
        <div className="menu-small-div">
          <div className="navbar-mid-div-contant">Service</div>
        </div>
        <div className="menu-small-div">
          <Link to={'/contact'} className="navbar-mid-div-contant">Contact</Link>
        </div>
        <div className="menu-small-div">{ loggeduser && loggeduser[0].roll == "seller" ? <Link to={'/sellerdashboard'} className="navbar-mid-div-contant">Dashboard</Link> :  <Link to={'/sellerlogin'} className="navbar-mid-div-contant">Sell</Link> }</div>
<div className="menu-small-div">{ loggeduser && loggeduser[0].roll == "admin" ? <Link to={'/admindashboard'} className="navbar-mid-div-contant">AdminDashboard</Link> : "" }</div>
      </div>

      {/* profile Slider  */}

      <div className={profile ? "profile-slider-container" : "profile-slider-container-hide"}>
        <Link to={'/myorder'} onClick={()=> setProfile(false)}  className="profile-slider-small-div">
          My Order
        </Link>
        <Link to={'/userprofile'} onClick={()=> setProfile(false)} className="profile-slider-small-div">
          My Profile
        </Link>
        <div onClick={logoutt} className="profile-slider-small-div">
          Logout
        </div>
      </div>
    </>
  );
}

export default Header;
