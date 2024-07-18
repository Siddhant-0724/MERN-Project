import React, { useContext, useState } from 'react'
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import UserApi from '../../api/UserApi';

const Header = () => {
    const state = useContext(GlobalState)
    const [isLogged, setisLogged] = state.UserApi.isLogged
    const [isAdmin, setisAdmin] = state.UserApi.isAdmin
    const [cart] = state.UserApi.cart
    const [count] = state.UserApi.count
    const [user] = state.UserApi.user
    let name = '';
    if (user) {
        name = user.data.name
    } 


    const logoutuser = async () => {
        await axios.get('/user/logout')

        localStorage.clear()
        setisAdmin(false)
        setisLogged(false)

    }
    const adminRouter = () => {
        return (
            <>
                <li><Link to='/createproduct'>Create Product</Link></li>
                <li><Link to='/category'>Category</Link></li>
            </>
        )
    }
    const loggedRouter = () => {
        return (
            <>
                <li><Link to='/history'>History</Link></li>
                <li><Link to='/' onClick={logoutuser}>Logout</Link></li>
            </>
        )
    }
    return (
        <header>
            <div className='menu'>
                <MdMenu size={30} />
            </div>
            <div className='logo'>
                <Link to='/'>
                    <h1>Colothing A to Z</h1>
                </Link>
            </div>
            <ul>
                <li><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>

                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login And Register</Link></li>
                }
                <li className='menu'>
                    <MdClose size={30} />
                </li>

                {
                    isAdmin ? '' : <li style={{fontWeight:"bold",opacity:"1"}}>Hello {name}</li>
                }
            </ul>

            {
                isAdmin ? '' : <div className='cart-icon'>
                    <span>{count}</span>
                    <Link to="/cart"><MdOutlineShoppingCart size={30} /></Link>
                </div>
            }

        </header>
    )
}
export default Header
