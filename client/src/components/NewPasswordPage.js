import React, { useState } from 'react';


const NewPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [cPassword, setConfirmPassword] = useState('');

  const updatePassword=async()=>{
    const email = window.localStorage.getItem('email');
    const res = await fetch('/update-password',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            email,
            password,
            cPassword
        })
    })
    const dataResponse = await res.json()
    if(dataResponse.status === 200){
        window.alert(dataResponse.data['message'])
    }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword();
    // Here you can add your new password logic
    // For the sake of example, we'll assume the password is updated successfully
    
  };

  return (
    <section className='fbox'>
       <div>
      <h2>Create New Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Confirm New Password:
          <input
            type="password"
            value={cPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Update Password</button>
      </form>
    </div>
    </section>
   
  );
};

export default NewPasswordPage;
