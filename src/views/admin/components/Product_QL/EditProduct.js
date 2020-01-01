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
import axios from 'axios';

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
// you can use React.forwardRef to pass the ref too
const Select = React.forwardRef(({ label, register }, ref) => (
  <>
    <select name={label} ref={ref} class="form-control">
    <option value="false">Sản phẩm cũ</option>
      <option value="true">Sản phẩm mới</option>
     
    </select>
  </>
))


export default function EditProduct(props) {


  const { register, handleSubmit, watch, errors } = useForm();
  const[id,setId]=React.useState(null);
  const[name,setName]=React.useState(null);
  const[price,setPrice]=React.useState(null);
  const[pricesale,setPricesale]=React.useState(null);
  const[description,setDescription]=React.useState(null);
  const[status,setStatus]=React.useState(null);
  const[color,setColor]=React.useState(null);
  const[idproductdetail,setIdproductdetail]=React.useState(null);
  
  
  React.useEffect( () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      }
      const feactData = async () => {
        const lst = await Axios.get(`http://localhost:8080/api/admin/product/findbyid?id=` + props.match.params.id,{headers:headers});
        console.log(lst.data)
        setId(lst.data.id);
        setName(lst.data.name);
        setPrice(lst.data.product_details.price);
        setPricesale(lst.data.product_details.pricesale);
        setDescription(lst.data.product_details.description);
        setStatus(lst.data.product_details.status);
        setColor(lst.data.product_details.color);
        setIdproductdetail(lst.data.product_details.id)
        
      }
      feactData();
    }
    

  }, []);
  const onSubmit = async data => {
    console.log(data)
    if (localStorage.getItem(ACCESS_TOKEN)) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      }
  
      const response = await Axios.post("http://localhost:8080/api/admin/user/updateProduct", data, {
        headers: headers
      });
      if (response.status === 200) {
        message.info('Cập nhập Sản phẩm thành công.');
         props.history.push("/admin/product")
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
            <h4 className={classes.cardTitleWhite}>Cập nhập sản phẩm</h4>

          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input className="form-control"  value={idproductdetail}
                    ref={register} name="idproductdetail"  type="hidden"/>
             <Row className="p-3">
            <Col md={4}>
                  <label>Mã sản phẩm</label>
                </Col>
                <Col md={4}>
                  <input className="form-control"  value={id}
                    ref={register} name="id"  disabled = {true}/>
                
                </Col>
              
               
              </Row>
          <Row className="p-3">
                <Col md={4}>
                  <label>Tên Sản phẩm</label>
                </Col>
                <Col md={4}>
                  <input className="form-control" placeholder="Nhập tên người dùng" value={name}
                    ref={register({ required: true, maxlength: 20 })} name="name"  onChange={e => setName(e.target.value)}/>
                  {errors.name && <span style={{ color: "red" }}>Tên sản phẩm không được để trống</span>}
                </Col>
              
               
              </Row>
              <Row className="p-3">
                <Col md={4}>
                  <label>Giá</label>
                </Col>
                <Col md={4}>
                  <input className="form-control" type="number" placeholder="Nhập Giá" ref={register({ required: true })} name="price" value={price} onChange={e => setPrice(e.target.value)}/>
                  {errors.price && <span style={{ color: "red" }}>Giá không được để trống</span>}

                </Col>
                <Col md={2}></Col>
                <Col md={4}>
                  <label>Giá Sale</label>
                </Col>
                <Col md={4}>
                  <input className="form-control" type="number" placeholder="Nhập Giá" ref={register({ required: true })} name="pricesale" value={pricesale} onChange={e => setPricesale(e.target.value)}/>
                  {errors.pricesale && <span style={{ color: "red" }}>Giá Sale không được để trống</span>}

                </Col>
              </Row>
              <Row className="p-3">
                <Col md={4}>
                  <label>Mô tả</label>
                </Col>
                <Col md={16}>
                  <input className="form-control" placeholder="Nhập tên người dùng" value={description}
                    ref={register({ required: true, maxlength: 20 })} name="description"  onChange={e => setDescription(e.target.value)}/>
                  {errors.description && <span style={{ color: "red" }}>Mô tả không được để trống</span>}
                </Col>
                 
              </Row>
              <Row className="p-3">
                <Col md={4}>
                  <label>Tình trạng</label>
                </Col>
                <Col md={4}>
                    <Select label="status" ref={register} />
                </Col>
                <Col md={2}></Col>
                <Col md={4}>
                  <label>Màu sắc</label>
                </Col>
                <Col md={4}>
                  <input className="form-control"  placeholder="Nhập Màu sắc" ref={register({ required: true })} name="color" value={color} onChange={e => setColor(e.target.value)}/>
                  {errors.color && <span style={{ color: "red" }}>Màu sắc không được để trống</span>}

                </Col>
              
               
              </Row>
              
              <Row className="p-3">
                <Col md={16}>

                </Col>
                <Col md={4}>
                  <input type="submit" className="btn btn-warning" value="Cập nhập" />

                </Col>
              </Row>
            </form>
           

          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
  );
}
