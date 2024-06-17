import React, { useState } from 'react';
import './login.css';
import '../commoncss/App.css'
const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleSignInClick = () => {
        setIsSignUp(false);
    };

    return (
        <div className='main-container'>
             <video autoPlay muted loop className="background-video">
                <source src="bg2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button className='loginc'>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#">
                    <h1>Login in</h1>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button className='loginc'>LogIn</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1 className='overlay-head'>Welcome Back!</h1>
                        <p>contiue your workout with your community</p>
                        <button className='loginc-over' onClick={handleSignInClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1 className='overlay-head'>Create or join community now </h1>
                        <button className='loginc-over' onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};
  
  export default Login;
  