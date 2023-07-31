import React, { useState } from 'react'
import google from '../images/search.png'
import facebook from '../images/facebook.png'
import github from '../images/github.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const [controller, setController] = useState(true);
    const [registerDetails, setRegisterDetails] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const localLogin = async (e) => {
        e.preventDefault();
        const res = await axios({
            method: "POST",
            data: loginDetails,
            withCredentials: true,
            url: 'http://localhost:5000/auth/locallogin',
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (res.status === 200) {
            navigate('/');
            window.location.reload();
        }
        if (res.status === 201) {
            alert("Please Register, " + res.data);
            navigate('/login');
            setController(false);
        }
    }
    const localRegister = async (e) => {
        e.preventDefault();
        const res = await axios({
            method: "POST",
            data: registerDetails,
            withCredentials: true,
            url: 'http://localhost:5000/auth/register',
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (res.status === 200) {
            navigate('/login');
            alert("User created successfully, please login to continue");
            window.location.reload();
            setController(true);
        }
        if (res.status === 201) {
            alert(res.data);
            navigate('/login');
        }

    }
    const googleLogin = () => {
        window.open('http://localhost:5000/auth/google', "_self");
    }

    const githubLogin = async () => {
        window.open('http://localhost:5000/auth/github', "_self");

    }

    const facebookLogin = () => {
        window.open('http://localhost:5000/auth/facebook', "_self");
    }
    return (
        <div className='login'>
            <h1 className='loginTitle'>Choose a Login Method</h1>
            <div className='wrapper'>
                <div className='left'>
                    <div className='loginButton google' onClick={googleLogin}>
                        <img src={google} alt='google' className='icon' />
                        Google
                    </div>
                    <div className='loginButton facebook' onClick={facebookLogin}>
                        <img src={facebook} alt='facebook' className='icon' />
                        Facebook
                    </div>
                    <div className='loginButton github' onClick={githubLogin}>
                        <img src={github} alt='github' className='icon' />
                        Github
                    </div>
                </div>
                <div className='center'>
                    <div className='line' />
                    <div className='or'>OR</div>
                </div>
                <div className='right'>

                    {
                        controller ? (
                            <div className='loginuser'>
                                <input type='email' name='email' placeholder='abc@xyz.com' onChange={e => setLoginDetails({ ...loginDetails, email: e.target.value })} />
                                <input type='text' placeholder='Password' name='password' onChange={e => setLoginDetails({ ...loginDetails, password: e.target.value })} />
                                <button className='submit' onClick={localLogin}>LOGIN</button>
                                <p onClick={() => setController(false)}>Not an user? click to register</p>
                            </div>
                        ) : (
                            <div className='registeruser'>
                                <input type='text' placeholder='Username' name='username' onChange={e => setRegisterDetails({ ...registerDetails, username: e.target.value })} />
                                <input type='email' name='email' placeholder='abc@xyz.com' onChange={e => setRegisterDetails({ ...registerDetails, email: e.target.value })} />
                                <input type='text' placeholder='Password' name='password' onChange={e => setRegisterDetails({ ...registerDetails, password: e.target.value })} />
                                <input type='text' placeholder='confirm password' name='confirmPassword' onChange={e => setRegisterDetails({ ...registerDetails, confirmPassword: e.target.value })} />
                                <button className='submit' onClick={localRegister}>REGISTER</button>
                                <p onClick={() => setController(true)}>Already an user? click to login</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Login
