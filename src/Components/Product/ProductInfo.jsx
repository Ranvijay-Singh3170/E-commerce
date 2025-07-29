import React from 'react'

const ProductInfo = ({product}) => {
    console.log("prodict info", product)
  return (
    <div>
        <div>
            <p className='text-sm font-medium text-gray-500'>{product.category}</p>
            <h1 className='text-4xl font-bold text-black'>{product.title}</h1>
            <div className='flex gap-2 items-center'>
                <h2 className='text-xl font-bold line-through text-gray-500'>₹{product.price}</h2>
                <h2 className='text-3xl font-bold'>₹{(product.price - 20).toFixed(2)}</h2>
            </div>
            <p className='text-gray-600 line-clamp-2'>{product.description}</p>
        </div>
        <div className='flex gap-5'>
            <button className='border-2 border-black px-8 py-2 rounded-xl cursor-pointer font-bold'>Buy Now</button>
            <button className='border-2 border-yellow-500 bg-yellow-500 px-8 py-2 rounded-xl cursor-pointer font-bold'>Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductInfo