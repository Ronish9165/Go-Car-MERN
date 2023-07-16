import React, {useState, useContext} from 'react'
import { NavLink, useHistory } from "react-router-dom";

import { UserContext } from "../App"


const Signin = () => {
    
    const {state, dispatch} = useContext(UserContext)
    
    
    //User signin
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    const signinUser =  async (e) =>{
        e.preventDefault();

        const res = await fetch('/signin', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        });
        const data = res.json();

        if(res.status === 400 || !data){
            window.alert("invalid Credentials");
        }
        else{

            dispatch({type: "USER", payload:true})
            window.alert("Signin Successfull");
            history.push("/");
        }
    }


    

    return (
        <>

{/* <header className="header">

<div id="menu-btn" className="fas fa-bars"></div>

<NavLink className="logo" to="/"> <span>Go</span>Car </NavLink>

<nav className="navbar">
    <NavLink  to="/">Home</NavLink>
    <NavLink  to="/buycar">Explore-Sale-Cars</NavLink>
    <NavLink  to="/rentcar">Explore-Rent-Cars</NavLink>
</nav>

<div id="login-btn">
    <button className=""><NavLink className="nav-link" to="/signin"></NavLink></button>
</div>

</header> */}

            <div className="maincontainer">
                <div className="firstcontainer">
                    <div className="titled"></div>
                        <div id = "usersignin" style = {{display:"block"}} className="content">
                        <h2>Signin As User</h2>
                            <form method="POST">
                                <div className="user-details">
          
                                    <div className="input-box">
                                        <span className="details">Email</span>
                                        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
                                    </div>
          
                                    <div className="input-box">
                                        <span className="details">Password</span>
                                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
                                    </div>
          
                                </div>
    
                                <div className="button">
                                    <input type="submit"  value="signin" onClick={signinUser} />
                                </div>
                            </form>
      
                            <h2 style={{marginLeft:"500px"}}><NavLink style={{color:"#188aec"}} to="/forgotpassword">Forgot Password?</NavLink></h2>
                            <h2> don't have an account <NavLink style={{color:"#188aec", textDecorationLine: 'underline'}} to="/signup">create one</NavLink></h2>
                            <button className="btn"><NavLink to="/adminsignin" style={{color: "#ffff"}}>Signin As Admin</NavLink></button>
                        </div>
                        
                     
                    </div>
                </div>
            
            
        </>
    )
}

export default Signin
