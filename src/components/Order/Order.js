
import React, { useEffect } from "react";


import { makeStyles } from '@material-ui/core/styles';

import DemoFooter from "components/Footers/DemoFooter";

import NarbarGlobal from "components/Navbars/NarbarGlobal";
import {
    Container,
    Row,
    Col,
    
} from "reactstrap";

import { message } from 'antd';
import useForm from "Aform/useForm";
import Axios from "axios";
import { ACCESS_TOKEN } from "API/URLMapping";
import { API_BASE_URL } from "API/URLMapping";
import { ADDRESS, KEY_GOOGLE } from "API/Contants";
import QRCode from 'qrcode.react';
import { Modal, Button } from 'antd';
import { Steps } from 'antd';
import { Redirect } from "react-router";
const { Step } = Steps;
function Order(props) {
   

    const [data, setData] = React.useState([]);

    const [user, setUser] = React.useState([]);
    const [lstCart, setLstCart] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [checkOrder,setCheckOrder]=React.useState(false);
    const [encrypt,setEncypt]=React.useState("UGGGHJGCHGHJGHSGHGHJGCHJGHJGASGSHGSHGHGSHGSHGHSGHGSHGSGHG");
    const [fee,setFee] = React.useState(0);
    React.useEffect(() => {
        setUser(props.currentUser);
       
    }, [props.currentUser]);
    React.useEffect(() => {
        props.history.push("/order");

    }, [user]);

    document.documentElement.classList.remove("nav-open");
   
    
    const { values } = useForm(updateUser); // initialise the hook
    async function updateUser() {
        user.address = values.address;
        user.phone = values.phone;
        if (localStorage.getItem(ACCESS_TOKEN)) {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
            const response = await Axios.post(API_BASE_URL + "/user/updateUser", user, {
                headers: headers
            });
            setUser(response.data)
        }

    }
    async function feeship(){
        
        const headers = {
            'Access-Control-Allow-Origin' : '*'
        }

        let destination =localStorage.getItem("address");
        let response =  await Axios.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+ADDRESS+"&destinations="+destination+"&key="+KEY_GOOGLE,{headers:headers});
        let range = parseInt(parseInt(response.data.rows[0].elements[0].distance['value'])/1000)
        console.log(range)
        if(range <2){
            localStorage.setItem("fee",5000)
        }
        if(range>=2 && range<5){
            localStorage.setItem("fee",range*10000)
        }
        if(range>=5 && range<10){
            localStorage.setItem("fee",range*20.000)
        }
        if(range>10 && range<=50){
            localStorage.setItem("fee",range*200)
        }
        if(range>50 && range<=100){
            localStorage.setItem("fee",range*300)
        }
        if(range>100 && range<=400){
            localStorage.setItem("fee",range*350)
        }
        if(range>400 && range<=700){
            localStorage.setItem("fee",range*350)
        }
        if(range>700 && range<=1000){
            localStorage.setItem("fee",range*450)
        }
        if(range>1000){
            localStorage.setItem("fee",range*460)
        }
        
    }
    useEffect(() => {
        feeship()
        if (localStorage.getItem(ACCESS_TOKEN) !== null) {
            setLstCart(JSON.parse(localStorage.getItem('mycart')));
        }
        else {
            props.history.push("/login");
        }

    }, [localStorage.getItem('mycart')]);


    React.useEffect(() => {

        if (lstCart) {
            let i = 0;
            lstCart.map(item => (
                i = i + item.product_details.pricesale
            ))
            setTotalPrice(i);
        }

    }, [lstCart]);
    
    useEffect( ()=>{
        try{
           if(data.length>0){
                        async function saveOrder(){
                            if (localStorage.getItem(ACCESS_TOKEN)) {
                                const headers = {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+localStorage.getItem(ACCESS_TOKEN)
                                }
                                const response=await  Axios.post(API_BASE_URL+"/order/addOrder", data, {
                                    headers: headers
                                });      
                                setEncypt(response.data);   
                                               
                            }
                            else{
                                message.error("Không có sản phẩm nào được chọn!")
                            }
                    }
                    saveOrder();
           }
        }catch(err){
            setTotalPrice(0);
        }
          
    },[data])
      function finalOrder() {
          if(lstCart){
              lstCart.map(item =>{
                    item.soluong = parseInt(localStorage.getItem("key"+item.id))
                    localStorage.removeItem(localStorage.getItem("key"+item.id))
                    localStorage.removeItem(localStorage.getItem(item.name))
              })
          }
          console.log(lstCart);
          setData(lstCart);
        message.info("Bạn đã đặt hàng thành công!!!")
        localStorage.removeItem('mycart');
        localStorage.removeItem('totalPrice');
       setCheckOrder(true);  
        showModal();    
    }
    useEffect(()=>{
        setTotalPrice(0);
    },[checkOrder])


    const [visible, setvisible] = React.useState(false);
  

    function handleCancel() {
        setvisible(false);
    }
    function handleOk() {
        setvisible(false);
    }
    function showModal() {
        setvisible(true);
    }
    return (
        <>
     
        <Modal
          title="Thanh toán đơn hàng"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <QRCode
            id='qrcode'
            value={encrypt}
            size={290}
            level={'H'}
            includeMargin={true}
          />
        </Modal>


            <NarbarGlobal authenticated={props.authenticated} onLogout={props.onLogout} />
            <Row className="p-3 border">  
                <Col md={1}>
                   
                </Col>
                <Col md={10}>
                <Steps size="small" current={2}>
                    <Step title="Đăng nhập" />
                    <Step title="Địa chỉ giao hàng" />
                    <Step title="Thanh toán & Đặt mua" />
                </Steps>
                </Col>
                
               
            </Row>
            <div className="section section-navbars pt-100" style={{
                backgroundColor: '#f4f4f4'

            }}>
                <Container >

                    <div className="title">
                        <h3>Order</h3>
                    </div>
                    <Row >
                        <Col md="8" className="border">
                            <Row>
                                <label className="font-weight-bold p-2">{user && user.name}</label>
                            </Row>
                            <Row>
                                <label className=" p-1">Địa chỉ: {user && user.address}</label>
                            </Row>
                            <Row>
                                <label className=" p-1"> Điện thoại: {user && user.phone}</label>
                            </Row>


                        </Col>
                    </Row>
                    <Row className="font-weight-bold">Danh sách sản phẩm</Row>
                    {lstCart&&lstCart.map(item => (
                        <Row className="border-bottom">
                            <Col md="4">
                                <label className=" p-1">Sản phẩm: {item && item.name}</label>
                            </Col>

                            <Col md="4">
                                <label className=" p-1">Giá tiền: {item && item.product_details.pricesale}</label>
                            </Col>
                            <Col md="4">
                                <label className=" p-1">Số lượng: {localStorage.getItem("key"+item.id)}</label>
                            </Col>
                        </Row>
                    )
                    )}
                     <Row className="font-weight-bold">
                        <Col md="4">

                        </Col>
                        <Col md="4">
                            <label className=" p-1"> Phí vận chuyển:{localStorage.getItem("totalPrice")}đ</label>
                        </Col>


                    </Row>
                    <Row className="font-weight-bold">
                        <Col md="4">

                        </Col>
                        <Col md="4">
                            <label className=" p-1"> Tổng tiền:{localStorage.getItem("totalPrice")}đ</label>
                        </Col>


                    </Row>
                    <Row className="font-weight-bold">
                        <Col md="4">

                        </Col>
                        {parseInt(localStorage.getItem("totalPrice"))>0&&( <Col md="4">
                            <Button type="primary" onClick={finalOrder} >Đặt hàng</Button>
                        </Col>)}
                       

                    </Row>

                </Container>
            </div>

            <DemoFooter />
        </>
    );
}



const useStyles = makeStyles(theme => ({

}));
export default Order;
