import Product from "./product/Product"
import './Products.css'

function Products() {
  return (
    <>
    <div className="container gx-0 py-5">
        <h6 className="Product_h2 pb-2" >Popular Products</h6>
        <div className="row gx-0">
            <div className="col-md-12">
                <div className="Products_main">
                   <Product/>
                   <Product/>
                   <Product/>
                   <Product/>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Products