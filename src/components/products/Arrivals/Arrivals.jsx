import ReactStars from 'react-stars'
import '../product/NewArrival.css'

function Arrivals() {
  return (
    <>
     <div className="container gx-0 Arrivals  new-arrival-side-small ">
    <div className="row gx-0 align-items-center Arrivals_main ">
        <div className="col-4">
            <div className="Arrivals_col1 text-center">
                <img src="https://th.bing.com/th/id/OIP.to_TlBUYvK-3Jokwki905AHaHa?rs=1&pid=ImgDetMain" alt="" className="img-fluid" /></div>
        </div>
        <div className="col-8 ">
            <div className="Arrivals_col2">
            <h4 className='Product_name py-2'>HeadPhones</h4>
                    <div className="icons pb-2">
                     <ReactStars   value={3} size={18} edit={false} />
                    </div>
                    <p className='Product_price'>$ 40</p>
            </div>
        </div>
      {/********************************************* */}
      {/********************************************* */}
      {/********************************************* */}
      {/********************************************* */}
    </div>
   </div>
    </>
  )
}

export default Arrivals