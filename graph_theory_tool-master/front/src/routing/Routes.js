import React, {useState, useEffect} from 'react';
import { Switch, HashRouter as Router, Route, Redirect} from 'react-router-dom';
import Data from '../display/data/Data';
import TokenPage from '../display/authtokens/TokenPage';

export default function Routes() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const login = (email) => {
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("email", email);
    setLoggedIn(true);
  }

  const logOut = () => {
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("email");
    setLoggedIn(false);
  }

  useEffect(() => {
    if(localStorage.getItem("loggedIn") == "true") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  
  }, []);

  return (
      <Router>
        <Switch>
          <Route exact path="/"><Data loggedIn={loggedIn} login={login} logout={logOut}/></Route>
          <Route exact path="/confirm_email/:token" component={() => <TokenPage loggedIn={loggedIn} login={login}/>}/>
          <Route path='/'><Redirect to='/'/></Route>
        </Switch>
      </Router>
  )
}
