// import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import { db } from "../firebase/Firebase";
import AllProducts from "../products/Allproducts/AllProducts";
import MyContext from "../myContext/MyContext";


function FilterByCategory() {
    const { category } = useParams();
    const [filterByCategory, setFilterByCategory] = useState([]);
    const context = useContext(MyContext);
    const { products } = context;



      useEffect(() => {
    
        const filterCat = () => {
          const data = products.filter((p)=>p.producttype.toLowerCase().includes(category.toLowerCase()));
          console.log(data)
          setFilterByCategory(data)
          console.log(data)
        }
    
        filterCat();
      }, [category, products])
      

  return (
    <>
    <AllProducts products={filterByCategory} />
    </>
  )
}

export default FilterByCategory