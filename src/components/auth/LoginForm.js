import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigate();

  //data
  const payload = {
    email: email,
    password: password
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    // console.log(email,password);

    let hasError = false;

    //if the email is not valid return an error.
    if(!isValidEmail(email)){
      setEmailError("*Enter a valid email.") //if not clear the error message.
      hasError = true;
    } else {
      setEmailError("");
  }

    //if the password is not have at least 6 characters return an error.
    if(password.length<6){
      setPasswordError("*Password should have at least 6 characters.");
      hasError = true;
    } else {
      setPasswordError(""); //if not clear the error message.
  }

  if (hasError) {
    return;
  } //if hasError is true dont submit.

    // posting the data to the api
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', payload);
      //alert("Success"); // /if the post request is successful gives an alert message.
      localStorage.setItem('token', res?.data?.token)
      navigation('/home') //if the post request is successful open the home page
    } catch (error) {
      console.log(error);
    }
  }

  //checks id the email is invalid or not.
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email)
  }

  return (
    <form className='form' onSubmit={(e)=>handleSubmit(e)}>
        <div>
            <h2>Login</h2>
            <hr></hr>
        </div>

        <label>
          Email:
          <input type='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)} />
            {emailError && <p>{emailError}</p>}
        </label>

        <label>
          Password:
          <input type='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)} />
            {passwordError && <p>{passwordError}</p>}
        </label>

        <button type='submit'>Login</button>
        <h5>Not a Member? <Link to='/'>Create an Account.</Link></h5>
    </form>
  )
}
