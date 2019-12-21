import React, {  useEffect } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar";
import useForm from '../../Aform/useForm.js';
import { withRouter } from "react-router-dom"

import {  API_BASE_URL } from 'API/URLMapping';
import { message } from 'antd';
import Axios from "axios";

function ForgetPassword(props) {
  //get user


  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };

  });

  useEffect(() => {
    if (props.authenticated) {
      props.history.push("/");
    }
  }, [props.authenticated])
  const { values, handleChange, handleSubmit } = useForm(sendPassword);
  async function sendPassword() {
    
      const response = await Axios.post(API_BASE_URL + "/auth/resetpassword", values);
      if(response.status === 200){
        message.info('Mật khẩu được gửi về Email.. Vui lòng check Email để đăng nhập!!!');
        props.history.push("/login");
        
      }
      else{
        message.error('Đã có lỗi xảy ra!');
      }
  }




  return (
    <>

      <IndexNavbar />
      <div
        className="section section-image section-login"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      >
        <Container>
          <Row>
            <Col className="mx-auto" lg="4" md="6">
              <Card className="card-register">
                <h3 className="title mx-auto">Ecommerce</h3>
                <Form className="register-form" onSubmit={handleSubmit}>
                  <label>Nhập Email</label>
                  <InputGroup className="form-group-no-border">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText >
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" name="email" onChange={handleChange} value={values.email} required />
                  </InputGroup>

                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="submit"
                  >
                    Reset Password
                  </Button>
                </Form>

              </Card>

            </Col>
          </Row>
        </Container>
      </div>{" "}
    </>
  );
}
export default withRouter(ForgetPassword);