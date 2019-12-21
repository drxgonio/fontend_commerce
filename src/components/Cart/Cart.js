
import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
// reactstrap components
import {

  Container,
  Row,
  Col
} from "reactstrap";


import { Progress, Button } from 'antd';

// core components
import DemoFooter from "components/Footers/DemoFooter.js";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Input, Icon } from 'antd';
import NarbarGlobal from "components/Navbars/NarbarGlobal";

import { ACCESS_TOKEN } from "API/URLMapping";


const { Search } = Input;
const ButtonGroup = Button.Group;


function Cart(props) {

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



  const  [lstCart, setLstCart] = React.useState([]);
  const [totalPrice,setTotalPrice]= React.useState(0);
  const [check,setCheck]= React.useState(false);
  const [count,setCount]= React.useState(1);

  useEffect(()=>{
    
    if(localStorage.getItem(ACCESS_TOKEN)!==null){
      try{
         setLstCart(JSON.parse(localStorage.getItem('mycart')));  
      }catch(err){

      }
    }
    else{
      props.history.push("/login");
    }
      
  },[localStorage.getItem('mycart')]);
React.useEffect(()=>{
 
  if(lstCart){
    let i=0;
    lstCart.map(item=>(
      i=i+item.product_details.pricesale
    ))
    setTotalPrice(i);
  }
 
},[lstCart]);
React.useEffect(()=>{

  setCheck(false);
},[check])

const handleRemoveItem = name => {
  let item=lstCart.filter(item => item.name !== name);
   localStorage.removeItem('mycart');
   localStorage.setItem('mycart', JSON.stringify(item));
   setCheck(true);
}
function shipping(){
  props.history.push("/shipping");
}

  

  return (
    <>
 <NarbarGlobal authenticated={props.authenticated} onLogout={props.onLogout} />
   
      <div className="section section-navbars ">
        <Container >
        <br />
          <Row>
          <Progress percent={1} size="small" status="active" />
          </Row>
          <div className="title">
            <h3>Giỏ hàng</h3>
          </div>
          <br />
         
          <Row>
     
            <Col md="9" className="border">
            <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell >Sản phẩm</TableCell>
            <TableCell align="right">Giá tiền</TableCell>
            <TableCell align="center">Số lượng</TableCell>
            <TableCell align="right">Tùy chọn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lstCart&&lstCart.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
              <img src={row.imagephoto} style={{width: 100}}/>
                
              </TableCell>
              <TableCell ><Link   to={{
                                    pathname: `/product-details/${row.name}/${row.id}`
                                  }}>{row.name}</Link></TableCell>
              <TableCell align="right">{row.product_details.pricesale}</TableCell>
              <TableCell align="right">
              <ButtonGroup>
          <Button  icon="minus" onClick={() => setCount(count - 1)}/> 
          <Button className="border pl-1 pr-1" style={{width:30}}>{count}</Button>
          <Button  icon="plus" onClick={() => setCount(count + 1)}/>
        </ButtonGroup>
              </TableCell>
              <TableCell align="center"><Button type="block" onClick={() =>handleRemoveItem(row.name)}><Icon type="delete" theme="twoTone" /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            </Col>
            <Col md="3" className="border">
                <Row className="p-3 border-bottom" >
                    <Col md="6">Tạm tính</Col>
          <Col md="6">{totalPrice}đ</Col>
                </Row>
                <Row className="p-3">
                    <Col md="6">Thành tiền</Col>
          <Col md="6" className="text-danger">{totalPrice}đ</Col>
                </Row>
                <Row className="p-3">
                    <Col md="6"></Col>
                    <Col md="6">(Đã bao gồm VAT)</Col>
                </Row>
                <Row className="p-3 border-bottom">
                    <Col md="12" className="text-center">
                    <Button type="danger" onClick={shipping}>Tiến hành đặt hàng</Button>
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

export default Cart;
