import {  useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Register.css'
const Register = () => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('');
  const handelSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/user/register', { ...user })

      localStorage.setItem('firstRegister', true)

      window.location.href = "/"
    } catch (err) {
      alert(err.res.data.msg)
    }
  }
  const handelinput = e => {
    const { name, value } = e.target;
    setError('');
    setUser({ ...user, [name]: value })
  }
  return (
    <div className='login-container'>
      <form onSubmit={handelSubmit} className="login-form">
        <div className="form-group">
          <label>Name:</label>
          <input name='name' type='text' placeholder='name' value={user.name} onChange={handelinput} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input name='email' type='email' placeholder='email' value={user.email} onChange={handelinput} required />
        </div>
        <div className="form-group">
          <label>Pssword:</label>
          <input name='password' type='password' placeholder='password' value={user.password} onChange={handelinput} required />
        </div>
        {error && <p className="error">{error}</p>}
        <div className='row'>
          <button type='submit' className='btn'>Register</button>
          <p style={{marginBottom:"20px"}}>Already had account?</p>
          <Link style={{backgroundColor:"red", padding:"15px", borderRadius:"4px", color:"white"}}to="/login">Login</Link>
        </div>
      </form>
      </div>
      )
}

export default Register