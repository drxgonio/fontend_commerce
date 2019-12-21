
import React from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import { Redirect } from 'react-router-dom'
// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import useForm from '../../Aform/useForm.js';
import { signup } from 'API/APIUtils';
import { message } from 'antd';
function Register(props) {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  const { values, handleChange, handleSubmit } = useForm(login);
  function login() {   
    console.log(values);
    signup(values)
    .then(response => {
      message.info('Tạo tài khoản thành công. Hãy đăng nhập!!!');
        props.history.push("/login");
    }).catch(error => {
      message.error('Email đã tồn tại hoặc không hợp lệ!!!')
    });
        
   
  }

  return (
    <>
      <IndexNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Ecommerce</h3>
                <Form className="register-form" onSubmit={handleSubmit}>
                  <label>Email</label>
                  <Input placeholder="Email" name="email" type="text" onChange={handleChange} value={values.email} required/>
                  <label>Username</label>
                  <Input placeholder="Name" name="name" type="text" onChange={handleChange} value={values.name} required/>
                  <label>Password</label>
                  <Input placeholder="Password" name="password" type="password"  onChange={handleChange} value={values.confirmpassword} required/>
                  <Button block className="btn-round" color="danger">
                    Register
                  </Button>
                </Form>
                <div className="forgot">
                  <Button
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Forgot password?
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" /> by Phan Van Tri
          </h6>
        </div>
      </div>
    </>
  );
}

export default Register;
