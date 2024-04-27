import Heaphon from './headphone.png'
// import ReactStars from 'react-stars'
import './Discount.css'

function BestSells() {
  return (
    <>
    <div className="container Discount px-5 my-5 ">
        <div className="row align-items-center">
            <div className="col-md-6">
                <div className="Discount_col1 pt-md-4">
                    {/* <h6 className='main_label pb-3'>
                    <ReactStars   value={3} size={18} edit={false} />
                    </h6> */}
                    <h2>Micropack MHP Headphone Black</h2>
                    <p className='py-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. accusantium velifugit ex illo rerum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, incidunt!</p>
                    <div className="banner_btns">
                        <button className='main_btn'>Shop Now</button>
                    </div>
                </div>
            </div>
            <div className="col-md-5">
                <img src={Heaphon} alt="" className='img-fluid' />
            </div>
        </div>
    </div>
    </>
  )
}

export default BestSells