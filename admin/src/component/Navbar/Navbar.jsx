import React, { useState, useEffect, useRef } from "react"
import "./Navbar.css"
import {assets} from "../../assets/assets"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Navbar = ({url}) => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Function to fetch orders
    const fetchOrders = async () => {
        if (!url) return;
        try {
            const response = await axios.get(url + "/api/order/list");
            if (response.data.success) {
                // Filter only unread orders and sort by newest first
                const allOrders = response.data.data;
                const unreadOrders = allOrders.filter(order => !order.isRead).reverse();
                setNotifications(unreadOrders);
            }
        } catch (error) {
            console.error("Error polling orders", error);
        }
    };

    // Initial fetch
    fetchOrders();

    // Poll every 10 seconds
    const interval = setInterval(fetchOrders, 10000);

    return () => clearInterval(interval);
  }, [url]);

  const handleNotificationClick = async (orderId) => {
    try {
        const response = await axios.post(url + "/api/order/mark-read", { orderId });
        if (response.data.success) {
            // Remove from local list immediately for snappiness
            setNotifications(prev => prev.filter(n => n._id !== orderId));
            setShowDropdown(false);
            navigate('/orders'); // Navigate to orders page
        }
    } catch (error) {
        console.error("Error marking read", error);
    }
  }

  const handleViewAll = async () => {
    try {
        // Mark all currently loaded notifications as read
        const markReadPromises = notifications.map(order => 
            axios.post(url + "/api/order/mark-read", { orderId: order._id })
        );
        
        await Promise.all(markReadPromises);
        
        setNotifications([]); // Clear local state immediately
        setShowDropdown(false);
        navigate('/orders');
    } catch (error) {
        console.error("Error marking all as read", error);
    }
  }

  return (
    <div className="navbar">
        <img className="logo" src={assets.logo} alt=""/>
        
        <div className="navbar-right">
            <div className="notification-wrapper" ref={dropdownRef}>
                <div className="notification-icon" onClick={() => setShowDropdown(!showDropdown)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
                </div>

                {showDropdown && (
                    <div className="notification-dropdown">
                        <div className="dropdown-header">
                            <p>Notifications</p>
                            <span className="count">{notifications.length} New</span>
                        </div>
                        <div className="dropdown-body">
                            {notifications.length === 0 ? (
                                <p className="no-notif">No new orders</p>
                            ) : (
                                notifications.slice(0, 5).map((order, index) => (
                                    <div key={index} className="notif-item" onClick={() => handleNotificationClick(order._id)}>
                                        <div className="notif-dot"></div>
                                        <div className="notif-content">
                                            <p className="notif-title">New Order #{order._id.slice(-4)}</p>
                                            <p className="notif-desc">
                                                {order.items.length} items • ${order.amount}
                                            </p>
                                            <p className="notif-time">
                                                {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {notifications.length > 0 && (
                             <div className="dropdown-footer" onClick={handleViewAll}>
                                View All Orders
                             </div>
                        )}
                    </div>
                )}
            </div>
            <img className='profile' src={assets.profile_image} alt=""/>
        </div>
    </div>
  )
}

export default Navbar