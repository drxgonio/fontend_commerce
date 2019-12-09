
import { getCurrentUser } from 'API/APIUtils';

import React, { useEffect, useState } from "react";
import Context from 'Context/Context';
import IndexPage from './IndexPage.js/IndexPage';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { ACCESS_TOKEN } from 'API/URLMapping';
import Login from './Auth/Login';
import { callbackify } from 'util';
import Admin from './admin/Admin';
import ProfilePage from 'components/Profile/ProfilePage';
import PrivateRoute from 'API/common/PrivateRoute';


function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  //login

  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("User");
  const [currentUser, setCurrentUser] = useState(null);
  // Similar to componentDidMount and componentDidUpdate:

  useEffect(() => {
    getCurrentUser()
      .then(response => {
        setAuthenticated(true)
        setCurrentUser(response);
      }).catch(error => {

        console.log(error);
      });

  }, []);


  
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);

  };
  const authen = {
    authenticated,
    role
  }

  function callbackSuccessfull(){
    setAuthenticated(true);

  }


  return (

    <Context.Provider value={authen}>
      <BrowserRouter>

        <Route path="/" exact render={props => <IndexPage authenticated={authenticated} onLogout={handleLogout} {...props} />} />
        <Route path="/login" exact render={props => <Login authenticated={authenticated} loginSuccess={callbackSuccessfull} {...props} />} />
        <Route path="/admin" component={Admin} />
        {/* <Route path="/profile-page" authenticated={authenticated} currentUser={currentUser}
                component={ProfilePage}>        

        </Route>*/}
        {/* <Route path="/profile-page" exact render={props => <ProfilePage authenticated={authenticated} currentUser={currentUser} {...props} />} /> */}
        <Route path="/profile-page" exact render={props => <ProfilePage  {...props} />} />
      </BrowserRouter>

    </Context.Provider>


  );
}

export default Index;
