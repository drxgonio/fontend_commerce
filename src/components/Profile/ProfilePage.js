
import React, { useEffect } from "react";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
  UncontrolledCollapse,
  Navbar,
  UncontrolledDropdown
} from "reactstrap";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Table, Divider, Tag } from 'antd';
// core components
import DemoFooter from "components/Footers/DemoFooter.js";
import TextField from '@material-ui/core/TextField';
import { Radio, Checkbox } from 'antd';
import { style } from "@material-ui/system";
import NarbarGlobal from "components/Navbars/NarbarGlobal";
import { ACCESS_TOKEN } from "API/URLMapping";


function ProfilePage(props) {
  const [activeTab, setActiveTab] = React.useState("1");
  const [user, setUser] = React.useState(null);
  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

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
  const[checked,setChecked]=React.useState(false);
  //check gender
  const [checkGender, setCheckGender] = React.useState(true);
 
  ///
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
   //check auth
   useEffect(()=>{
    
    if(localStorage.getItem(ACCESS_TOKEN)!==null){
     
    }
    else{
      props.history.push("/login");
    }
      
  },[localStorage.getItem(ACCESS_TOKEN)]);
   //set tab card
   const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Invite {record.name}</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  function onChange (e) {
    console.log('checked = ', e.target.checked);
 
      setChecked(e.target.checked);
    
  };
  


  return (
    <>
      {console.log(props.data)}
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
                        src={require("assets/img/faces/joe-gardner-2.jpg")} style={{ width: 50, height: 50, opacity: 1 }}
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
                <Tab label="Thông tin tài khoản" {...a11yProps(0)} />
                <Tab label="Thông báo của tôi" {...a11yProps(1)} />
                <Tab label="Quản lý đơn hàng" {...a11yProps(2)} />
                <Tab label="Sổ địa chỉ" {...a11yProps(3)} />
                <Tab label="Thông tin thanh toán" {...a11yProps(4)} />
                <Tab label="Nhận xét sản phẩm đã mua" {...a11yProps(5)} />
                <Tab label="Hỏi đáp" {...a11yProps(6)} />
              </Tabs>
            </Col>
            <Col md="9">
              <Row>
                <div className={classes.root}>

                  <TabPanel value={value} index={0} style={{ width: '100%', height: 50, opacity: 1 }}>
                    <Row><h3>Thông tin tài khoản </h3></Row>
                    <Row>
                      <Col md="4"> <Label>Họ tên</Label></Col>
                      <Col md="8"> <Input placeholder="Nhập tên" value={props.currentUser&&props.currentUser.name} className="form-group" /></Col>
                    </Row>
                    <Row>
                      <Col md="4"> <Label>Số điện thoại</Label></Col>
                      <Col md="8"> <Input placeholder="Nhập Số điện thoại" value={props.currentUser&&props.currentUser.phone} className="form-group" type="number" value="0385053517" disabled /></Col>
                    </Row>
                    <Row>
                      <Col md="4"> <Label>Email</Label></Col>
                      <Col md="8"> <Input placeholder="Nhập Email" value={props.currentUser&&props.currentUser.email} className="form-group" disabled /></Col>
                    </Row>
                    <Row>
                      <Col md="4"> <Label>Ngày sinh</Label></Col>
                      <Col md="8"> 
                      <Input  value={props.currentUser&&props.currentUser.date} className="form-group" disabled />
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
                      <Col md="8"> <Checkbox  checked={checked} onChange={onChange}>Thay đổi mật khẩu</Checkbox></Col>
                    </Row>
                    {checked?(  
                      <Row>
                        <Col md="12">
                        <Row>
                      <Col md="4"> <Label>Mật khẩu cũ</Label></Col>
                      <Col md="4"> <Input placeholder="Nhập mật khẩu" className="form-group" type="password" /></Col>
                    </Row>
                     <Row>
                     <Col md="4"> <Label>Mật khẩu mới</Label></Col>
                     <Col md="4"> <Input placeholder="Nhập mật khẩu mới" className="form-group" type="password" /></Col>
                   </Row>
                   <Row>
                     <Col md="4"> <Label>Nhập lại</Label></Col>
                     <Col md="4"> <Input placeholder="Nhập lại" className="form-group" type="password" /></Col>
                     <Col md="4" > <Button className="btn-warning float-right">Cập nhập</Button> </Col>
                   </Row>
                        </Col>
                      </Row>
                    ):( <Row>
                       <Col md="4"> </Col>
                       <Col md="4"> </Col>
                       <Col md="4" > <Button className="btn-warning float-right">Cập nhập</Button> </Col>
                    </Row>)}
                   
                   



                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Row><h3>Thông báo của tôi </h3></Row>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <Row><h3>Quản lý đơn hàng </h3></Row>
                    <Row>
                        <Table columns={columns} dataSource={data} />
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
