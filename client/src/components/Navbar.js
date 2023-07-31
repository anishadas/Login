import React from 'react'
import profile from '../images/profile.webp'
import { Link } from 'react-router-dom'
const Navbar = ({ user }) => {

  const logout = () => {
    window.open('http://localhost:5000/auth/logout', "_self");
  }
  let src = user?.photos ? user.photos[0].value : profile
  
  return (
    <div className='navbar'>
      <span className='logo'>
        <Link to='/' className='link'>My App</Link>
      </span>
      {user ? (
        <ul className='list'>
          <li className='listitem'>
            <img src={src} alt='' className='avatar' />
          </li>
          <li className='listitem'>{user.displayName||user.username }</li>
          <li className='listitem' onClick={logout}>Logout</li>
        </ul>
      ) : (
          <Link to='/login' className='link'>LOGIN</Link>
      )}
     
    </div>
  )
}

export default Navbar
