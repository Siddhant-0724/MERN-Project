import React from 'react'
import './Productlist.css'
import Btnrender from './Btnrender'
import './Productlist.css'
const Productlist = ({ product,isAdmin}) => {
    return (
        <div className='product-card'>
            {
                isAdmin && <input type='checkbox' checked={product.checked} />
            }
            <img src={product.images.url} alt='' />
            <div className='product-box'>
                <h2 title={product.title}>{product.title}</h2>
                <span>Rs{product.price}</span>
                <p>{product.description}</p>
            </div>
            <Btnrender product={product}/>
        </div>
    )
}

export default Productlist