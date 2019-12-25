import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../custom_design/Grid/GridItem.js";
import GridContainer from "../../custom_design/Grid/GridContainer.js";
import useForm from 'react-hook-form';
import Card from "../../custom_design/Card/Card.js";
import CardHeader from "../../custom_design/Card/CardHeader.js";
import CardBody from "../../custom_design/Card/CardBody.js";
import { ACCESS_TOKEN } from "API/URLMapping";
import { API_BASE_URL } from "API/URLMapping";
import Axios from "axios";
import { message } from 'antd';
import { withRouter } from "react-router-dom"
import {
  Input,
  Row,
  Col,
  Button,
} from 'antd';
import ImageUpload from 'components/ImageUpload/ImageUpload';

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

export default function AddCategory(props) {

  const { register, handleSubmit, watch, errors } = useForm();
  const [url,setUrl]=React.useState('');
  const onSubmit = async data => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      }
      const response = await Axios.post(API_BASE_URL + "/api/addcategory", data, {
        headers: headers
      });
      if (response.status === 200) {
        message.info('Thêm Danh mục thành công.');
        props.history.push("/admin/category")
      }
      else {
        message.error('Đã có lỗi xảy ra.');
      }
   
    }
   
  }

  const classes = useStyles();
  return (
    
    <GridContainer>
    
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Thêm danh mục</h4>
        
          </CardHeader>
          <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
              <Row className="p-3">
                <Col md={4}>
                  <label>Tên danh mục</label>
                </Col>
                <Col md={4}>
                  <input className="form-control" placeholder="Nhập tên danh mục"
                    ref={register({ required: true, maxlength: 20 })} name="name" />
                  {errors.name && <span style={{ color: "red" }}>Tên danh mục không được để trống</span>}
                </Col>
             
               
              </Row>
              <Row className="p-3">
                <Col md={4}>
                 
                </Col>
                <Col md={2}>
                  <label>Danh mục 1</label>
                </Col>
                <Col md={6}>
                  <input className="form-control" placeholder="Nhập Danh mục 1" ref={register({ required: true })} name="danhmuc1" />
                  {errors.danhmuc1 && <span style={{ color: "red" }}>Danh mục 1 không được để trống</span>}

                </Col>
              </Row>
              <Row className="p-3">
                <Col md={4}>
                 
                </Col>
                <Col md={2}>
                  <label>Danh mục 2</label>
                </Col>
                <Col md={6}>
                  <input className="form-control" placeholder="Nhập Danh mục 2" ref={register({ required: true })} name="danhmuc2" />
                  {errors.danhmuc2 && <span style={{ color: "red" }}>Danh mục 2 không được để trống</span>}

                </Col>
              </Row>
              <Row className="p-3">
                <Col md={4}>
                 
                </Col>
                <Col md={2}>
                  <label>Danh mục 3</label>
                </Col>
                <Col md={6}>
                  <input className="form-control" placeholder="Nhập Danh mục 3" ref={register({ required: true })} name="danhmuc3" />
                  {errors.danhmuc3 && <span style={{ color: "red" }}>Danh mục 3 không được để trống</span>}

                </Col>
              </Row>
            
              <Row className="p-3">
                <Col md={16}>

                </Col>
                <Col md={4}>
                  <input type="submit" className="btn btn-warning" value="Thêm" />

                </Col>
              </Row>
            </form>


          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}
