
import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
// reactstrap components
import {

  Container,
  Row,
  Col
} from "reactstrap";


import { Steps, Button } from 'antd';
// core components
import DemoFooter from "components/Footers/DemoFooter.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Input, Icon } from 'antd';
import IndexNavbar from "components/Navbars/IndexNavbar";
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
  const [array,setArray]= React.useState([]);

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
    localStorage.setItem("totalPrice",0)
    lstCart.map(item=>(
      i=i+item.product_details.pricesale,
      localStorage.setItem("key"+item.id,1),
      localStorage.setItem(item.name,item.product_details.pricesale),
      localStorage.setItem("totalPrice",parseInt(localStorage.getItem("totalPrice"))+parseInt(localStorage.getItem(item.name)))
      
    ))
    setTotalPrice(i);
  }
 
},[lstCart]);

React.useEffect(()=>{

  setCheck(false);
},[check])

const handleRemoveItem = row => {
  let item=lstCart.filter(item => item.name !== row.name);
   localStorage.removeItem('mycart');
   localStorage.removeItem("key"+row.id)
   localStorage.removeItem(row.name)
   localStorage.setItem('mycart', JSON.stringify(item));
   setCheck(true);
}
function shipping(){
  localStorage.setItem("sl", count);
  props.history.push("/shipping");
}
useEffect(()=>{
  console.log("COunt"+count)
  setTotalPrice(localStorage.getItem("totalPrice")*count)
},[count])

function countGiam(row){
  let total = parseInt(localStorage.getItem("totalPrice"))-parseInt(localStorage.getItem(row.name))
  let i = parseInt(localStorage.getItem("key"+row.id))
  localStorage.setItem("key"+row.id,i-1);
  localStorage.setItem(row.name,parseInt(row.product_details.pricesale)*(i-1))
  localStorage.setItem("totalPrice",total+parseInt(localStorage.getItem(row.name)))
  setCount(localStorage.getItem("key"+row.id))

}

function countTang(row){
  let total = parseInt(localStorage.getItem("totalPrice"))-parseInt(localStorage.getItem(row.name))
  let i = parseInt(localStorage.getItem("key"+row.id))
  localStorage.setItem("key"+row.id,i+1);
  localStorage.setItem(row.name,parseInt(row.product_details.pricesale)*(i+1))
  localStorage.setItem("totalPrice",total+parseInt(localStorage.getItem(row.name)))
  setCount(localStorage.getItem("key"+row.id))
}

  
  return (
    <>
 <IndexNavbar authenticated={props.authenticated} onLogout={props.onLogout} />
   
      <div className="section section-navbars ">
        <Container >
        <br />
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
          {parseInt(localStorage.getItem("key"+row.id))===1?<Button  icon="minus" onClick={() => countGiam(row)} disabled={true}/> :
          <Button  icon="minus" onClick={() => countGiam(row)} disabled={false}/> }
          <Button className="border pl-1 pr-1" style={{width:30}} >{localStorage.getItem("key"+row.id)}</Button>
          <Button  icon="plus" onClick={() => countTang(row)} disabled={false}/>
        </ButtonGroup>
              </TableCell>
              <TableCell align="center"><Button type="block" onClick={() =>handleRemoveItem(row)}><Icon type="delete" theme="twoTone" /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            </Col>
            <Col md="3" className="border">
                <Row className="p-3 border-bottom" >
                    <Col md="6">Tạm tính</Col>
          <Col md="6">{localStorage.getItem("totalPrice")}đ</Col>
                </Row>
                <Row className="p-3">
                    <Col md="6">Thành tiền</Col>
          <Col md="6" className="text-danger">{localStorage.getItem("totalPrice")}đ</Col>
                </Row>
                <Row className="p-3">
                    <Col md="6"></Col>
                    <Col md="6">(Đã bao gồm VAT)</Col>
                </Row>
                <Row className="p-3 border-bottom">
                    <Col md="12" className="text-center">
                      {totalPrice === 0 ? <Button type="danger" onClick={shipping} disabled>Tiến hành đặt hàng</Button>:
                      <Button type="danger" onClick={shipping} >Tiến hành đặt hàng</Button> }
                    
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
