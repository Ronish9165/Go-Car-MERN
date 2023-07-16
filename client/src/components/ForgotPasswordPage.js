import React, { useState } from 'react';
import './ForgetPasswordPage.css'
const ForgotPassword = ({ setPage }) => {
  const [email, setEmail] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can add your email verification logic

    // For the sake of example, we'll assume the email is valid and move to the verification page
    forgetPassword();
    setPage('verification');

  };

  const forgetPassword= async()=>{
   window.localStorage.setItem('email',email);
   const res =  await fetch('/forgotpass',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email
        })
    })

    const dataResponse = await res.json()
    if(dataResponse.status === 200){
        window.alert(dataResponse.data['message'])
        window.location("/");
    }
}
  return (
    <section className='fbox'>  
      <div className='forgotpass'>
    <h2>Forgot Password</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Verify Email</button>
    </form>
  </div></section>
  
  );
};

export default ForgotPassword;
