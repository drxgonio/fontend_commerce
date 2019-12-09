
import React, { useEffect } from "react";
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
  Container
} from "reactstrap";
import {

  Link

} from "react-router-dom";
import { Input, Icon } from 'antd';

const { Search } = Input;


function IndexNavbar(props) {
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

  return (

    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/"
            title="Coded by Creative Tim"
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
               <Search placeholder="Tìm kiếm sản phẩm" onSearch={value => console.log(value)} enterButton   />
  
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
                href="#"
                title="Theo dõi đơn hàng"
              >
                <i className="fa fa-twitter" />
                <p className="d-lg-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="#"
                target="_blank"
                title="Thông báo của tôi"
              >
                <Icon type="notification" />
                Thông báo
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="#"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fa fa-instagram" />
                <p className="d-lg-none">Instagram</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="#"
                target="_blank"
                title="Star on GitHub"
              >
                <i className="fa fa-github" />
                <p className="d-lg-none">GitHub</p>
              </NavLink>
            </NavItem>         
            <NavItem>
                <NavLink href="/profile-page">
                  <i className="nc-icon nc-book-bookmark" /> User Info
              </NavLink>
              </NavItem>
            <NavItem></NavItem>
            <NavItem>
                <NavLink >
                <Icon type="shopping-cart" /> Giỏ hàng
              </NavLink>
              </NavItem>
          
            <NavItem>
                <NavLink
                  onClick={props.onLogout}
                >
                  <i className="nc-icon nc-book-bookmark" /> Logout
              </NavLink>
              </NavItem>
            <NavItem>
              <Button
                className="btn-round"
                color="danger"
                href="#pablo"
                target="_blank"
                disabled
              >
                Upgrade to Pro
              </Button>
            </NavItem>                    
          </Nav>
           ) : (
            <Nav navbar>
        
            <NavItem>
                  <NavLink
                    data-placement="bottom"
                    href="#"
                    title="Follow us on Twitter"
                  >
                    <Icon type="notification" />
                  </NavLink>
                </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="#"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fa fa-twitter" />
                <p className="d-lg-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="#"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fa fa-facebook-square" />
                <p className="d-lg-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="#"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fa fa-instagram" />
                <p className="d-lg-none">Instagram</p>
              </NavLink>
            </NavItem>
                   
            <NavItem>
                <NavLink
                  href="/login"
                >
                  <i className="fa fa-github" /> Login
              </NavLink>
              </NavItem>
              <NavItem>
                <NavLink >
                <Icon type="shopping-cart" /> Giỏ hàng
              </NavLink>
              </NavItem>
            <NavItem>
              <Button
                className="btn-round"
                color="danger"
                href="#pablo"
                target="_blank"
                disabled
              >
                Upgrade to Pro
              </Button>
            </NavItem>         
          </Nav>
           )}

        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
