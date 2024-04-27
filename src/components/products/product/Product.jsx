
import ReactStars from 'react-stars'

function Product() {
  return (
    <>
    <div className="product_maim">
        <div className="col">
            <div className="card h-100">
                <div className="card_head">
                    <img src="https://external.webstorage.gr/Product-Images/1421066/iphone11-black-1000-1421066.jpg" alt="" className='img-fluid'/>
                </div>
                <div className="card-body">
                    <h4 className='Product_name py-2'>HeadPhones</h4>
                    <div className="icons pb-2">
                     <ReactStars   value={3} size={18} edit={false} />
                    </div>
                    <p className='Product_price'>$ 40</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Product