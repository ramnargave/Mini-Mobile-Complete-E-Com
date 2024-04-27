import Arrivals from '../Arrivals/Arrivals'
import Iphone from './iphone.png'
import './NewArrival.css'

function NewArrivals() {
  return (
    <>
    <div className="container gx-0 py-5">
        <h2 className='pb-3'>New Arrivals</h2>
        <div className="row align-items-center">
            <div className="col-md-6">
                <div className="NewArrival_col1">
                    <h3 >New Iphone 15 Pro Max</h3>
                    <div className="banner_btn pt-3">
                        <button className="main_btn">Shop Now</button>
                    </div>
                    <img src={Iphone} alt="" className='img-fluid' />
                </div>
            </div>

            <div className="col-md-6">
                <div className="NewArrival_col2">
                <Arrivals/>
                <Arrivals/>
                <Arrivals/>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default NewArrivals