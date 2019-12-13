
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
import { withRouter } from "react-router-dom"

import {

  Link, Redirect

} from "react-router-dom";
import { Input, Icon } from 'antd';
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


  const [value, setvalue] = React.useState("");


  function searchProduct(value) {
    props.history.push("/search/keyword/"+value);
  }


  return (

    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      {console.log(authen.role)}
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
                  href="#"
                  title="Theo dõi đơn hàng"
                >
                  <Icon type="rollback" />
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

                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/profile-page"
                  data-placement="bottom"
                  title="Thông tin User">
                  <Icon type="user" />
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/mycart"
                  data-placement="bottom"
                  title="Giỏ hàng">
                  <Icon type="shopping-cart" />
                </NavLink>
              </NavItem>
              {authen.role==="ROLE_ADMIN"?(
                <NavItem>
                <NavLink href="/admin"
                  data-placement="bottom"
                  title="Admin">
                  <Icon type="solution" />
                </NavLink>
              </NavItem>
              ):(console.log("No access"))}
              

              <NavItem>
                <NavLink
                  data-placement="bottom"
                  href="#"
                  title="Đăng xuất"
                  onClick={props.onLogout}
                >
                  <Icon type="key" />
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
                    title="Theo dõi đơn hàng"
                  >
                    <Icon type="rollback" />
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

                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    data-placement="bottom"
                    href="#"
                    title="Đăng nhập"
                    href="/login"
                  >
                    <Icon type="key" />
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
                  </Button>
                </NavItem>
              </Nav>
            )}

        </Collapse>
      </Container>
    </Navbar>
  );
}

export default withRouter(IndexNavbar);
