import { Avatar } from '@material-ui/core';
import React from 'react'
import { useParams } from 'react-router-dom';
import AutoMessage from './AutoMessage';
import CreateMessage from './CreateMessage';
import Messages from './Messages';
import './MessageScreen.css';

 
 
const MessageScreen = (props) => {
  const params = useParams();

  return (
    <div className="messageScreen">
      <div className="messageScreen__header">
        <Avatar className="messageScreen__header__avatar"/>
        <h2 className="messages__receiver">{params.id}</h2>
      </div>
      <Messages />
      <CreateMessage />
      <AutoMessage />
    </div>
  )
}
 
 
 
export default MessageScreen   ;
 