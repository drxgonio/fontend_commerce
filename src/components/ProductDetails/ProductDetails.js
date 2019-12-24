
import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

import { message } from 'antd';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';

import { ACCESS_TOKEN } from "API/URLMapping";
import { API_BASE_URL } from "API/URLMapping";
// core components
import { withRouter } from "react-router-dom"

import { Icon } from 'antd';
import DemoFooter from "components/Footers/DemoFooter";
import Axios from "axios";
import NarbarGlobal from "components/Navbars/NarbarGlobal";
const { TextArea } = Input;
const CommentList = ({ comments }) => (
 console.log(comments),
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value}  style={{width:"800px"}}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

function ProductDetails(props) {

  const [product_detail, setProduct_detail] = React.useState(null);
  const [img_photo, setImg_photo] = React.useState(null);
  const [comments, setComment] = React.useState([]);
  const [submitting, setSubmitting] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [lstComment, setLstComment] = React.useState(null);
  const [check, setCheck] = React.useState(true);

  function handleSubmit() {
    if (!value) {
      return;
    }

    setSubmitting(true);
  
    setTimeout( async () => {

      setSubmitting(false);
      setValue('');  
      if (localStorage.getItem(ACCESS_TOKEN)) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }
        const response = await Axios.post(API_BASE_URL + "/v1/addcomment", {
          content: value,
          idProduct:props.match.params.id
        
      }, {
          headers: headers
        });
        if(response.status===200){
          setCheck(!check);
        }
       
      }
      else{
        //props.history.push("/login");
        message.error('Bạn chưa đăng nhập tài khoản');
      }
    },1);
  };

  function handleChange(e) {

    setValue(e.target.value)

  };


  React.useEffect( () => {
    const feactData = async () => {
      const lst = await Axios.get(`http://localhost:8080/api/productdetail?id=` + props.match.params.id);
      const lstComm= await Axios.get(`http://localhost:8080/v1/getCommentByProduct?id=` + props.match.params.id);
      setLstComment(lstComm.data);
      setProduct_detail(lst.data)
      setImg_photo(lst.data.imagephoto)
    }
    feactData();

  }, [check]);

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
    if (props.authenticated) {
      var cart = [];
      let item = [];
      const oldcart = JSON.parse(localStorage.getItem('mycart'));
      try {
        item = oldcart.filter(item => item.name === name);
      }
      catch (err) {

      }
      if (item.length > 0) {
        message.error('Đã tồn tại sản phẩm trong giỏ hàng!');
      }
      else {
        message.info('Đã thêm giỏ hàng thành công!');
        for (var i in oldcart) {
          cart.push(oldcart[i]);
        }
        cart.push(product_detail);
        localStorage.setItem('mycart', JSON.stringify(cart));
      }
    }
    else {
      message.warning('Đăng nhập để đặt hàng!');
    }

  }
  function changeImage(value) {
    setImg_photo(value);
  }
  return (
    <>


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
                <Col md="4"><Button type="danger" onClick={() => addMyCart(product_detail.name)}>Chọn mua</Button> </Col>
              </Row>
            </Col>


          </Row>
          <br />
          <br />
          <Row >
            <label><b>HỎI, ĐÁP VỀ SẢN PHẨM</b></label> 
          </Row>
          <Row>
            <div>
             
              {lstComment  && <CommentList comments={lstComment} />}
              <Comment
                
                content={
                  <Editor
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                    value={value}
                  />
                }
              />
            </div>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}


export default withRouter(ProductDetails);
