import React, { useState } from "react";
import axios from "axios";
import "../Profiles/logsign.css"
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const navi = useNavigate();

    const [responsemsg, setresponsemsg] = useState("");

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const hendleSubmit = (e) => {
        e.preventDefault()

        const {email, password} = data;

        if(!email || !password) {
            alert("Please Fill out all fields....")
            return;
        }

        if(email && password) {
            axios.post("https://ecommerce-project-8m5d.onrender.com/api/login", data)
            // axios.post("http://localhost:5008/api/login", data)
                    .then((res) => {
                        console.log(res.data);
                        setresponsemsg(res.data.message)
                        alert(res.data.message)
                        localStorage.setItem("token", res.data.token)
                        localStorage.setItem("userId", res.data.userId)
                        
                        if(res.data.message === "User is not correct. Please enter the correct details"){
                            navi("/login")
                        }else if(res.data.message === "user logged in successfully"){
                            navi("/")
                            window.location.reload(true)
                        }else{
                            navi("/register")
                        }
                    })
                    .catch((err) => console.log(err))
        }else{
            navi("/register");
        }

        setData({
            email: "",
            password: ""
        })
    }

    return(
        <>  
            <div className="forlogin">

                <div className="forLoginform">
                    <form>
                        <div className="logstyle">
                            <h2 data-text="Login...">Welcome Back...</h2>
                        </div>

                        <input className="LogSigninput" type="email" placeholder="User Email" name='email' onChange={handleInput} required /><br />

                        <input className="LogSigninput" type="password" placeholder="Password"  name='password' onChange={handleInput} required /><br />

                        <button className="LogSignupButton" onClick={hendleSubmit}>Sign in</button>

                        <p>Not registered yet? <Link to="/register">Click Here</Link></p>

                    </form>
                    <h2>{responsemsg}</h2>
                </div>
            </div>
        </>
    )
}

export default LoginPage;