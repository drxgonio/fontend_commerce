
import React, { useEffect } from "react";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { message, Button } from 'antd';

// core components

import { Table, Divider, Tag } from 'antd';
import { Input, Icon } from 'antd';
import DemoFooter from "components/Footers/DemoFooter";
import Axios from "axios";
import IndexNavbar from "components/Navbars/IndexNavbar";
import NarbarGlobal from "components/Navbars/NarbarGlobal";

const { Search } = Input;

function ProductDetails(props) {
  const [activeTab, setActiveTab] = React.useState("1");
  const [product_detail, setProduct_detail] = React.useState(null);
  const [img_photo, setImg_photo]=React.useState(null);

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  React.useEffect(async () => {
    const feactData = async () => {
      const lst = await Axios.get(`http://localhost:8080/api/productdetail?id=` + props.match.params.id);
      setProduct_detail(lst.data)
      setImg_photo(lst.data.imagephoto)
    }
    feactData();

  }, [props.match.params.id]);

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  React.useEffect(() => {
    if (props.currentUser) {
      //setUser(props.currentUser);
    }
  }, [props.currentUser])
 
  const addMyCart = name => {
    if(props.authenticated){
      var cart = [];
    let item=[];
    const oldcart = JSON.parse(localStorage.getItem('mycart'));
    try{
      item=oldcart.filter(item => item.name === name);
    }
    catch(err){

    }
     if(item.length>0){
       console.log(item.length)
      message.error('Đã tồn tại sản phẩm trong giỏ hàng!');
     }
     else{
      message.info('Đã thêm giỏ hàng thành công!');
      for (var i in oldcart) {
        cart.push(oldcart[i]);
      }
      cart.push(product_detail);
      localStorage.setItem('mycart', JSON.stringify(cart));
     }
    }
    else{
      message.warning('Đăng nhập để đặt hàng!');
    }
      
  }
  function changeImage(value){
    setImg_photo(value);
  }
  return (
    <>
    {console.log(img_photo)}

      <NarbarGlobal authenticated={props.authenticated} onLogout={props.onLogout} />
      <div className="section section-navbars pt-100">
        <Container >
          <div className="title">
            <h3>Sản phẩm: {props.match.params.name} </h3>
          </div>
          <br />
          <Row>
            <Col md="1">
              <Row className="border"><img src={product_detail && product_detail.product_details.lstImage[0].name} onClick={() => {
              changeImage(product_detail.product_details.lstImage[0].name);
            }} style={{ width: 100, height: 100 }}></img></Row>
              <Row className="border mt-3"><img src={product_detail && product_detail.product_details.lstImage[1].name}
              onClick={() => {
                changeImage(product_detail.product_details.lstImage[1].name);
              }}
              style={{ width: 100, height: 100 }}></img></Row>
              <Row className="border mt-3"><img src={product_detail && product_detail.product_details.lstImage[2].name}
              onClick={() => {
                changeImage(product_detail.product_details.lstImage[2].name);
              }}
              style={{ width: 100, height: 100 }}></img></Row>

            </Col>
            <Col md="4" className="border pr-1">
              <Row>
                <img src={img_photo} style={{ width: '100%', height: '100%' }}>
                  </img>
                  </Row>

              <Row className="text-center"><span className=" m-auto text-center">Rê chuột để phóng to màn hình</span></Row>
            </Col>
            <Col md="7" className="border">
              <Row><h4 className="pl-3">{product_detail && product_detail.name}</h4></Row>
              <Row className="border-bottom"><h6 className="pl-3">Đánh giá: <Icon type="star" theme="twoTone" /><Icon type="star" theme="twoTone" /><Icon type="star" theme="twoTone" /><Icon type="star" /><Icon type="star" /></h6></Row>
              <Row >
                <Col md="2"><h4>Giá:</h4></Col>
                <Col md="4"><a className="display-5 text-danger font-weight-bold float-left">{product_detail && product_detail.product_details.pricesale} đồng</a></Col>
              </Row>
              <Row >

                <Col md="2"><strike>Giá gốc:</strike></Col>
                <Col md="4"><strike><a >{product_detail && product_detail.product_details.price}</a>  </strike></Col>

              </Row>
              <Row className="pt-2">

                <Col md="2"><label> Màu săc:</label></Col>
                <Col md="4">{product_detail && product_detail.product_details.color}</Col>

              </Row>
              <Row>
                <ul>
                  <li>Chuẩn kháng nước ISO 22810:2010</li>
                  <li>Kết nối: Bluetooth 4.2, Wi-Fi 802.11 b/g/n</li>
                  <li>Tương thích: iPhone</li>
                  <li>Chức năng: Theo dõi nhịp tim, vận động</li>
                </ul>
              </Row>

              <Row className="pt-1">
                <Col md="8"></Col>
                <Col md="4"><Button type="danger" onClick={()=>addMyCart(product_detail.name)}>Chọn mua</Button> </Col>
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
export default ProductDetails;
