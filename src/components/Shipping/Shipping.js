
import React, { useEffect } from "react";


import { makeStyles } from '@material-ui/core/styles';

import DemoFooter from "components/Footers/DemoFooter";

import NarbarGlobal from "components/Navbars/NarbarGlobal";
import {
    Container,
    Row,
    Col,
    Label, Input, Form, Button
} from "reactstrap";

import { Progress } from 'antd';
import useForm from "Aform/useForm";
import Axios from "axios";
import { ACCESS_TOKEN } from "API/URLMapping";
import { API_BASE_URL } from "API/URLMapping";


function Shipping(props) {
    const [activeTab, setActiveTab] = React.useState("1");


    const [user, setUser] = React.useState([]);
    const [checked, setChecked] = React.useState(false);
    const toggle = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    React.useEffect(() => {
        setUser(props.currentUser);


    }, [props.currentUser]);
    React.useEffect(() => {
        props.history.push("/shipping");

    }, [user]);

    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("landing-page");
        return function cleanup() {
            document.body.classList.remove("landing-page");
        };
    });
    function editProfile() {
        setChecked(true);
    }
    const { values, handleChange, handleSubmit } = useForm(updateUser); // initialise the hook
    async function  updateUser() {
        user.address=values.address;
        user.phone=values.phone;
        if (localStorage.getItem(ACCESS_TOKEN)) {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem(ACCESS_TOKEN)
              }
             const response=await  Axios.post(API_BASE_URL+"/user/updateUser", user, {
                headers: headers
              });
              setUser(response.data)
              
        }
        
        
    }
    //check auth
    useEffect(()=>{
    
        if(localStorage.getItem(ACCESS_TOKEN)!==null){
         
        }
        else{
          props.history.push("/login");
        }
          
      },[localStorage.getItem('mycart')]);
      function redirectOrder(){
        props.history.push("/order");
      }
    





    return (
        <>


            <NarbarGlobal authenticated={props.authenticated} onLogout={props.onLogout} />\
            <Row>
                        <Progress percent={50} size="small" status="active" />
                    </Row>
            <div className="section section-navbars pt-100" style={{
        backgroundColor: '#f4f4f4'
        
      }}>
                <Container >

                    <br />
                   
                    <Row>

                    </Row>
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
                            <Row>
                                <Col md="4" className="m-1 p-1"><Button className="btn-round"
                                    color="danger" onClick={redirectOrder}>Giao đến địa chỉ này</Button></Col>
                                <Col md="4" className="btn-round m-1 p-1"><Button onClick={editProfile}>Sửa</Button></Col>
                            </Row>

                        </Col>
                    </Row>
                    {checked ? (
                        <Form className="register-form" onSubmit={handleSubmit} >
                            <span>Bạn muốn giao hàng đến địa chỉ khác?</span>
                            <Col md="12" >
                                <Row>
                                    <Col md="4" align="right"> <Label>Họ tên</Label></Col>
                                    <Col md="6" > <Input placeholder="Nhập tên" value={props.currentUser && props.currentUser.name} className="form-group"  disabled/></Col>
                                </Row>
                                <Row>
                                    <Col md="4" align="right"> <Label>Số điện thoại</Label></Col>
                                    <Col md="6" > <Input placeholder="Nhập Số điện thoại" name="phone" onChange={handleChange} className="form-group" type="number" /></Col>
                                </Row>
                                <Row>
                                    <Col md="4" align="right"> <Label>Địa chỉ</Label></Col>
                                    <Col md="6" >
                                        <Input placeholder="Nhập địa chỉ" className="border" name="address" onChange={handleChange} required />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="8"></Col>
                                    <Col md="3" className="m-1 p-1"><Button
                                        block
                                        className="btn-round"
                                        color="danger"
                                        type="submit"
                                    >
                                        Cập nhập
                  </Button></Col>
                                </Row>
                            </Col>

                        </Form>
                    ) : (
                            <Row></Row>
                        )
                    }

                </Container>
            </div>

            <DemoFooter />
        </>
    );
}



const useStyles = makeStyles(theme => ({

}));
export default Shipping;
