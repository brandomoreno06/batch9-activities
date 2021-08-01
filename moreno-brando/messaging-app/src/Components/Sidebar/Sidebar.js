import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import { db } from '../../firebase';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../UserState';
 
 
 
const Sidebar = () => { 
    const [users, setUsers] = useState([]);
    const [{user}] = useStateValue();
    const history = useHistory();

    db.collection('users').onSnapshot((snapshot) => {
        setUsers(snapshot.docs.map((doc) => ({
            id: doc.data().id,
            data: doc.data(),
        })).filter((data) => { return data.data.email !== user?.email })
    )})

    
    
    const openChat = (e) => {
        history.push(`/messages/${e.target.id}`)

    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <h2>Chats</h2>
            </div>
            <div className="sidebar__chats">
                {users.map((user) => (
                    <h4
                        className="sidebar__chats__name"
                        key={user.data.uid}
                        id={user.data.uid}
                        type={user.data.type}
                        onClick={openChat}
                    >
                        {user.data.email}
                    </h4>
                ))}
            </div>
        </div>
    )
}
 
 
 
export default Sidebar;
