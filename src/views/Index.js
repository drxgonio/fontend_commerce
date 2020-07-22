
import { getCurrentUser } from 'API/APIUtils';

import React, { useEffect, useState } from "react";
import Context from 'Context/Context';
import IndexPage from './IndexPage/IndexPage';
import { BrowserRouter, Route} from "react-router-dom";
import { ACCESS_TOKEN } from 'API/URLMapping';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgetPassword from './Auth/ForgetPassword';
import { message } from 'antd'

import Admin from './admin/Admin';
import ProfilePage from 'components/Profile/ProfilePage';
import ImageUpload from 'components/ImageUpload/ImageUpload';

import Cart from 'components/Cart/Cart';
import ProductOfCategory from 'components/ProductOfCategory/ProductOfCategory';
import ProductDetails from 'components/ProductDetails/ProductDetails';
import Shipping from 'components/Shipping/Shipping';
import Order from 'components/Order/Order';
import Search from 'components/Search/Search';
import MapAddress from 'components/MapAddress/MapAddress.js';
import OAuth2RedirectHandler from 'API/oauth2/OAuth2RedirectHandler';
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
  const [role, setRole] = useState("ROLE_USER");
  const [currentUser, setCurrentUser] = useState(null);
  // Similar to componentDidMount and componentDidUpdate:

  useEffect(() => {
    
    getCurrentUser()
      .then(response => {
      
        setAuthenticated(true)
        setCurrentUser(response);
        localStorage.setItem("address",response.address)
        setRole(response.role)
      }).catch(error => {

        
      });

  }, [authenticated]);


  
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
    window.location.reload()
  
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
        <Route path="/upload" exact render={props => <ImageUpload authenticated={authenticated} {...props} />} />
      
        <Route path="/forget-password" exact render={props => <ForgetPassword authenticated={authenticated} {...props} />} />
        <Route path="/map" exact render={props => <MapAddress authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout}  {...props} />} />
        {authen.authenticated&&authen.role==="ROLE_ADMIN"?(
        <Route path="/admin" component={Admin} />
       
        
        ):(<Route/>)}
        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route> 
        <Route path="/register" exact render={props => <Register authenticated={authenticated} {...props} />} />
        <Route path="/profile-page" exact render={props => <ProfilePage authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout} {...props} />} />
        <Route path="/product-of-category/:name/:id" exact render={props => <ProductOfCategory authenticated={authenticated}  onLogout={handleLogout} {...props} {...props} />} />
        {/* <Route path="/profile-page" exact render={props => <ProfilePage  {...props} />} /> */}
        <Route path="/mycart" exact render={props => <Cart authenticated={authenticated} onLogout={handleLogout}  {...props} />} />
        <Route path="/product-details/:name/:id"  render={props => <ProductDetails authenticated={authenticated} onLogout={handleLogout} {...props} />} />
        <Route path="/shipping" exact render={props => <Shipping authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout}  {...props} />} />
        <Route path="/order" exact render={props => <Order authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout}  {...props} />} />
        <Route path="/search/keyword/:name"  render={props => <Search authenticated={authenticated}  onLogout={handleLogout}  {...props} />} />
        {/* <Route path="/admin/add-user"  render={props => <AddUser authenticated={authenticated}  onLogout={handleLogout}  {...props} />} />
   */}   </BrowserRouter> 

    </Context.Provider>


  );
}

export default Index;
