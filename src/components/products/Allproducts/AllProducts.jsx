import './Allproducts.css';
import ReactStars from 'react-stars';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../firebase/Firebase';

function AllProducts({products}) {
 

  return (
    <div className="allproducts-containner">
      {products.map((p) => (
        <div key={p.id} className="allproducts-card">
          <div className="allproducts-img-div">
            <img src={p.productimage} alt="" />
          </div>
          <div className="product-favroticon"><FavoriteIcon /></div>
          <Link to={`/singleproduct/${p.id}`} className="allproducts-title-div">
  <p>{p.producttitle.length > 50 ? p.producttitle.substring(0, 50) + '...' : p.producttitle}</p>
</Link>
          <div className="MRP">MRP. <del>{p.discountprice}</del></div>
          <div className="allproducts-price-div">Discount Price {p.discountprice}</div>
          
          <div className="allproducts-star-div"><ReactStars value={p.rating} size={30} edit={false} /></div>
          <Link to={`/singleproduct/${p.id}`} className="allproducts-addtocard-div"><ShoppingCartIcon /> More Info</Link>
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
