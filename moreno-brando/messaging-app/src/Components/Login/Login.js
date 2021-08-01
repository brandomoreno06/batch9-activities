import React, { useState, useEffect } from 'react'
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { auth, db } from '../../firebase';
 
 
 
const Login = () => {
    const history = useHistory();
    const [userInfo, setUserInfo] = useState({ email: "", password: "" })
    const [disabledButton, setDisabledButton] = useState(false)

    const inputHandler = (e) => {
        const userKey = e.target.name;
        setUserInfo({...userInfo, [userKey]: e.target.value});
    }

    const login = (e) => {
        e.preventDefault();
        setDisabledButton(true);
        auth.signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then((auth) => {
            history.push("/");
        })
        .catch((error) => {
            alert(error.message)
            setDisabledButton(false);
        })
    }

    const register = (e) => {
        e.preventDefault();
        setDisabledButton(true);
    
        auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then((auth) => {
            history.push("/");
            db.collection('users').add({
                type: "user",
                email: userInfo.email,
                uid: userInfo.email,
            })
        })
        .catch((error) => {
            alert(error.message)
            setDisabledButton(false);
        })
    }


    return (
        <div className="login">
            <Link to="/" className="login__header">
                <img
                className="login__logo"
                src="https://static.wixstatic.com/media/e64864_5dfa936dc8c243a89547c431b3b43898~mv2_d_3900_3600_s_4_2.png/v1/fill/w_340,h_302,al_c,q_85,usm_0.66_1.00_0.01/challonge.webp"
                alt=""
                />
                <h1>Challonger</h1>
            </Link>

            <div className="login__container">
                <h1>Sign in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input 
                        type="text"
                        name="email"
                        value={userInfo.email}
                        onChange={inputHandler} 
                    />
                    <h5>Password</h5>
                    <input 
                        type="password"
                        name="password"
                        value={userInfo.password}
                        onChange={inputHandler}
                        autoComplete="on"
                    />
                    <button className="login__signIn" type="submit" disabled={disabledButton} onClick={login}>Sign in</button>
                </form>

                <p className="login__disclaimer">By continuing, you agree to Challonger's Condition of Use and Privacy Notice.</p>
                <button type="submit" disabled={disabledButton} onClick={register}>Create your Challonger Account</button>
            </div>
        </div>
    )
}
 
 
 
export default Login;
 