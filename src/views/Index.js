
import { getCurrentUser } from 'API/APIUtils';

import React, { useEffect, useState } from "react";
import Context from 'Context/Context';
import IndexPage from './IndexPage/IndexPage';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { ACCESS_TOKEN } from 'API/URLMapping';
import Login from './Auth/Login';
import { callbackify } from 'util';
import Admin from './admin/Admin';
import ProfilePage from 'components/Profile/ProfilePage';
import PrivateRoute from 'API/common/PrivateRoute';
import Cart from 'components/Cart/Cart';
import ProductOfCategory from 'components/ProductOfCategory/ProductOfCategory';
import ProductDetails from 'components/ProductDetails/ProductDetails';
import Shipping from 'components/Shipping/Shipping';
import Order from 'components/Order/Order';
import Search from 'components/Search/Search';


function Index(props) {
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
        setRole(response.role)
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
        {authen.authenticated&&authen.role==="ROLE_ADMIN"?(
           <Route path="/admin" component={Admin} />
        ):(console.log("No Access"))}
       
     
        <Route path="/profile-page" exact render={props => <ProfilePage authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} {...props} />} />
        <Route path="/product-of-category/:name/:id" exact render={props => <ProductOfCategory authenticated={authenticated}  onLogout={handleLogout} {...props} {...props} />} />
        {/* <Route path="/profile-page" exact render={props => <ProfilePage  {...props} />} /> */}
        <Route path="/mycart" exact render={props => <Cart authenticated={authenticated} onLogout={handleLogout}  {...props} />} />
        <Route path="/product-details/:name/:id" exact render={props => <ProductDetails authenticated={authenticated} onLogout={handleLogout} {...props} />} />
        <Route path="/shipping" exact render={props => <Shipping authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout}  {...props} />} />
        <Route path="/order" exact render={props => <Order authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout}  {...props} />} />
        <Route path="/search/keyword/:name"  render={props => <Search authenticated={authenticated}  onLogout={handleLogout}  {...props} />} />
      </BrowserRouter>

    </Context.Provider>


  );
}

export default Index;
