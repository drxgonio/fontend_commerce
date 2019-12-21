import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../custom_design/Grid/GridItem.js";
import GridContainer from "../../custom_design/Grid/GridContainer.js";

import Card from "../../custom_design/Card/Card.js";
import CardHeader from "../../custom_design/Card/CardHeader.js";
import CardBody from "../../custom_design/Card/CardBody.js";

import {
  Input,
  Row,
  Col,
  Button
} from 'antd';
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function AddCategory() {

 

  const classes = useStyles();
  return (
    
    <GridContainer>
    
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Thêm danh mục</h4>
        
          </CardHeader>
          <CardBody>
          <Row className="p-3">
              <Col md={4}>
                <label>Tên người dùng</label> 
              </Col>
              <Col md={4}>
                <Input placeholder="Basic usage" />
              </Col>
            </Row>
            <Row className="p-3">
              <Col md={4}>
                <label>Email</label> 
              </Col>
              <Col md={6}>
                <Input placeholder="Basic usage" />
              </Col>
            </Row>
            <Row className="p-3">
              <Col md={4}>
                <label>Số điện thoại</label> 
              </Col>
              <Col md={6}>
                <Input placeholder="Basic usage" />
              </Col>
            </Row>
            <Row className="p-3">
              <Col md={4}>
                <label>Đại chỉ</label> 
              </Col>
              <Col md={8}>
                <Input placeholder="Basic usage" />
              </Col>
            </Row>
            <Row className="p-3">
              <Col md={4}>
                <label>Mật khẩu</label> 
              </Col>
              <Col md={4}>
                <Input placeholder="Basic usage" />
              </Col>
              <Col md={2}></Col>
              <Col md={4}>
                <label>Xác nhận mật khẩu</label> 
              </Col>
              <Col md={4}>
                <Input placeholder="Basic usage" />
              </Col>
             
            </Row>
            <Row className="p-3">
              <Col md={4}>
                <label>Quyền</label> 
              </Col>
              <Col md={3}>
                <Input placeholder="Basic usage" />
              </Col>
            </Row>
            <Row className="p-3">
              <Col md={16}>
               
              </Col>
              <Col md={4}>
              <Button type="primary">Thêm</Button>
  
              </Col>
            </Row>

          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
