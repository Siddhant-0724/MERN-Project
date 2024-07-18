import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Login.css'
const Login = () => {
  const [user,setUser] = useState({
    email:'',
    password:''
  })

  const onChangeInput = e => {
    const {name,value} = e.target;
    setUser({...user,[name]:value})
  }

  const loginSubmit =async e => {
    e.preventDefault()
    try{
      await axios.post('/user/login',{...user})

      localStorage.setItem('firstLogin',true)

      window.location.href = "/"
      if(!user){
        alert('Register')
      }
    }catch(err){
      alert(err.response.data.msg)
    }
  }


  return (
    <div className='login-container'>
      <form onSubmit={loginSubmit} className="login-form">
        <div className='form-group'>
          <label>Email:</label>
        <input type='email' name='email' required placeholder='Email' value={user.email} onChange={onChangeInput}/>
        </div>
        <div className='form-group'>
        <label>Password:</label>
        <input type='password' name='password' required placeholder='Password' value={user.password} onChange={onChangeInput}/>
        </div>

        <div className='row'>
          <button type='submit' className='btn'>Login</button>
          <Link className='btn' style={{backgroundColor:"red",width:"1000px"}} to='/register'>Register</Link>
        </div>


      </form>
    </div>
  )
}

export default Login
