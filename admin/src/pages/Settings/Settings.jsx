import React, { useState, useEffect } from 'react'
import './Settings.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Settings = ({url}) => {
    const [settings, setSettings] = useState({
        deliveryFee: 5,
        taxRate: 0,
        estimatedDeliveryTime: "30-45 min",
        isStoreOpen: true
    });

    const fetchSettings = async () => {
        const response = await axios.get(`${url}/api/settings/get`);
        if(response.data.success) {
            setSettings(response.data.data);
        } else {
            toast.error("Error fetching settings");
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setSettings(prev => ({...prev, [name]: value}));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const response = await axios.post(`${url}/api/settings/update`, settings);
        if(response.data.success) {
            toast.success("Settings Updated");
        } else {
            toast.error("Error updating settings");
        }
    }

    useEffect(() => {
        fetchSettings();
    }, [])

    return (
        <div className='settings'>
            <h3>Global Settings</h3>
            <form className="settings-form" onSubmit={onSubmitHandler}>
                
                <div className="settings-section">
                    <h4>Store Status</h4>
                    <div className="status-toggle-wrapper">
                        <label className="switch">
                            <input type="checkbox" name="isStoreOpen" checked={settings.isStoreOpen} onChange={onChangeHandler} />
                            <span className="slider round"></span>
                        </label>
                        <span className={`status-label ${settings.isStoreOpen ? 'open' : 'closed'}`}>
                            {settings.isStoreOpen ? "Store is Open" : "Store is Closed"}
                        </span>
                    </div>
                </div>

                <div className="settings-grid">
                    <div className="settings-group">
                        <p>Delivery Fee ($)</p>
                        <input type="number" name="deliveryFee" value={settings.deliveryFee} onChange={onChangeHandler} required />
                    </div>
                    
                    <div className="settings-group">
                        <p>Tax Rate (%)</p>
                        <input type="number" name="taxRate" value={settings.taxRate} onChange={onChangeHandler} required />
                    </div>

                    <div className="settings-group">
                        <p>Est. Delivery Time</p>
                        <input type="text" name="estimatedDeliveryTime" value={settings.estimatedDeliveryTime} onChange={onChangeHandler} placeholder='e.g. 30-45 min' required />
                    </div>
                </div>

                <button type='submit' className='save-btn'>Save Changes</button>
            </form>
        </div>
    )
}

export default Settings