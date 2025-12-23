import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {

  const { url, token } = useContext(StoreContext)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: ""
    }
  })

  const fetchProfile = async () => {
    const response = await axios.get(url + "/api/user/get-profile", { headers: { token } })
    if (response.data.success) {
      setUserData(response.data.userData)
    } else {
      toast.error(response.data.message)
    }
  }

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
    if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setUserData(data => ({...data, [parent]: {...data[parent], [child]: value}}))
    } else {
        setUserData(data => ({ ...data, [name]: value }))
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await axios.post(url + "/api/user/update-profile", userData, { headers: { token } });
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token])

  return (
    <div className='profile'>
      <h2>My Profile</h2>
      <form onSubmit={onSubmitHandler} className='profile-form'>
        <div className="profile-group">
          <label>Name</label>
          <input name='name' onChange={onChangeHandler} value={userData.name} type="text" placeholder='Your Name' required />
        </div>
        <div className="profile-group">
          <label>Email</label>
          <input name='email' value={userData.email} type="email" placeholder='Your Email' disabled />
        </div>
        <div className="profile-group">
          <label>Phone</label>
          <input name='phone' onChange={onChangeHandler} value={userData.phone} type="text" placeholder='Phone Number' />
        </div>
        <h3>Address</h3>
        <div className="multi-fields">
          <input required name='address.street' onChange={onChangeHandler} value={userData.address.street} type="text" placeholder='Street' />
          <input required name='address.city' onChange={onChangeHandler} value={userData.address.city} type="text" placeholder='City' />
        </div>
        <div className="multi-fields">
          <input required name='address.zipcode' onChange={onChangeHandler} value={userData.address.zipcode} type="text" placeholder='Zip code' />
          <input required name='address.country' onChange={onChangeHandler} value={userData.address.country} type="text" placeholder='Country' />
        </div>
        <button type='submit'>Save Changes</button>
      </form>
    </div>
  )
}

export default Profile
