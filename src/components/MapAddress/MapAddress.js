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
import NarbarGlobal from "components/Navbars/NarbarGlobal";
import { withRouter } from "react-router-dom"

import {  API_BASE_URL } from 'API/URLMapping';
import { message } from 'antd';
import Axios from "axios";
import Map_Google from "views/admin/components/Map/Map_Google.js";
function MapAddress(props) {
  //get user


  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };

  });

 




  return (
    <>

    <NarbarGlobal authenticated={props.authenticated} onLogout={props.onLogout} />
     
        <Container>
        <Card >
                <h3 className="title mx-auto">Địa chỉ các cửa hàng toàn quốc</h3>
                <Form  >
                    <Map_Google></Map_Google>
                </Form>

              </Card>
        </Container>
      
    </>
  );
}
export default withRouter(MapAddress);