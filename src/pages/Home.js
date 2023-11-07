import { jwtDecode } from 'jwt-decode';
import React from 'react'

export const Home = () => {

  const userToken = localStorage.getItem('token'); //takes token
  const data = jwtDecode(userToken); //decodes the token
  const fullname = data.user.fullName //get the user name from token
  const email = data.user.email //get the user name from token


  return (
    <div>
      <h1>Hoşgeldin {fullname} {email}</h1>
    </div>
  )
}
