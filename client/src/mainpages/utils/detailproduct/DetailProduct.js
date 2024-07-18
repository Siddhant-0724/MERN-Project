import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import './DetailProduct.css'
export default function DetailProduct() {

    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.ProductAPI.products
    const [detailproduct, setDetailproduct] = useState([])


    useEffect(() => {
        if (params) {
            products.forEach(product => {
                if (product._id === params.id){
                    setDetailproduct(product)   
                }
            })
        }
    }, [params,products])
    if(detailproduct.length===0) return null
    console.log(detailproduct)
    return (
        <div className='detail'>
      <img src={detailproduct.images.url} alt=''/>
      <div className='box-detail'>
        <div className='row'>
            <h2>{detailproduct.title}</h2>
        </div>
        <span>Rs {detailproduct.price}</span> 
        <p>{detailproduct.description}</p> 
        <p>{detailproduct.content}</p>
        <p>Sold:{detailproduct.sold}</p>
        <Link to='/cart' className='cart'>Buy Now</Link>
      </div>
    </div>
    )
}
