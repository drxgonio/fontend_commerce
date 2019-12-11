
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

import { Progress, message } from 'antd';
import useForm from "Aform/useForm";
import Axios from "axios";
import { ACCESS_TOKEN } from "API/URLMapping";
import { API_BASE_URL } from "API/URLMapping";


function Order(props) {
    const [activeTab, setActiveTab] = React.useState("1");


    const [user, setUser] = React.useState([]);
    const [checked, setChecked] = React.useState(false);
    const [lstCart, setLstCart] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const toggle = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    React.useEffect(() => {
        setUser(props.currentUser);


    }, [props.currentUser]);
    React.useEffect(() => {
        props.history.push("/order");

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
    useEffect(() => {

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
    function finalOrder() {
        message.info("Bạn đã đặt hàng thành công!!!")
        props.history.push("/");
    }




    return (
        <>


            <NarbarGlobal authenticated={props.authenticated} onLogout={props.onLogout} />\
            <Row>
                <Progress percent={100} size="small" status="active" />
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
                    {lstCart.map(item => (
                        <Row className="border-bottom">
                            <Col md="4">
                                <label className=" p-1">Sản phẩm: {item && item.name}</label>
                            </Col>

                            <Col md="4">
                                <label className=" p-1">Giá tiền: {item && item.product_details.pricesale}</label>
                            </Col>
                        </Row>
                    )
                    )}
                    <Row className="font-weight-bold">
                        <Col md="4">

                        </Col>
                        <Col md="4">
                            <label className=" p-1"> Tổng tiền:{totalPrice}đ</label>
                        </Col>


                    </Row>
                    <Row className="font-weight-bold">
                        <Col md="4">

                        </Col>

                        <Col md="4">
                            <Button className="btn btn-primary" onClick={finalOrder} >Đặt hàng</Button>
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
export default Order;
