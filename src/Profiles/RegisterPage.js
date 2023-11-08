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

        axios.post("http://localhost:5008/api/register", userdetail)
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
            <div className="login">
                    <h1>Enter Your Details To Register</h1>
                    
                    <div className="forform">
                        <form>

                            <label for="">Name : </label>
                            <input type="text" name='name' onChange={onChangehandle} required /><br />

                            <label for="">Phone : </label>
                            <input type="number" name='mobile' onChange={onChangehandle} required /><br />

                            <label for="">Email : </label>
                            <input type="email" name='email' onChange={onChangehandle} required /><br />

                            <label for="">Password : </label>
                            <input type="password" name='password' onChange={onChangehandle} required /><br />

                            <label for="">Address : </label>
                            <input type="text" name='address' onChange={onChangehandle} required /><br />

                            <button onClick={submithendle} value="Register">Register</button>

                            <p>ALready registered? <Link to="/login">Click Here</Link></p>

                        </form>
                    </div>
            </div>
        </>
    )
}

export default RegisterPage;