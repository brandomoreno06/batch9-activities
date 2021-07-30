import { PanoramaSharp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getTournaments } from '../../axios';
import { db } from '../../firebase';
import './AutoMessage.css';
 
 
 
const AutoMessage = (props) => {
    const params = useParams();
    const [autoMessage, setAutoMessage] = useState();
    const [requestedData, setRequestedData] = useState();
  
    db.collection('autoMessage').onSnapshot((snapshot) => {
        setAutoMessage(snapshot.docs.map((doc) => ({
            content: doc.data().content,
            option: doc.data().option,
            sender: doc.data().sender,
            type: doc.data().type,
        }))
    )})

    const actionHandler = (e) => {
        console.log('TEST')
        console.log(e.currentTarget.id)
        if(e.target.id === "get_tournaments") {
            getTournaments(); //CONSOLE.LOG
        }
    }

  return (
    <div className="autoMessage">
        {autoMessage?.filter((message) => {
            return message.sender.email === params.id
        }).map((message) => (
            <button
                className="autoMessage__option"
                onClick={actionHandler}
                id={message.option.action}
                key={message.option.action}
            >{message.option.description}</button>
        ))
        }
    </div>
  )
}
 
 
 
export default AutoMessage;
 