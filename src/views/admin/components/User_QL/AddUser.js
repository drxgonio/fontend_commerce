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
      <option value="ROLE_USER">User</option>
      <option value="ROLE_ADMIN">Admin</option>
    </select>
  </>
))

function AddUser(props) {

  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = async data => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      }
      const response = await Axios.post(API_BASE_URL + "/user/adduser", data, {
        headers: headers
      });
      if (response.status === 200) {
        message.info('Thêm User thành công.');
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
            <h4 className={classes.cardTitleWhite}>Thêm Người dùng</h4>

          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row className="p-3">
                <Col md={4}>
                  <label>Tên người dùng</label>
                </Col>
                <Col md={4}>
                  <input className="form-control" placeholder="Nhập tên người dùng"
                    ref={register({ required: true, maxlength: 20 })} name="name" />
                  {errors.name && <span style={{ color: "red" }}>Tên người dùng không được để trống</span>}
                </Col>
              </Row>
              <Row className="p-3">
                <Col md={4}>
                  <label>Email</label>
                </Col>
                <Col md={6}>
                  <input className="form-control" placeholder="Nhập Email" ref={register({ required: true })} name="email" />
                  {errors.email && <span style={{ color: "red" }}>Email không được để trống</span>}

                </Col>
              </Row>
              <Row className="p-3">
                <Col md={4}>
                  <label>Số điện thoại</label>
                </Col>
                <Col md={6}>
                  <input className="form-control" placeholder="Nhập số điện thoại" type="number" ref={register({ required: true })} name="phone" />
                  {errors.phone && <span style={{ color: "red" }}>Số điện thoại không được để trống</span>}
                </Col>
              </Row>
              <Row className="p-3">
                <Col md={4}>
                  <label>Đại chỉ</label>
                </Col>
                <Col md={8}>
                  <input className="form-control" placeholder="Nhập địa chỉ" ref={register({ required: true })} name="address" />
                  {errors.address && <span style={{ color: "red" }}>Địa chỉ không được để trống</span>}
                </Col>
              </Row>
              <Row className="p-3">
                <Col md={4}>
                  <label>Mật khẩu</label>
                </Col>
                <Col md={4}>
                  <input className="form-control" placeholder="Nhập mật khẩu" ref={register({ required: true })} name="password" type="password" />
                  {errors.password && <span style={{ color: "red" }}>Mật khẩu không được để trống</span>}
                </Col>
                <Col md={2}></Col>
                <Col md={4}>
                  <label>Xác nhận mật khẩu</label>
                </Col>
                <Col md={4}>
                  <input className="form-control" placeholder="Xác nhận mật khẩu" name="passwordConfirm" type="password"
                    ref={register({
                      validate: (value) => {
                        return value === watch('password'); // value is from password2 and watch will return value from password1
                      }
                    })} />
                  {errors.passwordConfirm && <span style={{ color: "red" }}>Mật khẩu nhập lại chưa chính xác</span>}

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
export default withRouter(AddUser);