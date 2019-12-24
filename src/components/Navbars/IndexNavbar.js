
import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row
} from "reactstrap";
import { withRouter } from "react-router-dom"


import { Input, Icon,Badge  } from 'antd';
import Context from "Context/Context";


const { Search } = Input;


function IndexNavbar(props) {
  const authen=React.useContext(Context);
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });



  function searchProduct(value) {
    props.history.push("/search/keyword/"+value);
  }


  return (

    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/"
            title="Coded by Phan Van Tri"
          >
            Ecommerce
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <NavbarBrand >
          <Search placeholder="Tìm kiếm sản phẩm" onSearch={value => searchProduct(value)} enterButton />
        </NavbarBrand>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          {props.authenticated ? (
            <Nav navbar>

<NavItem>
                <NavLink
                  data-placement="bottom"
                  href="/map"
                  title="Địa chỉ của hàng" className="pr-3 mr-3"
                >
                  <Row className="pl-3 pb-2"><Icon type="home" /></Row>
                  <Row ><small >Address</small></Row>

                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  data-placement="bottom"
                  href="#"
                  target="_blank"
                  title="Thông báo của tôi" className="pr-3 mr-3"
                >

                  <Row className="pl-4 pb-2"> <Icon type="notification" /></Row>
                  <Row> <small >Notification</small></Row>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/profile-page"
                  data-placement="bottom"
                  title=" User" className="pr-3 mr-3">

                  <Row className="pl-1 pb-2">  <Icon type="user" /></Row>
                  <Row> <small > User</small></Row>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/mycart"
                  data-placement="bottom"
                  title="Giỏ hàng" className="pr-3 mr-3">

                  <Row className="pl-1 pb-2"> <Icon type="shopping-cart" /></Row>
                  <Row> <small > Cart</small></Row>
                </NavLink>
              </NavItem>
              {authen.role==="ROLE_ADMIN"?(
               <NavItem>
               <NavLink href="/admin"
                 data-placement="bottom"
                 title="Admin" className="pr-3 mr-3">

                 <Row className="pl-1 pb-2"> <Icon type="solution" /></Row>
                 <Row> <small > ADMIN</small></Row>
               </NavLink>
             </NavItem>
           ) : (<NavItem></NavItem>)}

           <NavItem>
             <NavLink
               data-placement="bottom"
               href="#"
               title="Đăng xuất"
               onClick={props.onLogout}
             >

               <Row className="pl-2 pb-2"> <Icon type="key" /></Row>
               <Row> <small > Logout</small></Row>
             </NavLink>
           </NavItem>
              <NavItem>
               
              </NavItem>
            </Nav>
          ) : (
              <Nav navbar>

<NavItem>
                  <NavLink
                    data-placement="bottom"
                    href="/map"
                    title="Địa chỉ của hàng" className="pr-3 mr-3"
                  >
                    <Row className="pl-3 pb-2"><Icon type="home" /></Row>
                    <Row ><small >Address</small></Row>

                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    data-placement="bottom"
                    href="#"
                    target="_blank"
                    title="Thông báo của tôi"
                    className="pr-3 mr-3"
                  >

                    <Row className="pl-3 pb-2"> <Icon type="notification" /></Row>
                    <Row> <small >Notification</small></Row>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    data-placement="bottom"
                    title="Đăng nhập"
                    href="/login"
                   
                  >

                    <Row className="pl-2 pb-2 ">  <Icon type="key" /></Row>
                    <Row> <small >Login</small></Row>
                  </NavLink>
                </NavItem>
                
              </Nav>
            )}

        </Collapse>
      </Container>
    </Navbar>
  );
}

export default withRouter(IndexNavbar);
