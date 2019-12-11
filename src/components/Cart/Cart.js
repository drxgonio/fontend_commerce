
import React, { useEffect } from "react";

// reactstrap components
import {

  Container,
  Row,
  Col
} from "reactstrap";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Progress, Button } from 'antd';

// core components
import DemoFooter from "components/Footers/DemoFooter.js";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Input, Icon, Alert } from 'antd';
import NarbarGlobal from "components/Navbars/NarbarGlobal";
import Context from "Context/Context";
import { ACCESS_TOKEN } from "API/URLMapping";
import useForm from "Aform/useForm";

const { Search } = Input;
const ButtonGroup = Button.Group;


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


  const value = React.useContext(Context);
  const  [lstCart, setLstCart] = React.useState([]);
  const [totalPrice,setTotalPrice]= React.useState(0);
  const [check,setCheck]= React.useState(false);
  const [count,setCount]= React.useState(1);
  useEffect(()=>{
    
    if(localStorage.getItem(ACCESS_TOKEN)!==null){
      setLstCart(JSON.parse(localStorage.getItem('mycart')));  
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
  

{  console.log(totalPrice)}


        

 
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
          {lstCart.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
              <img src={row.imagephoto} style={{width: 100}}/>
                
              </TableCell>
              <TableCell >{row.name}</TableCell>
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



const useStyles = makeStyles(theme => ({
 
}));
export default Cart;
