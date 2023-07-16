import React, { useState } from 'react';
import './ForgetPasswordPage.css'

const VerificationPage = ({ setPage }) => {
  const [verificationCode, setVerificationCode] = useState('');
 const verificationStep=async()=>{
    const email = window.localStorage.getItem('email');
    const res = await fetch('/verify-code',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email,
            verificationCode
        })
    })
    const dataResponse = await res.json()
    if(dataResponse.status === 200){
        window.alert(dataResponse.data['message'])
    }
    
}
  const handleSubmit = (e) => {
    e.preventDefault();
    
    verificationStep();
    // Here you can add your verification code logic
    // For the sake of example, we'll assume the verification code is valid and move to the new password page
    
    setPage('newPassword');

  };

  return (
    
    <section className='fbox'><div>
    <h2>Email Verification</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Verification Code:
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Verify Code</button>
    </form>
  </div></section>
    
  );
};

export default VerificationPage;
