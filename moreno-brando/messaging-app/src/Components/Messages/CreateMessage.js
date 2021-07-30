import React, { useRef, useState } from 'react'
import './CreateMessage.css';
import SendIcon from "@material-ui/icons/Send";
import { db } from '../../firebase';
import firebase from 'firebase';
import { useStateValue } from '../UserState';
import { useParams } from 'react-router-dom';
 
 
 
const CreateMessage = (props) => {

    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(true);
    const textBox = useRef();
    const [{user}] = useStateValue();
    const params = useParams();


    const inputMessage = (e) => {
        setMessage(e.target.innerHTML);
        e.target.innerHTML ? setDisabled(false) : setDisabled(true);
    }

    const sendMessage = () => {
        db.collection('messages').add({
            type: "page",
            message_id: "",
            content: message,
            sender: {email: user.email, uid: user.email},
            receiver: {email: params.id, uid: params.id},
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            included: [user.email, params.id],
        })
        textBox.current.innerHTML = "";
        setDisabled(true);
    }


    return (
        <div className="createMessage">
            <div
                className="createMessage__input"
                ref={textBox}
                contentEditable={true}
                spellCheck={false}
                onInput={inputMessage}
            >
            </div>

            <button
                type="submit"
                className="createMessage_sendButton"
                disabled={disabled}
                onClick={sendMessage}
            >
                <SendIcon className="sendButton"/>
            </button>
        </div>
    )
}
 
 
 
export default CreateMessage;
 