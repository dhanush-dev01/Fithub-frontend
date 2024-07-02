import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import "./login.css";
import "../commoncss/App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setDoc, doc, serverTimestamp, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth"
import { auth, db, storage} from "../ChatModule/firebase"
 
const stripePromise = loadStripe(
  "pk_test_51PKCXVSINBqCF5XVGturv55RaoNh5g40GAkc7OQPvWJef1yYZQh0cuT38ls6zMV8kJD6jDNvgjxdH4ZQu3DtMdqR00UEKKFF3y"
); // Replace with your Stripe publishable key
 
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    customerType: "user",
  });
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [isLeader, setIsLeader] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const navigate = useNavigate();
 
  // const [formData, setFormData] = useState({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: ''
  // });
 
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
        [name]: value,
      });
    } else {
      setSignInData({
        ...signInData,
        [name]: value,
      });
    }
  };
 
  // const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setSignUpData({ ...formData, [name]: value });
  // };
 
  const handleCheckboxChange = async (e) => {
    alert("Need to pay 199 rupees before proceeding as a user..");
    if (e.target.checked) {
      try {
        // Store form data before redirecting
        localStorage.setItem("formData", JSON.stringify(signUpData));
        const response = await fetch("http://localhost:8000/leaderLogin", {
          method: "POST",
        });
        const data = await response.json();
        if (response.ok) {
          window.location.href = data.url; // Redirect to Stripe checkout
        } else {
          alert("Payment failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Payment error");
      }
    } else {
      setSignUpData({
        ...signUpData,
        customerType: "user",
      });
    }
    setIsLeader(e.target.checked);
  };
 
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
 
    // Validate the sign-up form data
    const formErrors = validateSignUp();
 
    if (formErrors.length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8080/customer/signUpCustomer",
          {
            customerType: signUpData.customerType,
            firstName: signUpData.firstName,
            lastName: signUpData.lastName,
            email: signUpData.email,
            password: signUpData.password,
            community: signUpData.community,
            newPassword: signUpData.confirmPassword,
          }
        );
 
        if (response.status === 200) {
            try{
                createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password).then(async( res) =>{
                    await updateProfile(res.user,{
                        displayName: signUpData.firstName
                    })
                    await setDoc(doc(db, "users", res.user.uid),{
                        uid: res.user.uid,
                        displayName: signUpData.firstName,
                        email: signUpData.email,
                        customerType: signUpData.customerType
                        // photoURL: downloadURL
                    })
                    await setDoc(doc(db, "userChats", res.user.uid),{})
    
                    const groupId = "global_group_chat";
                    const groupData = {
                      groupId,
                      groupName: "Community Group Chat",
                      users: arrayUnion({
                        uid: res.user.uid,
                        displayName: signUpData.firstName,
                      }),
                      messages: [],
                      date: serverTimestamp(),
                    };
    
                    const groupChatRef = doc(db, "chats", groupId);
                    const groupChatSnapshot = await getDoc(groupChatRef);
    
                    if (groupChatSnapshot.exists()) {
                      // Update existing group chat
                      await updateDoc(groupChatRef, {
                        users: arrayUnion({
                          uid: res.user.uid,
                          displayName: signUpData.firstName,
                        }),
                      });
                    } else {
                      // Create a new group chat
                      await setDoc(groupChatRef, groupData);
                    }
    
                    // Update userChats collection for the new user
                    await updateDoc(doc(db, "userChats", res.user.uid), {
                      [groupId]: {
                        groupId,
                        groupName: "Community Group Chat",
                        date: serverTimestamp(),
                      },
                    });
                    
                    // navigate("/chat")
                    navigate("/user")
                })
    
                // const storageRef = ref(storage, "");
    
                // const uploadTask = uploadBytesResumable(storageRef, file);
    
                // uploadTask.on(
                //     (error)=>{
                //         console.log(error);
                //     },
                //     () =>{
                //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>{
                //             await updateProfile(await res.user,{
                //                 displayName: signUpData.firstName + signUpData.lastName,
                //                 photoURL: downloadURL
                //             })
                //             await setDoc(doc(db, "users", res.user.uid),{
                //                 uid: res.user.uid,
                //                 displayName: signUpData.firstName + signUpData.lastName,
                //                 email: signUpData.email,
                //                 photoURL: downloadURL
                //             })
                //         })
                //     }
    
                // )
                
            }
            catch(error){
                console.log(error);
            }
            // navigate("/chat")
          navigate("/landingpage");
          console.log(response.data);
          console.log("response in line 128");
          const customerId = response.data.customerId;
          const userType = response.data.customerType;        
          console.log("Customer ID:", customerId);
          localStorage.setItem("customerId", customerId);
          localStorage.setItem("userType", userType);
          console.log("User Type :" , userType);
        }
      } catch (error) {
        console.error("Error signing up:", error);
        toast.error("Error signing up. Please try again.");
      }
    } else {
      formErrors.forEach((error) => toast.error(error));
    }
  };
  const handleLeaderSignUpData = async (signUpData1) => {
    // e.preventDefault();
    try {
      // console.log(signUpData1);
      const response = await axios.post(
        "http://localhost:8080/customer/signUpCustomer",
        {
          customerType: "leader",
          firstName: signUpData1.firstName,
          lastName: signUpData1.lastName,
          email: signUpData1.email,
          password: signUpData1.password,
          community: signUpData1.community,
          newPassword: signUpData1.confirmPassword,
        }
      );
 
      if (response.status === 200) {
        // const auth = getAuth()
        try{
            createUserWithEmailAndPassword(auth, signUpData1.email, signUpData1.password).then(async( res) =>{
                await updateProfile(res.user,{
                    displayName: signUpData1.firstName
                })
                await setDoc(doc(db, "users", res.user.uid),{
                    uid: res.user.uid,
                    displayName: signUpData1.firstName,
                    email: signUpData1.email,
                    customerType: "leader"
                    // photoURL: downloadURL
                })
                await setDoc(doc(db, "userChats", res.user.uid),{})

                const groupId = "global_group_chat";
                const groupData = {
                  groupId,
                  groupName: "Global Group Chat",
                  users: arrayUnion({
                    uid: res.user.uid,
                    displayName: signUpData1.firstName,
                  }),
                  messages: [],
                  date: serverTimestamp(),
                };

                const groupChatRef = doc(db, "chats", groupId);
                const groupChatSnapshot = await getDoc(groupChatRef);

                if (groupChatSnapshot.exists()) {
                  // Update existing group chat
                  await updateDoc(groupChatRef, {
                    users: arrayUnion({
                      uid: res.user.uid,
                      displayName: signUpData1.firstName,
                    }),
                  });
                } else {
                  // Create a new group chat
                  await setDoc(groupChatRef, groupData);
                }

                // Update userChats collection for the new user
                await updateDoc(doc(db, "userChats", res.user.uid), {
                  [groupId]: {
                    groupId,
                    groupName: "Global Group Chat",
                    date: serverTimestamp(),
                  },
                });
                
                
                navigate("/user")
            })

            // const storageRef = ref(storage, "");

            // const uploadTask = uploadBytesResumable(storageRef, file);

            // uploadTask.on(
            //     (error)=>{
            //         console.log(error);
            //     },
            //     () =>{
            //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>{
            //             await updateProfile(await res.user,{
            //                 displayName: signUpData.firstName + signUpData.lastName,
            //                 photoURL: downloadURL
            //             })
            //             await setDoc(doc(db, "users", res.user.uid),{
            //                 uid: res.user.uid,
            //                 displayName: signUpData.firstName + signUpData.lastName,
            //                 email: signUpData.email,
            //                 photoURL: downloadURL
            //             })
            //         })
            //     }

            // )
            
        }
        catch(error){
            console.log(error);
        }
        
    }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
 
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/customer/signInCustomer",
        {
          email: signInData.email,
          password: signInData.password,
        }
      );
 
      if (response.status === 200) {
        
        console.log(response.data);
        const customerId = response.data.customerId;
        const userType = response.data.customerType;        
        console.log("Customer ID:", customerId);
        localStorage.setItem("customerId", customerId);
        localStorage.setItem("userType", userType);
        console.log("User Type :" , userType)
        navigate("/user")
       
        
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  const validateSignUp = () => {
    let formErrors = [];
    if (!signUpData.firstName) formErrors.push("First name is required");
    if (!signUpData.lastName) formErrors.push("Last name is required");
    if (!signUpData.email) formErrors.push("Email is required");
    if (!signUpData.password) formErrors.push("Password is required");
    if (!signUpData.confirmPassword)
      formErrors.push("Confirm password is required");
    if (signUpData.password !== signUpData.confirmPassword)
      formErrors.push("Passwords do not match");
    return formErrors;
  };
 
  const validateSignIn = () => {
    let formErrors = [];
    if (!signInData.email) formErrors.push("Email is required");
    if (!signInData.password) formErrors.push("Password is required");
    return formErrors;
  };
 
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
 
    if (sessionId) {
      // Verify the session ID with your backend
      fetch(`http://localhost:8000/verify-session?session_id=${sessionId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.paymentStatus === "success") {
            setIsPaymentSuccessful(true);
            setIsLeader(true);
            // Remove session_id from the URL without refreshing the page
            const storedFormData = localStorage.getItem("formData");
            if (storedFormData) {
              let data = JSON.parse(storedFormData);
              console.log("insideData", data.firstName);
 
              const updatedData = {
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email || "",
                password: data.password || "",
                confirmPassword: data.confirmPassword || "",
                customerType: data.customerType || "user",
              };
              console.log("updatedData", updatedData);
 
              // Update state and call handleLeaderSignUpData after state is updated
              // setSignUpData(prevData => {
 
              handleLeaderSignUpData(updatedData);
              // return updatedData;
              // });
 
              console.log("setSignupData", signUpData);
              localStorage.removeItem("formData"); // Clear stored data
            }
            window.history.replaceState(null, null, window.location.pathname);
          } else {
            alert("Payment verification failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Payment verification error");
        });
    } else {
      // Retrieve form data from local storage
    }
  }, []);
 
  return (
    <Elements stripe={stripePromise}>
      <div className="main-container">
        <ToastContainer />
        <video autoPlay muted loop className="background-video">
          <source src="bg2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={`containerLogin ${isSignUp ? "right-panel-active" : ""}`}>
          <div className="form-container sign-up-container">
            <form className="loginform" onSubmit={handleSignUpSubmit}>
              <h1 className="loginh1">Create Account</h1>
              <input
                className="logininput"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={signUpData.firstName}
                onChange={handleChange}
              />
              <input
                className="logininput"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={signUpData.lastName}
                onChange={handleChange}
              />
              <input
                className="logininput"
                type="email"
                name="email"
                placeholder="Email"
                value={signUpData.email}
                onChange={handleChange}
              />
              <input
                className="logininput"
                type="password"
                name="password"
                placeholder="Password"
                value={signUpData.password}
                onChange={handleChange}
              />
              <input
                className="logininput"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={signUpData.confirmPassword}
                onChange={handleChange}
              />
              <label className="checklabel">
                <input
                  type="checkbox"
                  checked={isLeader && isPaymentSuccessful}
                  onChange={handleCheckboxChange}
                  disabled={isLeader && isPaymentSuccessful}
                />
                Become a leader (Payment Required)
              </label>
              <button className="loginc" type="submit">
                Sign Up
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="loginform" onSubmit={handleSignInSubmit}>
              <h1 className="loginh1">Login</h1>
              <input
                className="logininput"
                type="email"
                name="email"
                placeholder="Email"
                value={signInData.email}
                onChange={handleChange}
              />
              <input
                className="logininput"
                type="password"
                name="password"
                placeholder="Password"
                value={signInData.password}
                onChange={handleChange}
              />
              <button className="loginc" type="submit">
                Log In
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="overlay-head">Welcome Back!</h1>
                <p>Continue your workout with your community</p>
                <button className="loginc-over" onClick={handleSignInClick}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="overlay-head">Create or join community now</h1>
                <button className="loginc-over" onClick={handleSignUpClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};
 
export default Login;