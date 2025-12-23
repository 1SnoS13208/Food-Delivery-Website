import React, { useContext, useState } from 'react'
import './ForgotPassword.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const { url } = useContext(StoreContext)
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post(url + "/api/user/forgot-password", { email });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='forgot-password'>
            <form onSubmit={onSubmitHandler} className='forgot-password-container'>
                <h2>Forgot Password</h2>
                <p>Enter your email to reset your password.</p>
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword