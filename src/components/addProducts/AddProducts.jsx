import { useState, useEffect } from "react";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "./AddProducts.css";
import { auth, db, storage } from "../firebase/Firebase";

const Addproducts = () => {
  const [producttitle, setProductTitle] = useState("");
  const [producttype, setProductType] = useState("");
  const [keyspecs, setKeyspecs] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [customersupport, setCustomersupport] = useState("");
  const [mrp, setMRP] = useState("");
  const [discountprice, setDiscountPrice] = useState("");
  const [warranty, setWarranty] = useState("");
  const [productimage, setProductImage] = useState("");
  const [rating, setRating] = useState("");
  // const [ramstorage, setRamstorage] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useNavigate();
  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

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

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];

  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    // console.log(producttype.toUpperCase())

    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setProductImage(selectedFile);
        setImageError("");
      } else {
        setProductImage(null);
        setImageError("please select a valid image file type(png or jpg)");
      }
    } else {
      setImageError("please select your file");
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if(producttitle == "" || productimage == "" || discountprice == "" || producttype == "" || customersupport == "" || stock == ""){
      return alert("plz fill all")
     }
    const storageRef = ref(
      storage,
      `product-images${producttype.toUpperCase()}/${Date.now()}`
    );
    // console.log(storageRef._location.path)
    uploadBytes(storageRef, productimage)
      .then(() => {
        getDownloadURL(storageRef).then((url) => {
          addDoc(collection(db, "products"), {
            producttitle,
            producttype,
            description,
            brand,
            customersupport,
            mrp,
            discountprice,
            warranty,
            rating,
            // ramstorage,
            stock,
            productimage: url,
            keyspecs: keyspecs,
            uid: loggeduser[0].uid,
            shopname: loggeduser[0].companyName,
            email: loggeduser[0].email,
            timestamp: new Date().getTime(),
          })
            .then(() => {
              setSuccessMsg("Product added successfully");
              setProductTitle("");
              setProductType("");
              setDescription("");
              setBrand("");
              setCustomersupport("");
              setMRP("");
              setWarranty("");
              setKeyspecs("");
              setProductImage("");
              setStock("");
              setTimeout(() => {
                setSuccessMsg("");
                navigate("/");
              }, 1000);
            })
            .catch((error) => {
              setUploadError(error.message);
            });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="addproducts-main-container" >
      {loggeduser && loggeduser[0].roll == "seller" ||loggeduser && loggeduser[0].roll == "admin"  ? (
        <div className="addprod-container">
          <form onSubmit={handleAddProduct} className="addprod-form">
            <p>Add Data</p>
            {successMsg && (
              <>
                <div className="success-msg">{successMsg}</div>
              </>
            )}
            {uploadError && (
              <>
                <div className="error-msg">{uploadError}</div>
              </>
            )}

            <label>Product Title</label>
            <input
              onChange={(e) => setProductTitle(e.target.value)}
              type="text"
              placeholder="Product Title"
            />
            <label>Product Type</label>
            <select
              value={producttype}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option >Select Product Type</option>
              <option >Mobile</option>
              <option >Camera</option>
              <option >Headphone</option>
              <option >Ipad</option>
              <option >TV</option>
              <option >Laptop</option>
            </select>

            <label>Brand Name </label>
            <input
              onChange={(e) => setBrand(e.target.value.toUpperCase())}
              type="text"
              placeholder="Brand Name"
            />
            <label>Rating</label>
            <input
              onChange={(e) => setRating(e.target.value)}
              type="text"
              placeholder="Rating"
            />
            <label>warranty</label>
            <select
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
            >
              <option value="">Select Product Type</option>
              <option >3 Month</option>
              <option >6 Month</option>
              <option >1 Year</option>
              <option > No Warranty</option>
            </select>
            <label>Image</label>
            <input onChange={handleProductImg} type="file" />
            {imageError && (
              <>
                <div className="error-msg">{imageError}</div>
              </>
            )}
            <label>Key Specifications</label>
            <textarea
              onChange={(e) => setKeyspecs(e.target.value)}
              placeholder="Enter some key specifications"
            ></textarea>

            <label>Description</label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your Product in breif"
            ></textarea>
             
            <label>Stock</label>
            <input
              onChange={(e) => setStock(e.target.value)}
              type="text"
              placeholder="Ram Sotrage"
            />
            <label>MRP</label>
            <input
              onChange={(e) => setMRP(e.target.value)}
              type="text"
              placeholder="Enter Price without tax"
            />
            <label>Discount Price</label>
            <input
              onChange={(e) => setDiscountPrice(e.target.value)}
              type="text"
              placeholder="Enter Price without tax"
            />
            <label>Customer Support</label>
            <input
              onChange={(e) => setCustomersupport(e.target.value)}
              type="text"
              placeholder="Customer Support Email, Phone or address"
            />

            <button type="submit">Add</button>
          </form>
        </div>
      ) : (
        <div>You don't have access to add products</div>
      )}
    </div>
  );
};

export default Addproducts;
