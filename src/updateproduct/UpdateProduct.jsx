// import React, { useContext } from 'react'

function UpdateProduct() {
   
  return (
    <>
    <div className="update-main-cont" >
            <div className=' flex justify-center items-center'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
                    </div>
                    <div>
                        <input type="text"
                            // value={products.title}
                            // onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="text"
                            // value={products.price}
                            // onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='type'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Type'
                        />
                    </div>
                    <div>
                        <input type="text"
                            // value={products.price}
                            // onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='Brand'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Brand'
                        />
                    </div>
                    <div>
                        <input type="text"
                            // value={products.price}
                            // onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='Rating'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Rating'
                        />
                    </div>
                    <div>
                        <input type="text"
                            // value={products.price}
                            // onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='Warranty'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Warranty'
                        />
                    </div>
                    <div>
                        <input type="text"
                            // value={products.price}
                            // onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='Image'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Image'
                        />
                    </div>
                    <div>
                        <input type="text"
                            // value={products.price}
                            // onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='Key Specification'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Key Specification'
                        />
                    </div>
                    <div>
                        <input type="text"
                            // value={products.imageUrl}
                            // onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                            name='Description'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Description'
                        />
                    </div>
                    <div>
                        <input type="text"
                            // value={}
                            // onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            name='Ram Storage'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Ram Storage'
                        />
                    </div>
                    <div>
                        <input type="text"
                            // value={}
                            // onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            name='MRP'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='MRP'
                        />
                    </div>
                    <div>
                        <input type="text"
                            // value={}
                            // onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            name='Discount Price'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Discount Price'
                        />
                    </div>
                    <div>
                        <input type="text"
                            // value={}
                            // onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            name='Customer Support'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Customer Support'
                        />
                    </div>
                    <div>
                        <textarea cols="30" rows="10" name='title'
                        //  value={products.description}
                        //  onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product desc'>

                        </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                        // onClick={updateProduct}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Update Product
                        </button>
                    </div>
                 
                </div>
            </div>
        </div>
    </>
  )
}

export default UpdateProduct