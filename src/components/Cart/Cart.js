
import React, { useEffect } from "react";

// reactstrap components
import {
  Button,

  Container,
  Row,
  Col
} from "reactstrap";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// core components
import DemoFooter from "components/Footers/DemoFooter.js";
import PageNarbar from "components/Profile/PageNarbar";
import { Table, Divider, Tag } from 'antd';
import { Input } from 'antd';

const { Search } = Input;


function Cart(props) {
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
  //set tab card
  const columns = [
    {
      title: 'Image',
      dataIndex: 'name',
      key: 'name',
      render:  () => <img src="https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn&quot" />
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số lượng',
      key: 'tags',
      dataIndex: 'tags',
    
    }
    ,
    {
      title: 'Tùy chọn',
      key: 'option',
      dataIndex: 'option',
    
    }
  ];
  const data = [
    {
      key: '1',
      name: <img src="https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn&quot" style="width:'20px';height:'20px'"/>,
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: '1',
      option:'a'
    },
    {
        key: '1',
        name: <img src="https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn&quot" style="width:'20px';height:'20px'"/>,
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: '1',
        option:'a'
      }
  ];
  

  return (
    <>
      {console.log(props.currentUser)}
      {console.log(user)}
      <PageNarbar></PageNarbar>
      <div className="section section-navbars pt-100">
        <Container >
          <div className="title">
            <h3>Giỏ hàng</h3>
          </div>
          <br />
          <Row>
     
            <Col md="9" className="border">
            <Table columns={columns} dataSource={data} />
            </Col>
            <Col md="3" className="border">
                <Row className="p-3 border-bottom" >
                    <Col md="6">Tạm tính</Col>
                    <Col md="6">253.000đ</Col>
                </Row>
                <Row className="p-3">
                    <Col md="6">Thành tiền</Col>
                    <Col md="6" className="text-danger">253.000đ</Col>
                </Row>
                <Row className="p-3">
                    <Col md="6"></Col>
                    <Col md="6">(Đã bao gồm VAT)</Col>
                </Row>
                <Row className="p-3 border-bottom">
                    <Col md="12" className="text-center">
                    <Button className="btn btn-danger text-center">Tiến hành đặt hàng</Button>
                    </Col>
                   
                </Row>
                <Row className="p-3">
                    <Col md="6">Mã giãm giá:</Col>       
                </Row>
                <Row className="p-3">
        
                    <Col md="12">
                    <Search
      placeholder="Nhập mã giảm giá"
      enterButton="Đồng ý"
      size="large"
      onSearch={value => console.log(value)}
    />
    </Col>
                </Row>
            </Col>
          </Row>
        </Container>
      </div>

      <DemoFooter />
    </>
  );
}



const useStyles = makeStyles(theme => ({
 
}));
export default Cart;
