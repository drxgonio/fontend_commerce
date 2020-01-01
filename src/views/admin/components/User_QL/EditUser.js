import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../custom_design/Grid/GridItem.js";
import GridContainer from "../../custom_design/Grid/GridContainer.js";

import Card from "../../custom_design/Card/Card.js";
import CardHeader from "../../custom_design/Card/CardHeader.js";
import CardBody from "../../custom_design/Card/CardBody.js";
import { ACCESS_TOKEN } from "API/URLMapping";
import { API_BASE_URL } from "API/URLMapping";
import Axios from "axios";
import {
  Input,
  Row,
  Col,
  Button,
  
} from 'antd';
import { withRouter } from "react-router-dom"
import useForm from 'react-hook-form';
import { message } from 'antd';
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
const Select = React.forwardRef(({ label, register }, ref) => (
  <>
    <select name={label} ref={ref} class="form-control">
      <option value="ROLE_USER">User</option>
      <option value="ROLE_ADMIN">Admin</option>
    </select>
  </>
))
function EditUser(props) {

  const[id,setId]=React.useState(null);
  const[name,setName]=React.useState(null);
  const[email,setEmail]=React.useState(null);
  const[phone,setPhone]=React.useState(null);
  const[address,setAddress]=React.useState(null);

  React.useEffect( () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      }
      const feactData = async () => {
        const lst = await Axios.get(`http://localhost:8080/admin/user/findbyid?id=` + props.match.params.id,{headers:headers});
        setName(lst.data.name);
        setEmail(lst.data.email);
        setPhone(lst.data.phone);
        setAddress(lst.data.address);
        setId(lst.data.id);
      }
      feactData();
    }
    

  }, []);
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async data => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      }
  
      const response = await Axios.post("http://localhost:8080/admin/user/updateUser", data, {
        headers: headers
      });
      if (response.status === 200) {
        message.info('Cập nhập User thành công.');
        props.history.push("/admin/user")
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
            <h4 className={classes.cardTitleWhite}>Cập nhập Người dùng</h4>
        
          </CardHeader>
          <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
          
          <Row className="p-3">
                <Col md={4}>
                  <label>Mã người dùng</label>
                </Col>
                <Col md={4}>
                  <input className="form-control"  value={id}
                    ref={register} name="id"  disabled = {true}/>
                
                </Col>
              
               
              </Row>
          <Row className="p-3">
                <Col md={4}>
                  <label>Tên người dùng</label>
                </Col>
                <Col md={4}>
                  <input className="form-control" placeholder="Nhập tên người dùng" value={name}
                    ref={register({ required: true, maxlength: 20 })} name="name"  onChange={e => setName(e.target.value)}/>
                  {errors.name && <span style={{ color: "red" }}>Tên người dùng không được để trống</span>}
                </Col>
              
               
              </Row>
              <Row className="p-3">
                <Col md={4}>
                  <label>Email</label>
                </Col>
                <Col md={6}>
                  <input className="form-control" placeholder="Nhập Email" ref={register({ required: true })} name="email" value={email} onChange={e => setEmail(e.target.value)} disabled={true}/>
                  {errors.email && <span style={{ color: "red" }}>Email không được để trống</span>}

                </Col>
              </Row>
              <Row className="p-3">
                <Col md={4}>
                  <label>Số điện thoại</label>
                </Col>
                <Col md={6}>
                  <input className="form-control" placeholder="Nhập số điện thoại" type="number" ref={register({ required: true })} name="phone" value={phone} onChange={e => setPhone(e.target.value)}/>
                  {errors.phone && <span style={{ color: "red" }}>Số điện thoại không được để trống</span>}
                </Col>
              </Row>
              <Row className="p-3">
                <Col md={4}>
                  <label>Đại chỉ</label>
                </Col>
                <Col md={8}>
                  <input className="form-control" placeholder="Nhập địa chỉ" ref={register({ required: true })} name="address" value={address} onChange={e => setAddress(e.target.value)} />
                  {errors.address && <span style={{ color: "red" }}>Địa chỉ không được để trống</span>}
                </Col>
              </Row>
              <Row className="p-3">
                <Col md={4}>
                  <label>Quyền</label>
                </Col>
                <Col md={3}>
                  <Select label="role" ref={register} />

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
export default  withRouter(EditUser);
