import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import '../commoncss/App.css';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        community: 'RCB',
        customerType: 'user'
    });
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleSignInClick = () => {
        setIsSignUp(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (isSignUp) {
            setSignUpData({
                ...signUpData,
                [name]: value
            });
        } else {
            setSignInData({
                ...signInData,
                [name]: value
            });
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/customer/signUpCustomer', {
                customerType: signUpData.customerType,
                firstName: signUpData.firstName,
                lastName: signUpData.lastName,
                email: signUpData.email,
                password: signUpData.password,
                community: signUpData.community,
                newPassword: signUpData.confirmPassword
            });

            if (response.status === 200) {
                navigate('/landingpage');
            }
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/customer/signInCustomer', {
                email: signInData.email,
                password: signInData.password
            });

            if (response.status === 200) {
                navigate('/landingpage');
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <div className='main-container'>
            <video autoPlay muted loop className="background-video">
                <source src="bg2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
                <div className="form-container sign-up-container">
                    <form className='loginform' onSubmit={handleSignUpSubmit}>
                        <h1 className='loginh1'>Create Account</h1>
                        <input
                            className='logininput'
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={signUpData.firstName}
                            onChange={handleChange}
                        />
                        <input
                            className='logininput'
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={signUpData.lastName}
                            onChange={handleChange}
                        />
                        <input
                            className='logininput'
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signUpData.email}
                            onChange={handleChange}
                        />
                        <input
                            className='logininput'
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signUpData.password}
                            onChange={handleChange}
                        />
                        <input
                            className='logininput'
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={signUpData.confirmPassword}
                            onChange={handleChange}
                        />
                        <button className='loginc' type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form className='loginform' onSubmit={handleSignInSubmit}>
                        <h1 className='loginh1'>Login</h1>
                        <input
                            className='logininput'
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signInData.email}
                            onChange={handleChange}
                        />
                        <input
                            className='logininput'
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signInData.password}
                            onChange={handleChange}
                        />
                        <button className='loginc' type="submit">Log In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className='overlay-head'>Welcome Back!</h1>
                            <p>Continue your workout with your community</p>
                            <button className='loginc-over' onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className='overlay-head'>Create or join community now</h1>
                            <button className='loginc-over' onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
