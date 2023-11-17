import axios from 'axios';
import React from "react";
import "../Profiles/logsign.css"
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {

    const navi = useNavigate();
    let empty = [];
    const userdetail = {
        name: "",
        mobile: "",
        email: "",
        password: "",
        address: ""
    }

    const submithendle = (e) => {
        e.preventDefault(e);
        empty.push(userdetail)
        console.log(userdetail);

        axios.post("https://ecommerce-project-8m5d.onrender.com/api/register", userdetail)
        // axios.post("http://localhost:5008/api/register", userdetail)
                .then((res) => {alert(res.data.message)
                return navi("/login")})
                .catch((err) => console.log(err))
    }

    const onChangehandle = (e) =>{
        e.preventDefault(e);
        userdetail[e.target.name] = e.target.value;
    }

    return(
        <>  
            <div className="forRegister">
                    
                    <div className="forRegisterform">
                        <form>
                            <div className="logstyle">
                                <h2 data-text="Login...">Register Here...</h2>
                            </div>

                            <input className="LogSigninput" type="text" name='name' placeholder='Enter Name....' onChange={onChangehandle} required /><br />

                            <input className="LogSigninput" type="number" name='mobile' placeholder='Enter Mobile....' onChange={onChangehandle} required /><br />

                            <input className="LogSigninput" type="email" name='email' placeholder='Enter Email....' onChange={onChangehandle} required /><br />

                            <input className="LogSigninput" type="password" name='password' placeholder='Enter Password....' onChange={onChangehandle} required /><br />

                            <input className="LogSigninput" type="text" name='address' placeholder='Enter Address....' onChange={onChangehandle} required /><br />

                            <button className='LogSignupButton' onClick={submithendle} value="Register">Register</button>

                            <p>ALready registered? <Link to="/login">Click Here</Link></p>

                        </form>
                    </div>
            </div>
        </>
    )
}

export default RegisterPage;