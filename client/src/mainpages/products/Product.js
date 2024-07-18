import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import Productlist from '../utils/Productlist/Productlist'
import './Product.css'
const Product = () => {
  const state = useContext(GlobalState)
  const [products] = state.ProductAPI.products
  const [isAdmin] = state.UserApi.isAdmin 

  return (
    <div className='product'>
      {products.map(product => {
        return <Productlist key={product._id} product={product} isAdmin={isAdmin} />
      })}
    </div>
  );
}

export default Product