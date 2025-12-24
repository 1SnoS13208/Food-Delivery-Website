import React, { useContext, useState } from 'react'
import './ResetPassword.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    const { url } = useContext(StoreContext)
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("")

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const response = await axios.post(url + "/api/user/reset-password/" + token, { password });
        if (response.data.success) {
            toast.success(response.data.message);
            navigate('/');
        } else {
            toast.error(response.data.message);
        }
    }

    return (
        <div className='reset-password'>
            <form onSubmit={onSubmitHandler} className='reset-password-container'>
                <h2>Reset Password</h2>
                <input type="password" placeholder='New Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type='submit'>Reset Password</button>
            </form>
        </div>
    )
}

export default ResetPassword