import React, { useEffect, useRef, useState } from 'react'
import './Messages.css';
import apiRequests from '../../axios';
import { db } from '../../firebase';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../UserState';
import { Avatar } from '@material-ui/core';
 
 
 
const Messages = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState();
    const messagesRef = useRef();
    const params = useParams();
    const [{user}] = useStateValue();


    useEffect(() => {
        if(user && params.id) {
            db.collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    sender: doc.data().sender,
                    receiver: doc.data().receiver,
                    content: doc.data().content,
                    timestamp: doc.data().timestamp,
                    included: doc.data().included,
                    options: doc.data().options,
                })))
            })
        }
        
    }, [params])
    
    
    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current?.scrollHeight
    }, [messages])


    useEffect(() => {
        const included = [user.email, params.id];
        
        setFilteredMessages(messages.filter((message) => {
            const areIncluded = included.every((el) => { return message.included?.includes(el) });
            return areIncluded;
        }))
    }, [params, messages])
    


    const actionHandler = (e) => {
      if(e.target.id === "get_tournaments") {
        apiRequests();
      }
    }


  return (
    <div className="messages" ref={messagesRef}>
        {filteredMessages?.map((message, index) => (
            <div key={index}>
                <div className={message.sender.email === user?.email ? "messageItem messageItem__sender": "messageItem"}>
                    <Avatar className="messageItem__photo"/>
                    <div className="messageItem__right">
                        <div className="messageItem__header">
                            <h4>{message.sender.email}</h4>
                            {/* <span>{new Date(message.timestamp?.toDate()).toLocaleString()}</span> */}
                        </div>
                        <div>{parse(message.content)}</div>
                    </div>
                </div>

                <div className="messageItem__options">
                    {message.options?.map((option, index) => (
                        <button
                            className="messageItem__option"
                            onClick={actionHandler}
                            id={option.action}
                            key={index}
                        >{option.description}
                        </button>
                    ))}
                </div>
            </div>
            )
        )}

        
    </div>
  )
}
 
 
 
export default Messages;
 