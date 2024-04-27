import './OrderMtho.css'
import FreeShiPhing from './freesgiping.png'
import Secure from './securepayment.png'
import Support from './support.png'

function OrderMethod() {
  return (
    <>
    {/* <div className="container order-main-cont gx-0 py-5">
        <div className="order-card-main-div">
            <div className="ordermethod-img-div">
            <img src={FreeShiPhing} alt=""  />            </div>
            <div className="ordermethod-heading-div  my-2">
                <h3>Free shiping</h3>
            </div>
            <div className="ordermethod-textt-div">
                <p className='text-center'>Our free shiping policy applies to all order, regardiess of order value or destinatin</p>
            </div>
        </div>

        <div className="order-card-main-div">
            <div className="ordermethod-img-div">
            <img src={Secure} alt=""  />            </div>
            <div className="ordermethod-heading-div  my-2">
                <h3>Secure Payment</h3>
            </div>
            <div className="ordermethod-textt-div">
                <p className='text-center'>Your payment is always safe, secure, and protected at all times</p>
            </div>
        </div>

        <div className="order-card-main-div">
            <div className="ordermethod-img-div">
                <img src={Support} alt=""  />
            </div>
            <div className="ordermethod-heading-div  my-2">
                <h3>Support Online 24/7</h3>
            </div>
            <div className="ordermethod-textt-div">
                <p className='text-center'>We are available 24/7 to assist you with any question or issues you may have</p>
            </div>
        </div>
    </div> */}
    <div className="Order ">
        <div className="container gx-0 py-5">
            <div className="row gx-0 align-items-center">
                <div className="col-md-4">
                    <div className="order_col1">
                        <img src={FreeShiPhing} alt="" className='img-fluid' />
                        <h6 className='py-2'>Free Shipping</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis tempore iure quas, aliquid deserunt saepe.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="order_col1">
                        <img src={Secure} alt="" className='img-fluid' />
                        <h6 className='py-2'>Secure Payment</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis tempore iure quas, aliquid deserunt saepe.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="order_col1">
                        <img src={Support} alt="" className='img-fluid' />
                        <h6 className='py-2'>Support Online</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis tempore iure quas, aliquid deserunt saepe.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default OrderMethod