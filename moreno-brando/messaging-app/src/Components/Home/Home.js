import React, { useState } from 'react'
import './Home.css';
import MessageScreen from '../Messages/MessageScreen';
import { useStateValue } from '../UserState';
import Sidebar from '../Sidebar/Sidebar';
import { useParams } from 'react-router-dom';

 
 
const Home = () => {
  const [{user}] = useStateValue();
  const params = useParams();

  return (
    <div className="home">
      { user && 
        <div className="home__messageContainer">
          { params.id && <MessageScreen /> }
          <Sidebar />
        </div>
      }
    </div>
  )
}

export default Home;
 