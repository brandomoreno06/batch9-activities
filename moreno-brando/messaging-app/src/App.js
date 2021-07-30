import { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import { useStateValue } from './Components/UserState';
import { auth } from "./firebase";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import apiRequests from './axios';


function App() {
  
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    const authorization = auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      } else {
        dispatch({
          type: "LOGOUT_USER",
          user: null,
        })
      }
    })
    return () => authorization();
  }, [])

  // useEffect(() => {
  //   apiRequests();
  // }, [])


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Header />
            <Home />
          </Route>
          <Route path={"/messages/:id"} exact>
            <Header />
            <Home />
          </Route>
          <Route path="/login" component={Login} exact/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
