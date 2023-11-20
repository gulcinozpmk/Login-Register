import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const RegisterForm = () => {

    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigation = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;

        //if the email is not valid return an error.
        if (!isValidEmail(email)) {
            setEmailError("*Geçerli bir e-posta adresi girin.");
            hasError = true;
        } else {
            setEmailError(""); //if not clear the error message.
        }
        
        //if the user name field is empty return an error.
        if (fullName.trim() === "") {
            setFullNameError("*Kullanıcı adı boş olamaz.");
            hasError = true;
        } else {
            setFullNameError(""); //if not clear the error message.
        }

        //if the password is not have at least 6 characters return an error.
        if (password.length < 6) {
            setPasswordError("*Şifre en az 6 karakterden oluşmalıdır.");
            hasError = true;
        } else {
            setPasswordError(""); //if not clear the error message.
        }

        if (hasError) {
            return;
        } //if hasError is true dont submit.

        //data
        const payload = {
            fullName: fullName,
            email: email,
            password: password,
            memberAgreementVersion: "v1"
        }
        // posting the data to the api
        try {
            // await axios.post('http://localhost:3000/api/auth/register', payload)
            await axios.post('<enter your url>', payload)
            navigation('/login') //if the post request is successful open the login page
        } catch (error) {
            console.log(error);
        }
    }

    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
            <h2>Register</h2>
            <hr></hr>
            </div>
            <label>
                Username:
                <input
                    value={fullName}
                    onChange={(e) => setFullname(e.target.value)}
                    type='text'
                />
                {fullNameError && <p>{fullNameError}</p>}
            </label>
            <label>
                Email:
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                />
                {emailError && <p>{emailError}</p>}
            </label>
            <label>
                Password:
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                />
                {passwordError && <p>{passwordError}</p>}
            </label>
            <button type='submit'>Register</button>
            <h5>Already Have an account? <Link to='/login'>Login.</Link></h5>
        </form>
    )
}
