import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Dashboard</p>
        </NavLink>
        <NavLink to='/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
        <NavLink to='/coupons' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Coupons</p>
        </NavLink>
        <NavLink to='/banners' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Banners</p>
        </NavLink>
        <NavLink to='/category' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Categories</p>
        </NavLink>
        <NavLink to='/settings' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Settings</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar

