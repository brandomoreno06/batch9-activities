import React, { useState } from 'react'
import './Header.css';
import logo from "../../assets/Challonge_2012.png";
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../UserState';
import { Avatar } from '@material-ui/core';
import { auth } from '../../firebase';
import { ExpandMoreOutlined } from '@material-ui/icons';
 
 
 
const Header = (props) => {

    const [{user}, dispatch] = useStateValue();
    const [displaySettings, setDisplaySettings] = useState(false);
    const history = useHistory();

    const showSettings = ()=> {
        setDisplaySettings((value) => !value)
    }

    const logout = () => {
        auth.signOut();
        setDisplaySettings(false);
        console.log(history)
        history.push('/login')
        console.log(history)
    }

    
    return (
        <div className="header">
            <div className="header__left">
                <img
                    className="header__logo"
                    src={logo}
                    alt="challonger"
                />
                <h2>Challonger</h2>
            </div>
            <div className="header__middle">
                
            </div>
            <div className="header__right">
                {user ?
                    <>
                        <Avatar className="header__avatar header__icon" onClick={showSettings}/>
                        <h4>{user?.email.split('@').shift()}</h4>
                        <ExpandMoreOutlined className="header__icon" onClick={showSettings}/>
                    </> :
                    <>
                        <Link to="../login" className="headerOption">
                        <span>Log in</span>
                        </Link>
                        <Link to="./login" className="headerOption">
                            <span className="headerOption__signup">Sign up</span>
                        </Link>
                    </> 
                }
                
            </div>
            { displaySettings && 
                <div className="header__settings">
                    <span onClick={logout}>Log out</span>
                </div> 
            }
        </div>
    )
}
 
 
 
export default Header;
 