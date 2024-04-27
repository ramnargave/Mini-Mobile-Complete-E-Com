import Products from "../products/Products"
import NewArrivals from "../products/product/NewArrivals"
import Baner from "./baner/Baner"
import BestSells from "./bestsells/BestSells"
import Category from "./category/Category"
import OrderMethod from "./orderMethod/OrderMethod"


function Home() {
  return (
    <>
    <div className="Home-main-main-main-cont">
    <Baner/>
    <Category/>
    <Products/>
    <NewArrivals/>
    <BestSells/>
    <OrderMethod/>
    </div>
     
    </>
  )
}

export default Home