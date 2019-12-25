
import React, { useEffect } from "react";

// reactstrap components
import {
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// core components
import DemoFooter from "components/Footers/DemoFooter.js";

import { Radio, Checkbox } from 'antd';

import NarbarGlobal from "components/Navbars/NarbarGlobal";
import { ACCESS_TOKEN } from "API/URLMapping";
import { API_BASE_URL } from "API/URLMapping";
import Axios from "axios";
import useForm from 'react-hook-form';
import { message } from 'antd';

function ProfilePage(props) {
 
  const [user, setUser] = React.useState(null);
  

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  React.useEffect(() => {
    if (props.currentUser) {
      setUser(props.currentUser);
    }
  }, [props.currentUser])
  //set tab user
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  //check show
  const [checked, setChecked] = React.useState(false);
  //check gender
  const [lstOrderOfUser, setLstOrderOfUser] = React.useState([]);

  ///
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //check auth
  useEffect(() => {

    if (localStorage.getItem(ACCESS_TOKEN) !== null) {

    }
    else {
      props.history.push("/login");
    }

  }, [localStorage.getItem(ACCESS_TOKEN)]);
  //set tab card
  useEffect(() => {
    const fetchData = async () => {

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      }
      const result = await Axios.get(API_BASE_URL + "/order/orderofuser", {
        headers: headers
      });
      setLstOrderOfUser(result.data);
    
    }
    fetchData();
  }, []);

  function onChange(e) {
    setChecked(e.target.checked);

  };
  // const { register, handleSubmit, watch, errors } = useForm();
  const { register, handleSubmit, watch,errors } = useForm()
  const onSubmit =async data => { 
    if (localStorage.getItem(ACCESS_TOKEN)) {
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
      }
      const response = await Axios.post(API_BASE_URL + "/user/changepassword", data, {
          headers: headers
      });
      if(response.status === 200){
        message.info('Đổi mật khẩu thành công. Vui lòng đăng nhập lại!!!');
        props.onLogout();
      }
      else{
        message.error('Nhập sai mật khẩu. Vui lòng nhập lại.');
      }
  }
  }

  return (
    <>
      <NarbarGlobal authenticated={props.authenticated} onLogout={props.onLogout} />
      <div className="section section-navbars pt-100">
        <Container >
          <div className="title">
            <h3>Thông tin tài khoản</h3>
          </div>
          <br />
          <Row>
            <Col md="3">
              <Row>
                <Container>
                  <div className="owner">
                    <div className="avatar">
                      <img
                        alt="..."
                        className="img-circle img-no-padding img-responsive"
                        src={props.currentUser && props.currentUser.imageUrl} style={{ width: 50, height: 50, opacity: 1 }}
                      />
                    </div>
                    <div className="name">
                      <h4 className="title">
                        {user && user.name} <br />
                      </h4>
                    </div>
                  </div>
                </Container></Row>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                <Tab label="Quản lý đơn hàng" {...a11yProps(0)} />
                <Tab label="Thông tin tài khoản" {...a11yProps(1)} />
                <Tab label="Thông báo của tôi" {...a11yProps(2)} />
                
                <Tab label="Sổ địa chỉ" {...a11yProps(3)} />
                <Tab label="Thông tin thanh toán" {...a11yProps(4)} />
                <Tab label="Nhận xét sản phẩm đã mua" {...a11yProps(5)} />
                <Tab label="Hỏi đáp" {...a11yProps(6)} />
              </Tabs>
            </Col>
            <Col md="9">
              <Row>
                <div className={classes.root}>

                  <TabPanel value={value} index={1} style={{ width: '100%', height: 50, opacity: 1 }}>
                    <Row><h3>Thông tin tài khoản </h3></Row>
                    <Row>
                      <Col md="4"> <Label>Họ tên</Label></Col>
                      <Col md="8"> <Input placeholder="Nhập tên" value={props.currentUser && props.currentUser.name} className="form-group" /></Col>
                    </Row>
                    <Row>
                      <Col md="4"> <Label>Số điện thoại</Label></Col>
                      <Col md="8"> <Input placeholder="Nhập Số điện thoại" value={props.currentUser && props.currentUser.phone} className="form-group" type="number"  disabled /></Col>
                    </Row>
                    <Row>
                      <Col md="4"> <Label>Email</Label></Col>
                      <Col md="8"> <Input placeholder="Nhập Email" value={props.currentUser && props.currentUser.email} className="form-group" disabled /></Col>
                    </Row>
                    <Row>
                      <Col md="4"> <Label>Ngày sinh</Label></Col>
                      <Col md="8">
                        <Input value={props.currentUser && props.currentUser.date} className="form-group" disabled />
                      </Col>
                    </Row>

                    <Row >
                      <Col md="4"> <Label>Giới tính</Label></Col>
                      <Col md="8">
                        <Radio.Group >
                          <Radio value={1} checked>Nam</Radio>
                          <Radio value={2}>Nữ</Radio>

                        </Radio.Group>
                      </Col>
                    </Row>
                    <Row >
                      <Col md="4"> </Col>
                      <Col md="8"> <Checkbox checked={checked} onChange={onChange}>Thay đổi mật khẩu</Checkbox></Col>
                    </Row>
                    {checked ? (
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Col md="12">
                          <Row>
                            <Col md="4"> <Label>Mật khẩu cũ(*)</Label></Col>
                            <Col md="4"> 
                              <input placeholder="Nhập mật khẩu" className="form-control" type="password" name="password"  ref={register({ required: true, maxlength: 20 })}/>
                              {errors.password && <span style={{color:"red"}}>Mật khẩu không được để trống</span>}
                            </Col>
                          </Row>
                          <Row>
                            <Col md="4"> <Label>Mật khẩu mới(*)</Label></Col>
                            <Col md="4"> <input placeholder="Nhập mật khẩu mới" className="form-control" type="password" name="passwordnew" ref={register({ required: true, maxlength: 20 })}
                          />{errors.passwordnew && <span style={{color:"red"}}>Hãy nhập mật khẩu mới</span>}
                          </Col>
                          </Row>
                          <Row>
                            <Col md="4"> <Label>Nhập lại(*)</Label></Col>
                            <Col md="4"> <input placeholder="Nhập lại" className="form-control p-1" type="password" name="passwordConfirm"
                               ref={register({
                                validate: (value) => {
                                  return value === watch('passwordnew'); // value is from password2 and watch will return value from password1
                                }
                              })} />
                              {errors.passwordConfirm && <span style={{color:"red"}}>Mật khẩu nhập lại chưa chính xác</span>}
                              </Col>
                            <Col md="4" > <input type="submit" className="btn btn-warning" value="Cập nhập"/> </Col>
                          </Row>
                        </Col>
                      </form>
                   
                   
                   ) : (<Row>
                      {/* <Col md="4"> </Col>
                      <Col md="4"> </Col>
                      <Col md="4" > <Button className="btn-warning float-right">Cập nhập</Button> </Col> */}
                    </Row>)}





                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Row><h3>Thông báo của tôi </h3></Row>
                  </TabPanel>
                  <TabPanel value={value} index={0}>
                    <Row><h3>Quản lý đơn hàng </h3></Row>
                    <Row>
                      <Table className="table" aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Mã đơn hàng</TableCell>
                            <TableCell >Ngày mua</TableCell>
                            <TableCell >Sản phẩm</TableCell>
                            <TableCell align="center">Tổng tiền</TableCell>
                            <TableCell >Trạng thái đơn hàng</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {lstOrderOfUser && lstOrderOfUser.map(item => (
                            <TableRow >
                              <TableCell component="th" scope="row">
                                {item.id}
                              </TableCell>
                              <TableCell >{item.dateadd}</TableCell>
<TableCell >{item&&item.lstOrder.map(pr=>(
  <a>{pr.product.name},</a>
))}</TableCell>
                              <TableCell align="right">{item.totalprice}đ</TableCell>

                              {item.status ? (<TableCell align="right">Giao hàng thành công</TableCell>)

                                : (<TableCell align="right">Đang giao hàng</TableCell>)}
                            </TableRow>
                          ))}


                        </TableBody>
                      </Table>
                    </Row>

                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <Row><h3>Sổ địa chỉ </h3></Row>
                  </TabPanel>
                  <TabPanel value={value} index={4}>
                    <Row><h3>Thông tin thanh toán </h3></Row>
                  </TabPanel>
                  <TabPanel value={value} index={5}>
                    <Row><h3>Nhận xét sản phẩm đã mua</h3></Row>
                  </TabPanel>
                  <TabPanel value={value} index={6}>
                    <Row><h3>Hỏi đáp </h3></Row>
                  </TabPanel>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      <DemoFooter />
    </>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
    width: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));
export default ProfilePage;
