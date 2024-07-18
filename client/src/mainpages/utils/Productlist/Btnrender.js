import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import './Btnrender.css'
const Btnrender = (product) => {
    const state = useContext(GlobalState)
    const [isAdmin] = state.UserApi.isAdmin
    const Addcart = state.UserApi.Addcart
    const [error, setError] = useState('');

    const deleteProduct = async () => {
        try {
            await axios.delete(`/api/product/${product.product._id}`);
            // Optionally refresh the product list or update the state
        } catch (err) {
            setError('Failed to delete product');
            console.error(err);
        }
    };

    return (
        <div className='row-btn'>
            {
                isAdmin ?
                    <>
                        <Link id='btn_buy' to={'/'} onClick={deleteProduct}>
                            Delete
                        </Link>
                        <Link id='btn_view' to={`detail/${product._id}`}>
                            Edit
                        </Link>
                    </>
                    :
                    <>
                        <Link id='btn_buy' to={`#!`} onClick={() => Addcart(product)}>
                            Buy
                        </Link>
                        <Link id='btn_view' to={`detail/${product.product._id}`}>
                            View
                        </Link>
                    </>
            }
        </div>

    )
}

export default Btnrender