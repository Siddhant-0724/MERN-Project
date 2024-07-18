import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserApi = (token) => {
    const [isLogged, setisLogged] = useState(false)
    const [isAdmin, setisAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [count, setCount] = useState(0)
    const [user,setUser] = useState('')

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    })
                    setisLogged(true)
                    res.data.role === 1 ? setisAdmin(true) : setisAdmin(false)

                    setUser(res)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    }, [token])

    const Addcart = (product) => {
        const check = cart.every(item => item._id !== product._id)
        if (check) {
            setCart([...cart, { ...product, quantity: 1 }])
            setCount(count + 1)
        } else {
            setCart(cart.map(item => 
                item._id === product._id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ))
            setCount(count + 1)
        }
    }

    return {
        isLogged: [isLogged, setisLogged],
        isAdmin: [isAdmin, setisAdmin],
        cart: [cart, setCart],
        count: [count, setCount],
        user :[user],
        Addcart: Addcart
    }
}

export default UserApi
