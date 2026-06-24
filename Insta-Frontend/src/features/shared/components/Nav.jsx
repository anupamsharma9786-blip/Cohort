import React from 'react'
import './Nav.scss'
import { useNavigate } from 'react-router'

const Nav = () => {

    const navigate= useNavigate()
  return (
    <nav className='nav-bar'>
      <p className='nav-brand'>INSTY</p>
      <div className='nav-actions'>
        <button onClick={()=>{navigate('/create-post')}} className='button primary-button'>New Post</button>
      </div>
    </nav>
  )
}

export default Nav