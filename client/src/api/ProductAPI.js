import React, { useEffect, useState } from 'react'
import axios from 'axios'
const ProductAPI = () => {

  const [products, setProducts] = useState([])
  const [userName, setUserName] = useState('')
  

  const getProducts = async () => {
    try {
      const res = await axios.get('/api/product')
      setProducts(res.data.products)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return {
    products: [products, setProducts],
    username:[userName,setUserName]
  }
}

export default ProductAPI