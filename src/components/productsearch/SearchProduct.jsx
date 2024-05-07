import { useParams } from 'react-router-dom';
import './SearchProduc.css'
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
// import ReactStars from 'react-stars';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import AllProducts from '../products/Allproducts/AllProducts';



function SearchProduct() {
  
    const {term} = useParams();
    const [products, setProducts] = useState([]);
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
      const getProducts = async () => {
        try {
          const productsArray = [];
          const querySnapshot = await getDocs(collection(db, "products"));
          querySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
          });
          setProducts(productsArray);
        } catch (error) {
          console.error("Error fetching products:", error.message);
        }
      };
      getProducts();


    }, []);

    useEffect(() => {
      const filterData = () => {
        const termLower = term.toLowerCase();
        const data = products.filter((p) => {
          const productTitleLower = p.producttitle.toLowerCase();
          const productTypeLower = p.producttype.toLowerCase();
    
          // Check if term is found in product title or type
          const matchesTerm = productTitleLower.includes(termLower) || productTypeLower.includes(termLower);
    
          if (!matchesTerm) {
            // If term is not found in title or type, filter by price
            const termPrice = parseFloat(termLower);
            if (!isNaN(termPrice)) {
              return parseFloat(p.discountprice) >= termPrice;
            }
          }
    
          return matchesTerm;
        });
    
        console.log(data);
        setFilterData(data);
      };
    
      filterData();
    }, [term, products]);
    
    
    



  return (
    <>
     <AllProducts  products={filterData} /> 
   
    
    </>
  )
}

export default SearchProduct